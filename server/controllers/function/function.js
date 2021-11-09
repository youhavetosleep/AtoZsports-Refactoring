const dotenv = require('dotenv')
const schedule = require('node-schedule')
const inlineCss = require('nodemailer-juice')
const axios = require('axios')
const { Op } = require('sequelize')
const {
  isAuthorized,
  checkRefreshToken,
  generateAccessToken
} = require('../token/tokenController')
const smtpTransport = require('../../config/mailConfig')
const { User, Post, Chat, EplMatch, EplResult } = require('../../models')

dotenv.config()

module.exports = {
  isAuth: (req, res, next) => {
    // 복호화된 엑세스 토큰 유저 정보
    const accessTokenData = isAuthorized(req)
    // 복호화되지 않은 refresh 토큰 정보
    const refreshToken = req.cookies.refreshToken

    if (!accessTokenData) {
      // accessToken이 만료된 상황
      if (!refreshToken) {
        // refreshToken마저 만료
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
      User.findOne({ where: { email } })
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
      User.findOne({ where: { email } })
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
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*'
    const stringLength = 8

    let randomString = ''
    for (let n = 0; n < stringLength; n++) {
      let randomNum = Math.floor(Math.random() * chars.length)
      randomString += chars.substring(randomNum, randomNum + 1)
    }
    return randomString
  },
  // 회원가입 시 인증 메일 전송
  sendAuthMail: async (user) => {
    // 유효 시간을 3분으로 설정
    const scheduleTime = new Date(user.dataValues.updatedAt)
    scheduleTime.setHours(scheduleTime.getHours() + 9)
    scheduleTime.setMinutes(scheduleTime.getMinutes() + 4)
    scheduleTime.setSeconds(0)
    const { id, nickname, email, verifiedKey } = user.dataValues
    const time = scheduleTime
      .toISOString()
      .split('T')[1]
      .split('.')[0]
      .split(':')
    // 메일 전송을 위한 정보
    const domain =
      process.env.NODE_ENV === 'production'
        ? 'https://atozsports.link'
        : 'http://localhost:3000'
    const from = `AtoZ sports <atozsports@api.atozsports.link>`
    const mailOptions = {
      from: from,
      to: email,
      subject: `${nickname}님 ! AtoZ sports 이메일 인증입니다.`,
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
        button { background-color: black; width: 50px; height: 35px; border-radius: 6px; }
      </style>
      <div>
        <h1>AtoZ sports</h1><br />
        <p>안녕하세요. <span>${nickname}</span>님, AtoZ Sports 가입을 진심으로 감사드립니다.</p>
        <br />
        <p><span>${time[0]}시 ${time[1]}분</span> 전에 아래의 버튼을 클릭하여 이메일 인증을 완료해주세요.</p>
        <br />
        <p>AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</p>
        <br />
        <button><a href="${domain}/auth/?email=${email}&verifiedKey=${verifiedKey}">인증</a></button>
      </div>
    `
    }
    smtpTransport.use('compile', inlineCss())
    // 메일 전송
    await smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info.response)
      }
    })
    // 유효 시간이 지난 후 인증을 만료
    schedule.scheduleJob(scheduleTime, async () => {
      await User.update({ verifiedKey: '' }, { where: { id } })
    })
  },
  // 게시글 생성, 수정 시 안내 메일 예약
  reserveMail: (post, req) => {
    const postId = post.dataValues.id
    const placeName = req.body.ground.placeName
    const startTime = new Date(req.body.startTime)
    // 경기 날짜에 알림 메일을 보내기 위한 설정. (0시 정각에 메일 전송)
    let scheduleTime = new Date(req.body.startTime)
    scheduleTime.setHours(-9)
    scheduleTime.setMinutes(0)
    // 정해진 시간에 메일 전송
    schedule.scheduleJob(scheduleTime, async () => {
      try {
        await Post.findOne({
          include: [{ model: User, attributes: ['nickname', 'email'] }],
          where: { id: postId }
        }).then(async (finded) => {
          // 게시글이 있을 때만 메일 전송
          const findedDate = new Date(finded.dataValues.startTime)
          if (startTime.toISOString() === findedDate.toISOString()) {
            const time = findedDate.toISOString().split('T')[1].split(':')
            const { email, nickname } = finded.dataValues.User.dataValues
            const from = `AtoZ sports <atozsports@api.atozsports.link>`
            const mailOptions = {
              from: from,
              to: email,
              subject: `${nickname}님 ! AtoZ sports에서 알림 메일을 전송합니다.`,
              html: `
                <style>
                  div { 
                    border: 1px solid black; 
                    text-align: center; 
                    padding: 20px; 
                    width: 70%;
                  }
                  h1 { margin-bottom: 20px; font-size: 50px; }
                  p { font-size: 15px; margin-botton: 10px; }
                  span { font-weight: bold; }
                </style>
                <div>
                  <h1>AtoZ sports</h1>
                  <p>안녕하세요. <span>${nickname}</span>님, AtoZ Sports를 이용해주셔서 진심으로 감사드립니다.</p>
                  <br />
                  <p><span>금일 ${time[0]}시 ${time[1]}분</span>에 <span>${placeName}</span>에서 경기가 예정되어 있습니다. </p>
                  <br />
                  <p>눈부신 경기력을 보여주시길 기대합니다 !</p>
                  <br />
                  <p>앞으로도 AtoZ Sports와 함께 즐거운 스포츠 즐기시길 바랍니다.</p>
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
          } else {
            console.log('게시글 시간이 수정됨')
          }
        })
      } catch (error) {
        console.log('해당 게시글을 찾을 수 없습니다')
      }
    })
  },
  findLastReadMessage: async (postId, lastReadTime) => {
    let result
    if (lastReadTime === null) {
      await Chat.count({
        where: { postId: postId }
      }).then((count) => {
        result = count
      })
    } else {
      await Chat.count({
        where: { postId: postId, createdAt: { [Op.gt]: lastReadTime } }
      }).then((count) => {
        result = count
      })
    }
    return result
  },
  requestEplData: (matchDay) => {
    // matchDay 변수는 숫자값으로 보내주세요.
    let options = {
      method: 'GET',
      url:
        'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague',
      params: { matchday: `${matchDay}` },
      headers: {
        'x-rapidapi-host':
          'heisenbug-premier-league-live-scores-v1.p.rapidapi.com',
        'x-rapidapi-key': '572485b417mshae360ec40dc86e6p122c0ejsn25a4f4428ad5'
      }
    }
    axios
      .request(options)
      .then(async (res) => {
        // 아직 치뤄지지 않은 경기 요청시 (EplMatch에 해당)
        if (!res.data.matches[0].time) {
          await EplMatch.destroy({ where: {}, truncate: true })
          res.data.matches.map(async (el) => {
            let { when, team1, team2, venue } = el
            await EplMatch.create({
              time: when,
              homeTeam: team1.teamName,
              awayTeam: team2.teamName,
              stadium: venue
            })
          })
          let updatedEplMatch = await EplMatch.findAll({})
          res.send(updatedEplMatch)
        } else {
          // 이미 치뤄진 경기 요청시 (EplResult에 해당)
          await EplResult.destroy({ where: {}, truncate: true })
          res.data.matches.map(async (el) => {
            let { when, referee, team1, team2, venue } = el
            await EplResult.create({
              time: when,
              referee,
              homeTeam: team1.teamName,
              homeScore: team1.teamScore,
              awayTeam: team2.teamName,
              awayScore: team2.teamScore,
              stadium: venue
            })
          })
          let updatedEplResult = await EplResult.findAll({})
          res.send(updatedEplResult)
        }
      })
      .catch((err) => {
        console.log(`requestEplData Error: ${err.message}`)
      })
  }
}
