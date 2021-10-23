const { Op } = require('sequelize')
const { Post, Ground, User, Chat } = require('../models')
const { isAuth } = require('../controllers/function/function')

module.exports = {
  // 랜딩 페이지 후 메인 페이지
  urgentPostList: (req, res, next) => {
    // 스포츠 종목별로 관리하기 위해 종목을 url에서 분리해 확인한다.
    const sports = req.baseUrl.split('/')[1]
    const Do = decodeURIComponent(req.query.do)
    const City = decodeURIComponent(req.query.city)
    const addressName = Do + ' ' + City
    const Division = req.query.division
    const now = new Date()
    now.setHours(now.getHours() + 9)

    Post.findAll({
      include: [{ model: Ground, attributes: ['placeName'] }],
      order: [['startTime']],
      where: {
        sports: sports,
        division: Division,
        addressName: { [Op.like]: '%' + addressName + '%' },
        startTime: { [Op.gt]: now }
      },
      limit: 5
    })
      .then((data) => {
        if (!data) {
          res.status(204)
        }
        let sortData = data.map((el) => {
          const {
            id,
            title,
            startTime,
            endTime,
            Ground: { placeName },
            content,
            status
          } = el

          return {
            id,
            title,
            startTime,
            endTime,
            placeName,
            content,
            status
          }
        })
        res.send(sortData)
      })
      .catch((err) => {
        console.log(`urgentPostList Error: ${err.message}`)
      })
  },
  // 게시글 확인
  // 게시글 목록 , 게시글 클릭 시 구분
  findPost: (req, res, next) => {
    if (req.query.id) {
      isAuth(req, res)
      Post.findOne({
        include: [
          {
            model: Ground,
            attributes: [
              'PlaceName',
              'addressName',
              'longitude',
              'latitude',
              'phone'
            ]
          },
          { model: User, attributes: ['nickname', 'userPhone'] }
        ],
        where: { id: req.query.id }
      }).then((data) => {
        const {
          id,
          title,
          division,
          content,
          startTime,
          endTime,
          status,
          phoneOpen,
          Ground: { PlaceName, addressName, longitude, latitude, phone },
          User: { nickname, userPhone }
        } = data

        let resultData
        phoneOpen === true
          ? (resultData = {
              id,
              title,
              division,
              content,
              startTime,
              endTime,
              status,
              PlaceName,
              addressName,
              longitude,
              latitude,
              phone,
              nickname,
              userPhone
            })
          : (resultData = {
              id,
              title,
              division,
              content,
              startTime,
              endTime,
              status,
              PlaceName,
              addressName,
              longitude,
              latitude,
              phone,
              nickname
            })
            res.send(resultData)
      })
      .catch((err) => {
        console.log(`findPost Error: ${err.message}`)
      })
    }
    const sports = req.baseUrl.split('/')[1]
    let Day = new Date(req.query.date)
    const Division = req.query.division
    const Do = decodeURIComponent(req.query.do)
    const City = decodeURIComponent(req.query.city)
    let pageNum = Number(req.query.offset)
    let offset = 0
    let limit = Number(req.query.limit)
    if (pageNum > 1) offset = limit * (pageNum - 1)
    const addressName = Do + ' ' + City
    const now = new Date()
    now.setHours(now.getHours() + 9)
    console.log(Day)

    Post.findAll({
      include: [{ model: Ground, attributes: ['placeName'] }],
      order: [['startTime']],
      where: {
        sports: sports,
        division: Division,
        addressName: { [Op.like]: '%' + addressName + '%' },
        startTime: { [Op.gt]: Day }
      },
      offset: offset,
      limit: limit
    }).then((data) => {
      if (!data) {
        res.status(204)
      }
      let sortData = data.map((el) => {
        const {
          id,
          title,
          startTime,
          endTime,
          Ground: { placeName },
          content,
          status
        } = el

        return {
          id,
          title,
          startTime,
          endTime,
          placeName,
          content,
          status
        }
      })
      res.send(sortData)
    })
  },
  // 게시글 작성
  writePost: (req, res, next) => {},
  // 게시글 수정
  updatePost: (req, res, next) => {},
  // 게시글 삭제
  deletePost: (req, res, next) => {},
  // 게시글 채팅방
  chat: (req, res, next) => {}
}
