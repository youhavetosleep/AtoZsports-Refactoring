const { Op } = require('sequelize')
const { isAuth, reserveMail } = require('./function/function')
const { Post, Ground, User, FavoritePost } = require('../models')

module.exports = {
  // 랜딩 페이지 후 메인 페이지
  urgentPostList: (req, res, next) => {
    let sports = req.baseUrl.split('/')[1] // 스포츠 종목별로 관리하기 위해 종목을 url에서 분리해서 확인.
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
            sports,
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
  findPost: (req, res, next) => {
    Post.findOne({
      include: [
        {
          model: Ground,
          attributes: [
            'placeName',
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
        if (!data) {
          res.status(404).send({ message: '해당 게시글을 찾을 수 없습니다.' })
        } else {
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
            Ground: { placeName, addressName, longitude, latitude, phone },
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
                placeName,
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
                placeName,
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
        }
      })
      .catch((err) => {
        console.log(`findPost Error: ${err.message}`)
      })
  },
  // 게시글 목록
  findPostList: (req, res, next) => {
    const sports = req.baseUrl.split('/')[1]
    let Day = new Date(req.query.date)
    const Division = req.query.division
    const Do = decodeURIComponent(req.query.do)
    const City = decodeURIComponent(req.query.city)
    const StartTime = new Date(`${req.query.date} ${req.query.startTime}`)
    const EndTime = new Date(`${req.query.date} ${req.query.endTime}`)
    let pageNum = Number(req.query.offset)
    let offset = 0
    let limit = Number(req.query.limit)
    if (pageNum > 1) offset = limit * (pageNum - 1)
    const addressName = Do + ' ' + City

    // 배포환경에서는 아래의 코드가 필요없다. 배포환경과 로컬에서의 시간이 차이가 있기 때문에
    // 아래의 코드는 로컬환경에서만 사용한다.
    // StartTime.setHours(StartTime.getHours() + 9)
    // EndTime.setHours(EndTime.getHours() + 9)

    Post.findAll(
      !req.query.startTime
        ? {
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
          }
        : {
            include: [{ model: Ground, attributes: ['placeName'] }],
            order: [['startTime']],
            where: {
              sports: sports,
              division: Division,
              addressName: { [Op.like]: '%' + addressName + '%' },
              [Op.or]: {
                startTime: {
                  [Op.gte]: StartTime,
                  [Op.lte]: EndTime
                },
                endTime: {
                  [Op.gte]: StartTime,
                  [Op.lte]: EndTime
                }
              }
            },
            offset: offset,
            limit: limit
          }
    ).then((data) => {
      if (!data) {
        res.status(404).send({ message: '해당 게시글을 찾을 수 없습니다.' })
      } else {
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
            sports,
            title,
            startTime,
            endTime,
            placeName,
            content,
            status
          }
        })
        res.send(sortData)
      }
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
    let status = '모집중'
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
        sports,
        placeName,
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
          await Post.create({
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
          }).then((post) => {
            reserveMail(post, req)
            res.send(post.dataValues)
          })
        } catch (err) {
          console.log(`writePost Error: ${err.message}`)
        }
      })
      .catch((err) => {
        console.log(`writeGround Error: ${err.message}`)
      })
  },
  updateStatus: async (req, res, next) => {
    let postId = req.params.postId
    let status = req.body.status
    try {
      await Post.update({ status }, { where: { id: postId } })
    } catch (err) {
      console.log(`updateStatus Error: ${err.message}`)
    }
    Post.findOne({
      include: [
        {
          model: Ground,
          attributes: [
            'placeName',
            'addressName',
            'longitude',
            'latitude',
            'phone'
          ]
        },
        { model: User, attributes: ['nickname', 'userPhone'] }
      ],
      where: { id: postId }
    }).then(async (data) => {
      if (!data) {
        res.status(404).send({ message: '해당 게시글을 찾을 수 없습니다.' })
      } else {
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
          Ground: { placeName, addressName, longitude, latitude, phone },
          User: { nickname, userPhone }
        } = data

        let isMyPost = false
        let isMyFavorite = false

        // 나의 게시물, 즐겨찾기 확인
        try {
          let findFavoritePost = await FavoritePost.findOne({
            where: {
              userId: res.locals.userId,
              postId: postId
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
                placeName,
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
                placeName,
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
        } catch (err) {
          console.log(`findFavorite Error: ${err.message}`)
        }
      }
    })
  },
  // 게시글 수정
  updatePost: (req, res, next) => {
    let postId = req.params.postId
    let sports = req.baseUrl.split('/')[1]
    let title = req.body.title
    let division = req.body.division
    let content = req.body.content
    console.log('요청확인',req.body.startTime)
    let startTime = new Date(req.body.startTime)
    let endTime = new Date(req.body.endTime)
    let status = '모집중'
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
            await Post.findOne({
              include: [
                {
                  model: Ground,
                  attributes: [
                    'placeName',
                    'addressName',
                    'longitude',
                    'latitude',
                    'phone'
                  ]
                },
                { model: User, attributes: ['nickname', 'userPhone'] }
              ],
              where: { id: postId }
            })
              .then(async (data) => {
                if (!data) {
                  res.status(404).send({ message: '해당 게시글을 찾을 수 없습니다.' })
                } else {
                  reserveMail(data, req)
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
                    Ground: { placeName, addressName, longitude, latitude, phone },
                    User: { nickname, userPhone }
                  } = data
      
                  let isMyPost = false
                  let isMyFavorite = false
      
                  // 나의 게시물, 즐겨찾기 확인
                  let findFavoritePost = await FavoritePost.findOne({
                    where: {
                      userId: res.locals.userId,
                      postId: postId
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
                        placeName,
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
                        placeName,
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
                }
              })
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
