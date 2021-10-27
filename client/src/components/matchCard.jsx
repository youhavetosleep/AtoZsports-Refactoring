import React from 'react'
import GlobalStyle from '../globalStyle/globalStyle'
import { Link } from 'react-router-dom'
import eye from '../image/eye.svg';
import styled from 'styled-components';

function MatchCard() {
  
  return (
    <>
      <GlobalStyle />
      <Test>
      <div className="articlebox-listbox">
        <Link to="/entrance" style={{ textDecoration: 'none' }}>
          <ul>
            <li className="articlebox-title">
              공덕풋살장 용병뛰실분?
            </li>
            <li className="articlebox-date">
            2021.11.01 08:30 ~ 12:00
            </li>
            <li className="articlebox-ground">
              공덕풋살장
            </li>
            <li className="articlebox-content">
              공격수 1명, 키퍼 1명 구합니다.<br/>
              픽업은 안되고 직접오셔야 됩니다.
            </li>
            <li>
              <span className="articlebox-state">
                <span>모집중</span>
              </span>
            </li>
          </ul>
        </Link>
      </div>
      </Test>
    </>
  )
}

const Test = styled.div`


.articlebox {
  &-listbox {
    background-color: white;
    border: 1px solid #747474;;
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
    margin: 20px auto 10px auto;
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid gray;
    color: #353535;
  }

  &-date {
    font-size: 1rem;
    margin-bottom: 4px;
    color: #747474;
    padding: 0px 0px 0px 0px;
  }

  &-ground {
    font-size: .9rem;
    margin: 10px auto 20px;
    color: #747474;
    padding: 0px 0px 10px 0px;
  }


  &-content {
    margin-bottom: 40px;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #353535;
  }

  &-state {
    border: 1px solid gray;
    border-radius: 10px;
    font-size: .8rem;
    padding: 2px 15px 2px 15px;
    color: #353535;
    position: absolute;
    right: 24px;
    margin: 0 !important;
  }
}
`

export default MatchCard


