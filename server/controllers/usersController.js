const { isAuth } = require('../controllers/function/function')
const { User, Post, FavoritePost } = require('../models')

module.exports = {
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
      User.findOne({
        where: { id: userId}
      })
      .then((user) => {
        if (user) {
          // 유저가 존재할 경우
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
            console.log('내 정보 수정 에러')
            next(error)
          })
        } else {
          // 유저가 존재하지 않을 경우
          res.status(404).send({ message: '존재하지 않는 회원입니다' })
        }
      })
    }
  },
  // 현재 비밀번호 확인
  pwCheck: (req, res, next) => {
    const userId = res.locals.userId
    User.findOne({ where : { id: userId } })
    .then((user) => {
      // 입력받은 패스워드와 현재 유저의 패스워드가 다를 경우 에러 표시
      if (user.dataValues.password !== req.body.password) {
        res.status(404).send({ message: '비밀번호가 일치하지 않습니다' })
      } else {
        res.send({ message: '✔ 비밀번호가 일치합니다' })
      }
    })
    .catch((error) => {
      console.log('비밀번호 확인 에러')
      next(error)
    })
  },
  // 비밀번호 변경
  pwChange: (req, res, next) => {
    const userId = res.locals.userId
    User.findOne({ where: { id: userId } })
    .then((user) => {
      // 입력받은 패스와드와 현재 유저의 패스워드가 같으면 에러 표시
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
    // 회원을 찾고 회원이 존재할 경우에만 탈퇴 진행
    User.findOne({
      where: { id: userId }
    })
    .then((user) => {
      if (user) {
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
      } else {
        res.status(404).send({ message: '존재하지 않는 회원입니다' })
      }
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
    // 이미 제거된 경우를 대비하여 존재한다면 제거
    FavoritePost.findOne({
      where: { userId, postId }
    })
    .then((favorite) => {
      if (favorite) {
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
      } else {
        res.status(404).send({ message: '관심 등록되지 않은 글입니다' })
      }
    })
  }
}