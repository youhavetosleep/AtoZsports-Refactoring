import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import futsalSliderImg from '../../image/futsal_main.jpg'

const Slide01 = () => {
  return (
    <>
      <Slider01>
        <img
          src={futsalSliderImg}
          alt="futsalSlideImg"
          className="slider_img"
        ></img>
        <SliderText>
          <div className="slider_mainText">
            A to Z Sports Futsal 에<br />
            <p>오신것을 환영합니다.</p>
          </div>
          <div className="slider_subText">
            우리동네 풋살의 연결고리,
            <br />
            A to Z Sports Futsal 에서 오늘의 경기를 확인하고
            <br />
            다양한 서비스를 이용해 보세요.
          </div>
          <Link to="/matchlist" style={{ textDecoration: 'none' }}>
            <div className="slider_button">모집현황 보기</div>
          </Link>
        </SliderText>
      </Slider01>
    </>
  )
}

const Slider01 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 767px) {
    width: auto;
  }
  .slider_img {
    height: 100%;
    filter: brightness(70%);
    opacity: 0.85;
    background-size: cover;
    vertical-align: middle;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 60vh;
    object-fit: cover;
  }
`

const SliderText = styled.div`
  width: 100%;
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  .slider_mainText {
    top: 10vh;
    font-size: 3em;
    color: white;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    @media screen and (max-width: 767px) {
      font-size: 1.6rem;
      line-height: 30px;
    }
  }
  .slider_mainText p {
    left: 20%;
    font-size: 0.7em;
    color: white;
    text-align: center;
  }
  .slider_subText {
    font-size: 1.2em;
    margin-top: 15px;
    color: white;
    text-align: center;
    line-height: 25px;
    font-weight: lighter;
    @media screen and (max-width: 767px) {
      font-size: 0.8rem;
      line-height: 16px;
    }
  }
  .slider_button {
    top: 62%;
    padding: 9px;
    margin-top: 30px;
    width: 130px;
    height: 13px;
    text-align: center;
    font-size: 15px;
    background-color: #fafafa;
    opacity: 0.5;
    color: #353535;
    border-radius: 15px;
    text-decoration: none;
    font-weight: bold;
    :hover {
      cursor: pointer;
      color: #840909;
      opacity: 1;
      background-color: #dcdcdc;
    }
  }
`

export default Slide01
