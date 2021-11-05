import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function MoreViewCard() {
  return (
    <>
      <Link to="/matchlist" style={{ textDecoration: 'none' }}>
        <MoreViewCardContainer>
          <div className="moreMatch-listbox">
            <ul>
              <li className="moreMatch-title">더 많은 공고를 보고싶다면?</li>
              <span className="moreMatch-subTitle">더 많은 공고 보러가기</span>
            </ul>
          </div>
        </MoreViewCardContainer>
      </Link>
    </>
  )
}

const MoreViewCardContainer = styled.div`
  z-index: 10;
  .moreMatch {
    &-listbox {
      background-color: white;
      border: 1px solid #747474;
      border-radius: 5px;
      cursor: pointer;
      display: inline-block;
      width: 300px;
      justify-content: center;
      height: 280px;
      margin-bottom: 20px;
      margin-right: 20px;
      padding: 20px;
      position: relative;
      transition: all 0.5s;

      ul {
        height: 100%;
        width: 100%;
      }

      :hover {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
      }
    }

    &-title {
      font-weight: bold;
      font-size: 1.3rem;
      margin: 110px auto 10px 38px;
      padding: 0px 0px 10px 0px;
      color: #353535;
    }

    &-subTitle {
      /* border: 1px solid gray;
    border-radius: 10px; */
      width: 50%;
      font-size: 1rem;
      margin: 0px 00px 0px 0px;
      padding: 2px 70px 2px 15px;
      color: #353535;
      position: absolute;
      right: 0px;
      margin: 0 !important;
    }
  }
`

export default MoreViewCard
