import React from 'react'
import styled from 'styled-components'
import { FaRegStar } from 'react-icons/fa'
import { STAR } from '../utils/data'

const ReviewInfo = ({ commentData, groundData }) => {

  let scoreData = commentData === '' ? groundData.score : commentData

  const result =
    scoreData &&
    Math.floor(
      scoreData.reduce((sum, cur) => sum + cur, 0) /
        scoreData.length
    )
  const average =
    scoreData &&
    scoreData.reduce((avg, cur) => avg + cur, 0) /
      scoreData.length

  return (
    <InfoWrap>
      <p id="result"></p>
      <Title>{groundData.placeName}</Title>
      <TitleScore>
        {!Number(result) ? (
          <>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </>
        ) : (
          STAR.map((el, idx) => {
            if (el.star === result) {
              return el.name
            }
          })
        )}
        <Info className="avg">
          ({!Number(average) ? 0 : average.toFixed(1)})
        </Info>
      </TitleScore>

      <StarWrap>
        <Info className="count">{scoreData.length}명 참여</Info>
      </StarWrap>
      <Info className="address">{groundData.addressName}</Info>
      <Info className="phone">{groundData.phone}</Info>
    </InfoWrap>
  )
}

const InfoWrap = styled.div`
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  .address {
    font-size: 20px;
    margin-bottom: 10px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
  .phone {
    font-size: 17px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  .avg {
    margin: 6px 5px 0px 5px;
    color: #636363;
    font-size: 17px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  .count {
    margin: auto 5px;
    font-size: 17px;
    margin-top: 3px;
    color: #636363;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
  margin-top: 10px;
`

const TitleScore = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  color: #fcc419;
  font-size: 25px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`

const StarWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const Info = styled.p``

export default ReviewInfo
