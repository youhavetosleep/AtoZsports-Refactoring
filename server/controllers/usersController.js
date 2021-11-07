const dotenv = require('dotenv')
const crypto = require('crypto')
const axios = require('axios')
const inlineCss = require('nodemailer-juice')
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken
} = require('./token/tokenController')
const { isAuth, generateRandomPassword, sendAuthMail, findLastReadMessage } = require('./function/function')
const { User, Post, Ground, FavoritePost } = require('../models')
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
  // kakao 소셜 로그인
  kakao: async (req, res, next) => {
    const code = req.query.code
    if (code !== undefined) {
      requestToken(code)
        .then(async ({ data }) => {
          let kakaoUserData = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            withCredentials: true
          })
          if (kakaoUserData) {
            let accountData = kakaoUserData.data.kakao_account
            let userKakaoEmail = accountData.email
            let userKakaoNick = accountData.profile.nickname

            let findUser = await User.findOne({
              where: { email: userKakaoEmail }
            })

            if (!findUser) {
              User.create({
                email: userKakaoEmail,
                password: generateRandomPassword(),
                nickname: userKakaoNick,
                userPhone: '010-xxxx-xxxx',
                homeground: '',
                favoriteSports: '',
                verified: true,
                verifiedKey: ''
              })
                .then(async (user) => {
                  let userData = user.dataValues
                  const DOMAIN =
                    process.env.NODE_ENV === 'production'
                      ? 'https://atozsports.link'
                      : 'http://localhost:3000'
                  const from = `AtoZ sports <atozsports@api.atozsports.link>`
                  const emailOptions = {
                    from: from,
                    to: userData.email,
                    subject: `${userData.nickname}님 ! AtoZ sports 임시 비밀번호 발급입니다.`,
                    html: `
                    <style>
                      div { 
                        border: 1px solid black; 
                        text-align: center; 
                        padding: 20px; 
                        width: 70%;
                      }
                      a { color: white; text-decoration-line: none }
                      h1 { margin-bottom: 20px; font-size: 50px; }
                      p { font-size: 15px; margin-botton: 10px; }
                      span { font-weight: bold; }
                      button { background-color: black; width: 150px; height: 35px; border-radius: 6px; }
                    </style>
                    <div>
                      <h1>AtoZ sports</h1>
                      <p>안녕하세요. <span>${userData.nickname}</span>님, AtoZ Sports 가입을 진심으로 감사드립니다.</p><br />
                      <p>임시 비밀번호를 다음과 같이 발급해드렸습니다.</p><br />
                      <p>임시 비밀번호 : <span>${userData.password}</span></p><br />
                      <p>마이 페이지에서 내 정보를 기입하시면 AtoZ Sports가 제공하는 기능을 더욱 편리하게 이용하실 수 있습니다.</p><br />
                      <p>AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</p><br />
                      <button><a href="${DOMAIN}">홈페이지로 이동</a></button>
                    </div>
                  `
                  }
                  if (!(await smtpTransport.verify())) {
                    throw new Error('email transporter verification failed')
                  }
                  smtpTransport.use('compile', inlineCss())
                  await smtpTransport.sendMail(emailOptions, (err, res) => {
                    if (err) {
                      console.log(`메일발송 에러 발생: ${err.message}`)
                    } else {
                      console.log('메일 발송이 성공적으로 완료!!')
                    }
                    smtpTransport.close()
                  })

                  delete userData.password
                  const accessToken = generateAccessToken(userData)
                  const refreshToken = generateRefreshToken(userData)
                  sendRefreshToken(res, refreshToken) //access보다 위에 있어야 한다
                  sendAccessToken(res, accessToken, userData)
                })
                .catch((err) => {
                  console.log(err.message)
                })
            } else if (findUser) {
              await User.update(
                {
                  verified: true
                },
                { where: { email: userKakaoEmail } }
              )
              let updatedUser = await User.findOne({
                where: { email: userKakaoEmail }
              })
              let userData = updatedUser.dataValues
              delete userData.password
              const accessToken = generateAccessToken(userData)
              const refreshToken = generateRefreshToken(userData)
              sendRefreshToken(res, refreshToken) //access보다 위에 있어야 한다
              sendAccessToken(res, accessToken, userData)
            }
          }
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    function requestToken(code) {
      const DOMAIN =
        process.env.NODE_ENV === 'production'
          ? 'https://atozsports.link'
          : 'http://localhost:3000'
      const JS_APP_KEY = process.env.KAKAO_APP_KEY
      const REDIRECT_URI = `${DOMAIN}/kakao`
      const makeFormData = (params) => {
        const searchParams = new URLSearchParams()
        Object.keys(params).forEach((key) => {
          searchParams.append(key, params[key])
        })
        return searchParams
      }
      return axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        withCredentials: true,
        data: makeFormData({
          code,
          grant_type: 'authorization_code',
          client_id: JS_APP_KEY,
          redirect_uri: REDIRECT_URI
        })
      })
    }
  },
  // google 소셜 로그인
  google: async (req, res, next) => {
    // 인가코드를 클라이언트로부터 받아옴
    const code = req.query.code
    // 인가코드를 구글에 전송하여 회원 정보를 받아냄
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${code}`,
        {
          headers: {
            authorization: `token ${code}`,
            accept: 'application/json'
          }
        }
      )
      .then((data) => {
        const email = data.data.email
        const nickname = data.data.name
        // 회원정보에서 이메일을 찾아 최초 로그인인지 구분
        User.findOne({ where: { email: email } }).then((user) => {
          if (!user) {
            // 최초 로그인 (회원가입 절차 => 로그인)
            // email, nickname을 제외하고는 임의의 데이터로 회원 생성
            User.create({
              email: email,
              password: generateRandomPassword(),
              nickname: nickname,
              userPhone: '010-xxxx-xxxx',
              homeground: '',
              favoriteSports: '',
              verified: true,
              verifiedKey: ''
            }).then(async (newUser) => {
              const userData = newUser.dataValues
              // 임시 비밀번호 공지를 위한 메일 전송
              const domain =
                process.env.NODE_ENV === 'production'
                  ? 'https://atozsports.link'
                  : 'http://localhost:3000'
              const from = `AtoZ sports <atozsports@api.atozsports.link>`
              const mailOptions = {
                from: from,
                to: email,
                subject: `${nickname}님 ! AtoZ sports 임시 비밀번호 발급입니다.`,
                html: `
                <style>
                  div { 
                    border: 1px solid black; 
                    text-align: center; 
                    padding: 20px; 
                    width: 70%;
                  }
                  a { color: white; text-decoration-line: none }
                  h1 { margin-bottom: 20px; font-size: 50px; }
                  p { font-size: 15px; margin-botton: 10px; }
                  span { font-weight: bold; }
                  button { background-color: black; width: 150px; height: 35px; border-radius: 6px; }
                </style>
                <div>
                  <h1>AtoZ sports</h1><br />
                  <p>안녕하세요. <span>${nickname}</span>님, AtoZ Sports 가입을 진심으로 감사드립니다.</p><br />
                  <p>임시 비밀번호를 다음과 같이 발급해드렸습니다.</p><br />
                  <p>임시 비밀번호 : <span>${userData.password}</span></p><br />
                  <p>마이 페이지에서 내 정보를 기입하시면 AtoZ Sports가 제공하는 기능을 더욱 편리하게 이용하실 수 있습니다.</p><br />
                  <p>AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</p><br />
                  <button><a href="${domain}">홈페이지로 이동</a></button>
                </div>
              `
              }
              smtpTransport.use('compile', inlineCss())
              await smtpTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error)
                } else {
                  console.log(info.response)
                }
              })
              // 회원 생성, 메일 전송 후 로그인까지 진행
              delete userData.password
              const accessToken = generateAccessToken(userData)
              const refreshToken = generateRefreshToken(userData)
              sendRefreshToken(res, refreshToken)
              sendAccessToken(res, accessToken, userData)
            })
          } else {
            // 그냥 로그인
            let userData = user.dataValues
            delete userData.password
            // 자체회원가입 후 인증 안 된 상태로 소셜 로그인 시 인증
            if (userData.verified === false) {
              User.update({ verified: true }, { where: { id: userData.id } })
              userData.verified = true
            }
            const accessToken = generateAccessToken(userData)
            const refreshToken = generateRefreshToken(userData)
            sendRefreshToken(res, refreshToken)
            sendAccessToken(res, accessToken, userData)
          }
        })
      })
      .catch((error) => {
        console.log('구글 로그인 에러')
        next(error)
      })
  },
  // 회원가입
  signup: (req, res, next) => {
    const { email, nickname, password, userPhone, favoriteSports, homeground } = req.body
    if (
      !email ||
      !nickname ||
      !password ||
      !userPhone ||
      !favoriteSports ||
      !homeground
    ) {
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
        verified: false, // 이메일 인증을 위해 false를 기본값
        verifiedKey: verifiedKey // 이메일 인증에 사용할 인증키
      }
    })
      .then(async ([data, created]) => {
        if (!created) {
          res.status(409).send({
            data: null,
            message: '이미 존재하는 이메일입니다'
          })
        } else {
          sendAuthMail(data)
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
  // 이메일 재 인증
  emailReAuth: (req, res, next) => {
    const email = req.body.email
    // 이메일 인증에 필요한 인증키를 만듦
    const key1 = crypto.randomBytes(256).toString('hex').substr(100, 10)
    const key2 = crypto.randomBytes(256).toString('base64').substr(50, 10)
    const verifiedKey = key1 + key2
    // 유저 인증키 갱신
    User.update(
      { verifiedKey },
      { where: { email } }
    )
    .then(() => {
      User.findOne({
        where: { email }
      })
      .then((user) => {
        sendAuthMail(user)
        res.send(user.dataValues)
      })
    })
  },
  // 이메일 중복 검사
  mailCheck: (req, res, next) => {
    User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          res.send({ message: '✔ 사용 가능한 이메일입니다' })
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
    }).then((user) => {
      if (!user || user.dataValues.nickname === req.body.curNickname) {
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
    const {
      email,
      verifiedKey,
      nickname,
      userPhone,
      homeground,
      favoriteSports,
      userId
    } = req.body
    // 이메일 인증을 위한 수정 요청 (인증 x)
    if (email && verifiedKey) {
      // 이메일과 인증키가 일치하는 경우에 인증 확인을 true로 변경
      User.update(
        { verified: true },
        {
          where: { email, verifiedKey }
        }
      )
        .then((user) => {
          // 인증 성공
          if (user[0] === 1){
            res.status(200).send({ message: '이메일 인증이 완료되었습니다' })
          } else {
            // 인증 실패
            res.status(409).send({ message: '인증 유효시간이 만료되었습니다' })
          }
        })
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
      User.update(
        { nickname, userPhone, homeground, favoriteSports },
        {
          where: { id: userId }
        }
      )
        .then(() => {
          // 정보를 수정한 후 수정 완료된 정보를 send
          User.findOne({ where: { id: userId } }).then((user) => {
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
    User.findOne({ where: { id: userId } })
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
          res
            .status(404)
            .send({ message: '현재 비밀번호와 같은 비밀번호입니다' })
        } else {
          User.update(
            { password: req.body.password },
            { where: { id: userId } }
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
        res.send({ message: '회원탈퇴가 성공적으로 이루어졌습니다' })
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
        const { email, nickname, userPhone, homeground, favoriteSports } =
          user.dataValues
        const userData = {
          email,
          nickname,
          userPhone,
          homeground,
          favoriteSports
        }
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
      include: [{ model: Ground, attributes: ['placeName'] }],
      where: { userId }
    })
      .then(async (postList) => {
        // 내가 작성한 게시글이 존재하지 않는 경우
        if (postList.length === 0) {
          res.status(204).send({ message: '작성한 게시글이 존재하지 않습니다' })
        } else {
          // 작성한 게시글이 존재할 경우
          const list = await Promise.all(
            postList.map(async (el) => {
            const { id, sports, title, startTime, endTime, content, status, lastReadTime } = el
            const { placeName } = el.Ground
            const notReadMessage = await findLastReadMessage(id, lastReadTime)
            const post = { id, sports, title, startTime, endTime, placeName, content, status, notReadMessage }
            return post
          }))
          // 최신순으로 정렬
          list.sort((a, b) => b.id - a.id)
          res.send(list)
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
      include: [{ model: FavoritePost, attributes: ['postId', 'lastReadTime'] }],
      where: { id: userId }
    }).then(async (user) => {
      // Promise를 통해 postId 각각의 Post 정보를 가져옴
      let notReadMessageList = []
      const postList = await Promise.all(
        user.FavoritePosts.map(async (el) => {
          const post = Post.findOne({ 
            include: [{ model: Ground, attributes: ['placeName'] }],
            where: { id: el.postId } 
          })
          const notReadMessage = await findLastReadMessage(el.postId, el.lastReadTime)
          notReadMessageList.push(notReadMessage)
          return post
        })
      )
      if (postList.length === 0) {
        res.status(204).send({ message: '관심 등록한 게시글이 없습니다' })
      } else {
        // 작성한 게시글이 존재할 경우
        const list = await Promise.all(
          postList.map((el, idx) => {
          const { id, sports, title, startTime, endTime, content, status } = el
          const notReadMessage = notReadMessageList[idx]
          const { placeName } = el.Ground
          const post = { id, sports, title, startTime, endTime, placeName, content, status, notReadMessage }
          return post
        }))
        // 최신순으로 정렬
        list.sort((a, b) => b.id - a.id)
        res.send(list)
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
        res.send({ message: '게시글 관심이 삭제되었습니다' })
      })
      .catch((error) => {
        console.log('관심 글 삭제 에러')
        next(error)
      })
  }
}