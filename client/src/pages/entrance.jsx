import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import { selectedSport } from '../_actions/user_action'
import futsal from '../image/futsal.jpg'
import running from '../image/running.jpeg'
import basketball from '../image/basketball.jpeg'
import comming from '../image/comming.jpeg'

const Entrance = () => {
const dispatch = useDispatch()
  return (
    <>
      <SportsMain>
        <SportsSub>
          <Link to="/futsal" onClick={()=>{dispatch(selectedSport('풋살'))}} style={{ textDecoration: 'none' }}>
            <Footsal>
              <img src={futsal} alt="futsal" className="entrance_img" />
                <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
                <div className="entrance_subText">FUTSAL</div>
            </Footsal>
          </Link>
        </SportsSub>
        <SportsSub>
          <Running>
            <img src={running} alt="running" className="entrance_img" />
            <div className="entrance_mainText">함께 달릴 준비가 되었나요?</div>
            <div className="entrance_subText">COMMING SOON</div>
          </Running>
        </SportsSub>
        <SportsSub>
          <BasketBall>
            <img src={basketball} alt="basketball" className="entrance_img" />
            <div className="entrance_mainText">왼손은 거들뿐</div>
            <div className="entrance_subText">COMMING SOON</div>
          </BasketBall>
        </SportsSub>
        <SportsSub>
          <CommingSoon>
            <img src={comming} alt="comming" className="entrance_img" />
            <div className="entrance_mainText">계속 업데이트 됩니다</div>
            <div className="entrance_subText">COMMING SOON</div>
          </CommingSoon>
        </SportsSub>
      </SportsMain>
    </>
  )
}

const SportsMain = styled.section`
  height: 100%;
  display: flex;
  background-color: none;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`

const SportsSub = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-size: cover;
  :hover {
    .entrance_mainText {
      color: white;
    }
    .entrance_subText {
      color: white;
    }
    .entrance_img {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

const Footsal = styled.div`
  position: relative;
  .entrance_mainText {
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.1vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      font-size: 1.1rem;
  }
  }
  .entrance_subText {
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      margin-top: 20px;
      font-size: 1.4rem;
  }
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    vertical-align: middle;
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 25vh;
    }
  }
`

const Running = styled.div`
  position: relative;
  .entrance_mainText {
    width: 210px;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      font-size: 1.1rem;
  }
  }
  .entrance_subText {
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      margin-top: 20px;
      font-size: 1.4rem;
  }
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    vertical-align: middle;
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 25vh;
    }
  }
`

const BasketBall = styled.div`
  position: relative;
  .entrance_Text {
  }
  .entrance_mainText {
    width: 210px;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      font-size: 1.1rem;
  }
  }
  .entrance_subText {
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      margin-top: 20px;
      font-size: 1.4rem;
  }
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    vertical-align: middle;
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 25vh;
    }
  }
`

const CommingSoon = styled.div`
  position: relative;
  .entrance_mainText {
    width: 210px;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      font-size: 1.1rem;
  }
  }
  .entrance_subText {
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    text-align: center;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
    @media screen and (max-width: 767px) {
      margin-top: 20px;
      font-size: 1.4rem;
  }
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    vertical-align: middle;
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 25vh;
    }
  }
`

export default Entrance
