const { Op } = require('sequelize')
const { User, Ground, GroundReview } = require('../models')

module.exports = {
  // 경기장 조회
  // 시,도에 따라 등록된 경기장, 선택한 경기장 구분
  findGround: (req, res, next) => {
    const Do = decodeURIComponent(req.query.do)
    const City = decodeURIComponent(req.query.city)
    const addressName = Do + ' ' + City
    const id = req.query.id
    // 시, 도 경기장
    if (req.query.do && req.query.city) {
      // 위치를 입력받은 경기장 정보
      Ground.findAll({
        where : { addressName: { [Op.like]: addressName + '%' }}
      })
      .then(async (groundList) => {
        // id, 장소명, 위도, 경도 정보를 뽑아서 전송
        const list = await Promise.all(
          groundList.map((el) => {
            const { id, longitude, latitude, placeName } = el
            const ground = { id, longitude, latitude, placeName }
            return ground
          })
        )
        res.send(list)
      })
    } else if (req.query.id) { 
      // 선택한 경기장 정보
      Ground.findOne({
        // 평점을 줘야하기 때문에 join
        include: { model: GroundReview, attributes: ['score'] },
        where : { id }
      })
      .then(async (data) => {
        await Promise.all(
          data.GroundReviews.map((el) => el.score)
        )
        .then((score) => {
          const { id, sports, placeName, addressName, phone, placeUrl } = data
          const ground = { id, sports, placeName, addressName, phone, placeUrl, score }
          res.send(ground)
        })
      })
    } else {
      // 쿼리값이 제대로 작성되지 않은 경우
      res.status(404).send({ message: '쿼리 요청이 잘못 작성됨'})
    }
  },
  // 리뷰가 있는 경기장인지 확인
  checkGround: (req, res, next) => {
    const placeName = req.body.placeName
    // placeName에 해당하는 경기장 찾기
    Ground.findOne({
      where: { placeName }
    })
    .then((place) => {
      if (place) {
        res.status(200).send({ data: place.dataValues.id, message: 'ok' })
      } else {
        res.status(404).send({ message: 'not exist' })
      }
    })
  },
  // 댓글 조회
  findReview: (req, res, next) => {
    const groundId = req.params.groundId
    const limit = Number(req.query.limit)
    const pageNum = Number(req.query.offset)
    let offset = 0
    // 페이지네이션 설정
    if (pageNum > 1) {
      offset = limit * (pageNum - 1)
    }
    // 해당 ground의 리뷰들을 페이지네이션으로 불러옴
    GroundReview.findAll({
      include: { model: User, attributes: ['nickname']},
      where: { groundId },
      order: [['id', 'desc']],
      offset,
      limit
    })
    .then(async (reviewList) => {
      if (!reviewList) {
        res.status(204).send({ message: '리뷰가 더 없습니다'})
      } else {
        // 필요한 정보를 뽑아서 전송
        const list = await Promise.all(
          reviewList.map((el) => {
            const { id, comment, score, createdAt, User } = el
            const nickname = User.nickname
            const review = { id, comment, score, createdAt, nickname }
            return review
          })
        )
        res.send(list)
      }
    })
  },
  // 경기장 리뷰 작성
  writeReview: (req, res, next) => {
    const userId = res.locals.userId
    const groundId = req.params.groundId
    const score = req.body.score
    const comment = req.body.comment
    // 입력값이 없을 경우
    if (!score || !comment) {
      res.status(422).send({ message: '입력되지 않은 정보가 있습니다' })
    } else {
      // 리뷰 생성
      GroundReview.findOrCreate({
        where: {
          comment,
          score,
          userId,
          groundId
        }
      })
      .then(([review, created]) => {
        if (!created) {
          res.status(409).send({ message: '도배는 삼가주세요' })
        } else {
          GroundReview.findAll({
            where: { groundId }
          })
          .then(async (reviews) => {
            const list = await Promise.all(
              reviews.map((el) => {
                return el.dataValues.score
              })
            )
            const { id, comment, score, userId, groundId, createdAt } = review.dataValues
            const result = { id, comment, score, userId, groundId, createdAt, list }
            res.status(201).send(result)
          })
        }
      })
      .catch((error) => {
        console.log('리뷰 생성 에러')
        next(error)
      })
    }
  },
  // 경기장 리뷰 수정
  updateReview: (req, res, next) => {
    const reviewId = req.params.reviewId
    const score = req.body.score
    const comment = req.body.comment
    // 입력값이 없을 경우
    if (!score || !comment) {
      res.status(422).send({ message: '입력되지 않은 정보가 있습니다' })
    } else {
      GroundReview.findOne({
        where: { id: reviewId}
      })
      .then((review) => {
        if (review) {
          // 리뷰를 수정
          GroundReview.update({ score, comment }, {
            where: { id: reviewId }
          })
          .then(() => {
            // 수정된 리뷰를 send함
            GroundReview.findOne({ where: { id: reviewId }})
            .then((review) => {
              res.send({ review })
            })
          })
          .catch((error) => {
            console.log('리뷰 수정 에러')
            next(error)
          })
        } else {
          // 리뷰가 없을 경우
          res.status(404).send({ message: '존재하지 않는 리뷰입니다' })
        }
      })
    }
  },
  // 경기장 리뷰 삭제
  deleteReview: (req, res, next) => {
    const groundId = req.params.groundId
    const reviewId = req.params.reviewId
    // 이미 삭제된 리뷰에 대해 에러를 송출하기 위해 find
    GroundReview.findOne({ 
      where: { id: reviewId } 
    })
    .then((review) => {
      // 리뷰가 존재하다면 리뷰를 제거
      if (review) {
        GroundReview.destroy({
          where: { id: reviewId }
        })
        .then(() => {
          GroundReview.findAll({
            where: { groundId }
          })
          .then(async (reviews) => {
            const list = await Promise.all(
              reviews.map((el) => {
                return el.dataValues.score
              })
            )
            res.send({ data: list, message: '리뷰가 삭제되었습니다' })
          })
        })
        .catch((error) => {
          console.log('리뷰 삭제 에러')
          next(error)
        })
      } else {
        res.status(404).send({ message: '존재하지 않는 리뷰입니다' })
      }
    })
  }
}
