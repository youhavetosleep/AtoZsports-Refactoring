import React from 'react'
import styled from 'styled-components'
import { STAR } from '../utils/data'

const ReviewInfo = ({ groundData }) => {
  const result =
  groundData.score &&
  Math.floor(
    groundData.score.reduce((sum, cur) => sum + cur, 0) /
      groundData.score.length
  )

  return (
    <InfoWrap>
      <p id="result"></p>
      <Title>{groundData.placeName}</Title>
      <TitleScore>
        {
          STAR.map((el, idx) => {
            if (el.star === result) {
              return el.name
            }
          })
        }
      </TitleScore>
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
  }
  .phone {
    font-size: 17px;
  }
`
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`
const TitleScore = styled.div`
  margin-bottom: 20px;
  color: #fcc419;
  font-size: 25px;
`
const Info = styled.p``

export default ReviewInfo
