const { Op } = require('sequelize')
const { isAuth } = require('./function/function')
const { Post, Ground, User, FavoritePost } = require('../models')

module.exports = {
  // 랜딩 페이지 후 메인 페이지
  urgentPostList: (req, res, next) => {
    // 스포츠 종목별로 관리하기 위해 종목을 url에서 분리해 확인한다.
    let sports = req.baseUrl.split('/')[1]
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
      })
        .then(async (data) => {
          const {
            id,
            title,
            division,
            content,
            startTime,
            endTime,
            status,
            phoneOpen,
            userId,
            Ground: { PlaceName, addressName, longitude, latitude, phone },
            User: { nickname, userPhone }
          } = data

          let isMyPost = false
          let isMyFavorite = false

          // 나의 게시물, 즐겨찾기 확인
          let findFavoritePost = await FavoritePost.findOne({
            where: {
              userId: res.locals.userId,
              postId: req.query.id
            }
          })

          if (!!findFavoritePost) isMyFavorite = true
          if (res.locals.userId === userId) isMyPost = true

          let resultData
          phoneOpen === true
            ? (resultData = {
                id,
                isMyPost,
                isMyFavorite,
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
                isMyPost,
                isMyFavorite,
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
          res.locals.message === '인증 완료'
            ? res.send({ postsData: resultData })
            : res.send({
                accessToken: res.locals.isAuth,
                postsData: resultData
              })
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
  writePost: (req, res, next) => {
    let sports = req.baseUrl.split('/')[1]
    let title = req.body.title
    let division = req.body.division
    let content = req.body.content
    let startTime = new Date(req.body.startTime)
    let endTime = new Date(req.body.endTime)
    let status = req.body.status
    let phoneOpen = req.body.phoneOpen
    let {
      placeName,
      addressName,
      phone,
      longitude,
      latitude,
      placeUrl
    } = req.body.ground

    Ground.findOrCreate({
      where: {
        placeName,
        sports,
        addressName,
        phone,
        longitude,
        latitude,
        placeUrl
      }
    })
      .then(async ([data, created]) => {
        try {
          let userId = res.locals.userId
          let groundId = data.dataValues.id
          let writePostData = await Post.create({
            sports,
            title,
            division,
            content,
            startTime,
            endTime,
            status,
            phoneOpen,
            addressName,
            userId,
            groundId
          })
          res.send(writePostData.dataValues)
        } catch (err) {
          console.log(`writePost Error: ${err.message}`)
        }
      })
      .catch((err) => {
        console.log(`writeGround Error: ${err.message}`)
      })
  },
  // 게시글 수정
  updatePost: (req, res, next) => {
    let postId = req.params.postId
    let sports = req.baseUrl.split('/')[1]
    let title = req.body.title
    let division = req.body.division
    let content = req.body.content
    let startTime = new Date(req.body.startTime)
    let endTime = new Date(req.body.endTime)
    let status = req.body.status
    let phoneOpen = req.body.phoneOpen
    let {
      placeName,
      addressName,
      phone,
      longitude,
      latitude,
      placeUrl
    } = req.body.ground

    Ground.findOrCreate({
      where: {
        placeName,
        sports,
        addressName,
        phone,
        longitude,
        latitude,
        placeUrl
      }
    })
      .then(async ([data, created]) => {
        try {
          let userId = res.locals.userId
          let groundId = data.dataValues.id
          let updatePostData = await Post.update(
            {
              sports,
              title,
              division,
              content,
              startTime,
              endTime,
              status,
              phoneOpen,
              addressName,
              userId,
              groundId
            },
            { where: { id: postId } }
          )
          if (updatePostData[0] === 1) {
            let updatedPostData = await Post.findOne({ where: { id: postId } })
            res.send(updatedPostData)
          } else {
            console.log('게시글이 수정이 되지 않았습니다!')
          }
        } catch (err) {
          console.log(`updatePost Error: ${err.message}`)
        }
      })
      .catch((err) => {
        console.log(`writeGround Error: ${err.message}`)
      })
  },
  // 게시글 삭제
  deletePost: (req, res, next) => {
    Post.destroy({
      where: { id: req.params.postId }
    })
      .then(() => {
        res.send({
          message: '게시글이 성공적으로 삭제되었습니다!'
        })
      })
      .catch((err) => {
        console.log(`post delete Error: ${err.message}`)
      })
  }
}
