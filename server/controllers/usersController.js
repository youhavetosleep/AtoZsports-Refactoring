const { isAuth } = require('../controllers/function/function')
const { User, Post, FavoritePost } = require('../models')
const dotenv = require('dotenv')
const crypto = require('crypto')
const { 
  generateAccessToken, 
  generateRefreshToken, 
  sendAccessToken, 
  sendRefreshToken 
} = require('../controllers/token/tokenController')
const smtpTransport = require('../config/mailConfig')

dotenv.config()

module.exports = {
  signin: (req, res, next) => {
    const { email, password } = req.body
    // 입력한 정보와 일치하는 유저 정보를 찾음
    User.findOne({
      where: { email, password }
    })
    .then((user) => {
      // 이메일이나 비밀번호가 일치하지 않은 경우
      if (!user) {
        return res.status(404).send({
          data: null,
          message: '사용자를 찾을 수 없습니다'
        })
      }
      let userData = user.dataValues
      // 이메일 인증이 완료되지 않은 계정
      if (!userData.verified) {
        return res.status(409).send({
          data: null,
          message: '이메일 인증을 진행해주세요'
        })
      }
      // 웹에서 가지고 있어야할 정보기 때문에 비밀번호 제거
      delete userData.password
      // 토큰 생성 후 전송
      const accessToken = generateAccessToken(userData)
      const refreshToken = generateRefreshToken(userData)
      // sendAccessToken은 json명령 후 종료되기 때문에 cookie에 담는 refresh부터 보내줌
      sendRefreshToken(res, refreshToken)
      sendAccessToken(res, accessToken, userData)
    })
    .catch((error) => {
      console.log('로그인 에러')
      next(error)
    })
  },
  // 회원가입
  signup: (req, res, next) => {
    const { email, nickname, password, userPhone, favoriteSports, homeground } = req.body
    if (!email || !nickname || !password || !userPhone || !favoriteSports || !homeground) {
      res.status(422).send({
        data: null,
        message: '회원가입에 필요한 정보가 입력되지 않음'
      })
    }
    // 이메일 인증에 필요한 인증키를 만듦
    const key1 = crypto.randomBytes(256).toString('hex').substr(100, 10)
    const key2 = crypto.randomBytes(256).toString('base64').substr(50, 10)
    const verifiedKey = key1 + key2
    // 데이터에 입력된 회원정보를 만들어 넣음
    User.findOrCreate({
      where: {
        email: email,
        nickname: nickname,
        password: password,
        userPhone: userPhone,
        favoriteSports: favoriteSports,
        homeground: homeground,
        verified: false,  // 이메일 인증을 위해 false를 기본값
        verifiedKey: verifiedKey  // 이메일 인증에 사용할 인증키
      }
    })
    .then(async ([data, created]) => {
      if (!created) {
        res.status(409).send({
          data: null,
          message: '이미 존재하는 이메일입니다'
        })
      } else {
        // 메일 전송을 위한 정보
        const domain = process.env.NODE_ENV === 'production' ? 'atozsports.link' : 'http://localhost:3000'
        const mailOptions = {
          from: process.env.GMAIL_ID,
          to: email,
          subject: `${nickname}님 ! AtoZ sports 이메일 인증입니다.`,
          html: `
            <div>
              <p>아래의 링크를 클릭해주세요.</p>
              <a href="${domain}/auth/?email=${email}&verifiedKey=${verifiedKey}">인증하기</a>
            </div>
          `
        }
        // 메일 전송
        await smtpTransport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
          } else {
            console.log(info.response)
          }
        })
        res.status(201).send({ 
          data, 
          message: '성공적으로 회원가입되었습니다' 
        })
      }
    })
    .catch((error) => {
      console.log('회원가입 에러')
      next(error)
    })
  },
  // 이메일 중복 검사
  mailCheck: (req, res, next) => {
    User.findOne({
      where: { email: req.body.email }
    })
    .then((user) => {
      if (!user) {
        res.send({ message: '✔ 사용 가능한 이메일입니다'})
      } else {
        res.send({ message: '존재하는 이메일입니다' })
      }
    })
    .catch((error) => {
      console.log('메일 유효성 검사 오류')
      next(error)
    })
  },
  // 닉네임 중복 검사
  nickCheck: (req, res, next) => {
    User.findOne({
      where: { nickname: req.body.nickname }
    })
    .then((user) => {
      if (!user) {
        res.send({ message: '✔ 사용 가능한 닉네임입니다' })
      } else {
        res.send({ message: '존재하는 닉네임입니다' })  
      }
    })
  },
  // 로그아웃
  logout: (req, res, next) => {
    try {
      // 토큰 만료 시킴
      res.cookie('refreshToken', '', { maxAge: 0 })
      res.status(205).send({ message: '로그아웃되었습니다' })
    } catch (error) {
      console.log('로그아웃 에러')
      next(error)
    }
  },

  // 사용자 정보 업데이트
  update: (req, res, next) => {
    const { email, verifiedKey, nickname, userPhone, homeground, favoriteSports, userId } = req.body
    // 이메일 인증을 위한 수정 요청 (인증 x)
    if (email && verifiedKey) {
      // 이메일과 인증키가 일치하는 경우에 인증 확인을 true로 변경
      User.update({ verified: true }, {
        where: { email, verifiedKey }
      })
      .then(() => res.send({ message: '이메일 인증이 완료되었습니다'}))
      .catch((error) => {
        console.log('이메일 인증 에러')
        next(error)
      })
    } else {
      // 마이페이지의 정보 수정 (인증 필요)
      isAuth(req, res)
      if (!nickname || !userPhone || !homeground || !favoriteSports) {
        res.status(422).send({
          data: null,
          message: '수정에 필요한 정보가 입력되지 않음'
        })
      }
      User.update({ nickname, userPhone, homeground, favoriteSports }, {
        where: { id: userId }
      })
      .then(() => {
        // 정보를 수정한 후 수정 완료된 정보를 send
        User.findOne({ where: { id: userId }})
        .then((user) => {
          delete user.dataValues.password
          res.send({ userData: user.dataValues })
        })
      })
      .catch((error) => {
        console.log('내 정보 수정 오류')
        next(error)
      })
    }
  },
  // 현재 비밀번호 확인
  pwCheck: (req, res, next) => {
    const userId = res.locals.userId
    User.findOne({ where : { id: userId } })
    .then((user) => {
      // 입력받은 패스워드와 현재 유저의 패스워드가 다를 경우 오류 표시
      if (user.dataValues.password !== req.body.password) {
        res.status(404).send({ message: '비밀번호가 일치하지 않습니다' })
      } else {
        res.send({ message: '✔ 비밀번호가 일치합니다' })
      }
    })
    .catch((error) => {
      console.log('비밀번호 확인 오류')
      next(error)
    })
  },
  // 비밀번호 변경
  pwChange: (req, res, next) => {
    const userId = res.locals.userId
    User.findOne({ where: { id: userId } })
    .then((user) => {
      // 입력받은 패스와드와 현재 유저의 패스워드가 같으면 오류 표시
      if (user.dataValues.password === req.body.password) {
        res.status(404).send({ message: '현재 비밀번호와 같은 비밀번호입니다' })
      } else {
        User.update(
          { password: req.body.password },
          { where : { id: userId } }
        )
        res.send({ message: '비밀번호가 변경되었습니다' })
      }
    })
    .catch((error) => {
      console.log('비밀번호 변경 에러')
      next(error)
    })
  },
  // 회원탈퇴
  withdrawal: (req, res, next) => {
    const userId = res.locals.userId
    User.destroy({
      where: { id: userId }
    })
    .then(() => {
      res.send({ message: '회원탈퇴가 성공적으로 이루어졌습니다'})
    })
    .catch((error) => {
      console.log('회원탈퇴 에러')
      next(error)
    })
  },
  // 사용자 정보 불러오기
  myInfo: (req, res, next) => {
    const userId = res.locals.userId
    User.findOne({ where: { id: userId } })
    .then((user) => {
      // 마이페이지에서 필요한 정보만을 뽑아서 전송
      const { email, nickname, userPhone, homeground, favoriteSports } = user.dataValues
      const userData = { email, nickname, userPhone, homeground, favoriteSports }
      res.send({ userData })
    })
    .catch((error) => {
      console.log('사용자 정보 조회 에러')
      next(error)
    })
  },
  // 마이페이지 내가 작성한 글
  myPost: (req, res, next) => {
    const userId = res.locals.userId
    Post.findAll({
      where: { userId }
    })
    .then((postList)=> {
      // 내가 작성한 게시글이 존재하지 않는 경우
      if (postList.length === 0){
        res.status(204).send({ message: '작성한 게시글이 존재하지 않습니다' })
      } else {
        // 작성한 게시글이 존재할 경우
        // 최신순으로 정렬
        postList.sort((a, b) => b.id - a.id)
        res.send({ postList })
      }
    })
    .catch((error) => {
      console.log('내 게시글 조회 에러')
      next(error)
    })
  },
  // 마이페이지 내 관심 글
  myFavorite: (req, res, next) => {
    const userId = res.locals.userId
    // 로그인된 유저 정보에 join하여 FavoritePost 조회
    User.findOne({
      include: [{ model: FavoritePost, attributes: ['postId'] }],
      where: { id: userId }
    })
    .then(async (user) => {
      // Promise를 통해 postId 각각의 Post 정보를 가져옴
      const postList = await Promise.all(
        user.FavoritePosts.map((el) => {
        const post = Post.findOne({ where: { id: el.postId } })
        return post
      }))
      if (postList.length === 0) {
        res.status(204).send({ message: '관심 등록한 게시글이 없습니다' })
      } else {
        // 게시글을 최신순으로 정렬
        postList.sort((a, b) => b.id - a.id)
        res.send(postList)
      }
    })
  },
  // 관심 글 등록
  addFavorite: (req, res, next) => {
    const userId = res.locals.userId
    const postId = Number(req.params.postId)
    // param으로 받은 postId와 로그인된 userId를 가지고 관심을 등록함
    FavoritePost.findOrCreate({
      where: { userId, postId }
    })
    .then(([data, created]) => {
      if (!created) {
        res.status(409).send({ message: '이미 관심 등록한 게시글입니다!' })
      } else {
        res.status(201).send(data)
      }
    })
    .catch((error) => {
      console.log('관심 글 등록 에러')
      next(error)
    })
  },
  // 관심 글 삭제
  deleteFavorite: (req, res, next) => {
    const userId = res.locals.userId
    const postId = Number(req.params.postId)
    FavoritePost.destroy({
      where: { userId, postId }
    })
    .then(() => {
      res.send({ message: '게시글 관심이 삭제되었습니다'})
    })
    .catch((error) => {
      console.log('관심 글 삭제 에러')
      next(error)
    })
  }
}