const dotenv = require('dotenv')
const crypto = require('crypto')
const { 
  generateAccessToken, 
  generateRefreshToken, 
  sendAccessToken, 
  sendRefreshToken 
} = require('../controllers/token/tokenController')
const { isAuth } = require('../controllers/function/function')
const { User } = require('../models')
const smtpTransport = require('../config/mailConfig')

dotenv.config()

module.exports = {
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
          message: '사용자를 찾을 수 없습니다.'
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
      next(err)
    })
  },
  // 로그아웃
  logout: (req, res, next) => {

  },
  // 회원가입
  signup: (req, res, next) => {
    const { email, nickname, password, phone, favoriteSports, homeground } = req.body
    if (!email || !nickname || !password || !phone || !favoriteSports || !homeground) {
      res.status(422).send({
        data: null,
        message: '회원가입에 필요한 정보가 입력되지 않음.'
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
        phone: phone,
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
          message: '이미 존재하는 이메일입니다.'
        })
      } else {
        // 메일 전송을 위한 정보
        const mailOptions = {
          from: process.env.GMAIL_ID,
          to: email,
          subject: `${nickname}님 ! AtoZ sports 이메일 인증입니다.`,
          html: `
            <div>
              <p>아래의 링크를 클릭해주세요.</p>
              <a href="http:localhost:3000/auth/?email=${email}&verifiedKey=${verifiedKey}">인증하기</a>
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
        res.status(201).send({ message: '성공적으로 회원가입되었습니다.' })
      }
    })
    .catch((error) => {
      console.log('회원가입 에러')
      next(error)
    })
  },
  // 이메일 중복 검사
  mailCheck: (req, res, next) => {
    
  },
  // 닉네임 중복 검사
  nickCheck: (req, res, next) => {

  },
  // 사용자 정보 업데이트
  update: (req, res, next) => {
    const { email, verifiedKey, nickname, phone, homeground, favoriteSports } = req.body
    // 이메일 인증을 위한 수정 요청
    if (email && verifiedKey) {
      // 이메일과 인증키가 일치하는 경우에 인증 확인을 true로 변경
      User.update({ verified: true }, {
        where: { email, verifiedKey }
      })
      .then(() => res.send({ message: '이메일 인증이 완료되었습니다!'}))
      .catch((error) => {
        console.log('이메일 인증 에러')
        next(error)
      })
    }
  },
  // 현재 비밀번호 확인
  pwCheck: (req, res, next) => {

  },
  // 비밀번호 변경
  pwChange: (req, res, next) => {

  },
  // 회원탈퇴
  withdrawal: (req, res, next) => {

  },
  // 사용자 정보 불러오기
  myInfo: (req, res, next) => {

  },
  // 마이페이지 내가 작성한 글
  myPost: (req, res, next) => {

  },
  // 마이페이지 내 관심 글
  myFavorite: (req, res, next) => {

  },
  // 관심 글 등록
  addFavorite: (req, res, next) => {

  },
  // 관심 글 삭제
  deleteFavorite: (req, res, next) => {

  }
}