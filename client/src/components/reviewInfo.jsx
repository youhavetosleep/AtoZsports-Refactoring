import React from 'react'
import styled from 'styled-components'
import { FaRegStar } from 'react-icons/fa'
import { STAR } from '../utils/data'

const ReviewInfo = ({ groundData }) => {
  const result =
    groundData.score &&
    Math.floor(
      groundData.score.reduce((sum, cur) => sum + cur, 0) /
        groundData.score.length
    )
  const average =
    groundData.score &&
    groundData.score.reduce((avg, cur) => avg + cur, 0) /
      groundData.score.length

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
      </TitleScore>

      <StarWrap>
        <Info className="avg">평균 {!Number(average) ? 0 : average.toFixed(1)}</Info>
        <Info className="count">리뷰 {groundData.score.length}</Info>
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
    margin: auto 5px;
    color: #454545;
    font-size: 20px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  .count {
    margin: auto 5px;
    font-size: 20px;
    color: #454545;
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
