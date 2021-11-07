const dotenv = require('dotenv')
const { sign, verify } = require('jsonwebtoken')
dotenv.config()

module.exports = {
  // accessToken 생성 (유효시간 30분)
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '20m' })
  },
  // refreshToken 생성 (유효시간 30일)
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' })
  },
  // accessToken 전송
  sendAccessToken: (res, accessToken, userData) => {
    res.json({ accessToken, userData })
  },
  // refreshToken 전송 (쿠키에 담아줌)
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      path: '/'
    })
  },
  // 인증 확인
  isAuthorized: (req) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
      return null
    } else {
      // Bearer ~~~ 으로 된 형식에서 토큰 정보 분리
      const token = authorization.split(' ')[1]
      try {
        // 암호화한 secret 값으로 토큰 복호화
        return verify(token, process.env.ACCESS_SECRET)
      } catch (error) {
        // 유효하지 않은 경우에 null 값 리턴
        return null
      }
    }
  },
  // refreshToken 존재여부확인
  checkRefreshToken: (refreshToken) => {
    try {
      // 토큰 복호화
      return verify(refreshToken, process.env.REFRESH_SECRET)
    } catch (error) {
      // 유효하지 않은 경우에 null 값 리턴
      return null
    }
  }
}