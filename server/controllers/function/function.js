const dotenv = require('dotenv')
const schedule = require('node-schedule')
const { isAuthorized, checkRefreshToken, generateAccessToken } = require('../token/tokenController')
const smtpTransport = require('../../config/mailConfig')
const { User, Post } = require('../../models')

dotenv.config()

module.exports = {
  isAuth: (req, res, next) => {
    // 복호화된 엑세스 토큰 유저 정보
    const accessTokenData = isAuthorized(req)
    // 복호화되지 않은 refresh 토큰 정보
    const refreshToken = req.cookies.refreshToken
    
    if (!accessTokenData) { // accessToken이 만료된 상황
      if (!refreshToken) { // refreshToken마저 만료
        return res.status(403).send({ 
          data: null,
          message: '로그인이 필요한 권한입니다.' 
        })
      }
      // 복호화된 리프레시 토큰 유저 정보
      const refreshTokenData = checkRefreshToken(refreshToken)
      if (!refreshTokenData) {
        return res.status(401).send({
          data: null,
          message: '인증되지 않습니다. 다시 로그인해주세요.'
        })
      }
      // 토큰 정보에서 email(고유값)을 기준으로 유저 찾기
      const { email } = refreshTokenData
      User.findOne({ where: { email }})
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              data: null,
              message: '유저를 찾을 수 없습니다.'
            })
          }
          // 비밀번호 정보를 지우고 새 accessToken 생성 및 저장
          delete user.dataValues.password
          const newAccessToken = generateAccessToken(user.dataValues)
          // next로 넘어가야하기 때문에 send보내지 않고 locals에 저장
          res.locals.isAuth = newAccessToken
          res.locals.userId = user.dataValues.id
          res.locals.message = 'newAccessToken'
          next()
        })
        .catch((error) => {
          console.log(`New Access Token Error : ${error.message}`)
        })
    } else {
      // accessToken이 존재하는 상황
      const { email } = accessTokenData
      User.findOne({ where: { email }})
        .then((user) => {
          if (user) {
            res.locals.userId = user.dataValues.id
            res.locals.message = '인증 완료'
            next()
          }
        })
        .catch((error) => {
          console.log(`Access Token Error : ${error.message}`)
        })
    }
  },
  // 랜덤 비밀번호 생성
  generateRandomPassword: () => {
    const chars =  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*"
    const stringLength = 8

    let randomString = ''
    for(let n=0; n < stringLength; n++) {
      let randomNum = Math.floor(Math.random() * chars.length)
      randomString += chars.substring(randomNum, randomNum + 1)
    }
    return randomString
  },
  // 게시글 생성, 수정 시 안내 메일 예약
  reserveMail: (post, req) => {
    const postId = post.dataValues.id
    const placeName = req.body.ground.placeName
    const startTime = new Date(req.body.startTime)
    // 경기 날짜에 알림 메일을 보내기 위한 설정. (0시 정각에 메일 전송)
    let scheduleTime = new Date(req.body.startTime)
    scheduleTime.setHours(0)
    scheduleTime.setMinutes(0)
    // 정해진 시간에 메일 전송
    schedule.scheduleJob(scheduleTime, async () => {
      try {
        await Post.findOne({
          include: [{ model: User, attributes: ['nickname', 'email'] }],
          where: { id: postId }
        })
        .then(async (finded) => {
          // 게시글이 있을 때만 메일 전송
          if (String(startTime) === String(finded.dataValues.startTime)) {
            const time = String(finded.dataValues.startTime).split(' ')[4].split(':')
            const { email, nickname } = finded.dataValues.User.dataValues
            const from = `AtoZ sports <${process.env.GMAIL_ID}>`
            const mailOptions = {
              from: from,
              to: email,
              subject: `${nickname}님 ! AtoZ sports에서 알림 메일을 전송합니다.`,
              html: `
                <div>
                  <h1>AtoZ sports</h1>
                  <div>안녕하세요. ${nickname}님, AtoZ Sports를 이용해주셔서 진심으로 감사드립니다.</div>
                  <div>금일 ${time[0]}시 ${time[1]}분에 ${placeName}에서 경기가 예정되어 있습니다. <div>
                  <div>눈부신 경기력을 보여주시길 기대합니다 !</div>
                  <div>앞으로도 AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</div>
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
          } else {
            console.log('게시글 시간이 수정됨')
          }
        })
      } catch (error) {
        console.log('해당 게시글을 찾을 수 없습니다')
      }
    })
  }
}