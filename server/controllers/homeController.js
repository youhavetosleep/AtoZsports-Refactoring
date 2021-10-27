const dotenv = require('dotenv')
const axios = require('axios')
const crypto = require('crypto')
const { 
  generateAccessToken, 
  generateRefreshToken, 
  sendAccessToken, 
  sendRefreshToken 
} = require('./token/tokenController')
const { generateRandomPassword } = require('./function/function')
const { User } = require('../models')
const smtpTransport = require('../config/mailConfig')

dotenv.config()

module.exports = {
  main: (req, res) => {
    res.send('DOMAIN CHECK!!!')
  },
  // 로그인
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
  kakao: (req, res, next) => {

  },
  // google 소셜 로그인
  google: async (req, res, next) => {
    // 인가코드를 클라이언트로부터 받아옴
    const code = req.query.code
    // 인가코드를 구글에 전송하여 회원 정보를 받아냄
    await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${code}`, {
      headers: {
        authorization: `token ${code}`,
        accept: 'application/json'
      }
    })
    .then((data) => {
      const email = data.data.email
      const nickname = data.data.name
      // 회원정보에서 이메일을 찾아 최초 로그인인지 구분
      console.log('email: ', email)
      User.findOne({ where: { email: email } })
      .then((user) => {
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
          })
          .then(async (newUser) => {
            const userData = newUser.dataValues
            // 임시 비밀번호 공지를 위한 메일 전송
            const domain = process.env.NODE_ENV === 'production' ? 'atozsports.link' : 'http://localhost:3000'
            const from = `AtoZ sports <${process.env.GMAIL_ID}>`
            const mailOptions = {
              from: from,
              to: email,
              subject: `${nickname}님 ! AtoZ sports 임시 비밀번호 발급입니다.`,
              html: `
                <div>
                  <h1>AtoZ sports</h1>
                  <div>안녕하세요. ${nickname}님, AtoZ Sports 가입을 진심으로 감사드립니다.</div>
                  <div>임시 비밀번호를 다음과 같이 발급해드렸습니다.</div>
                  <div>임시 비밀번호 : ${userData.password}</div>
                  <div>마이 페이지에서 내 정보를 기입하시면 AtoZ Sports가 제공하는 기능을 더욱 편리하게 이용하실 수 있습니다.</div>
                  <div>AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</div>
                  <br />
                  <a href="${domain}">홈페이지로 이동</a>
                </div>
              `
            }
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
          const userData = user.dataValues
          delete userData.password
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
        const from = `AtoZ sports <${process.env.GMAIL_ID}>`
        const mailOptions = {
          from: from,
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
}
