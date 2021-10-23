const { isAuthorized, checkRefreshToken, generateAccessToken } = require('../token/tokenController')
const { User } = require('../../models')

module.exports = {
  isAuth: (req, res, next) => {
    // 복호화된 엑세스 토큰 유저 정보
    const accessTokenData = isAuthorized(req)
    // 복호화되지 않은 refresh 토큰 정보
    const refreshToken = req.cookies.refreshToken
    
    if (!accessTokenData) { // accessToken이 만료된 상황
      if (!refreshToken) { // refreshToken마저 만료
        return res.statue(403).send({ 
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
  }
}