import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import futsalSliderImg from '../../image/futsal_main.jpg'

const Slide02 = () => {
  return (
    <>
      <Slider02>
        <img
          src={futsalSliderImg}
          alt="futsalslideImg"
          className="slider_img"
        ></img>
        <SliderText>
          <div className="slider_mainText">우리 동네 풋살장을 검색해보세요</div>
          <div className="slider_subText">
            미처 몰랐던 우리 동네 풋살장을
            <br />
            찾아보세요. 의외로 많은 경기장을
            <br />
            확인할 수 있습니다.
          </div>
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <div className="slider_button">풋살장 검색하기</div>
          </Link>
        </SliderText>
      </Slider02>
    </>
  )
}

const Slider02 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  .slider_img {
    height: 100%;
    filter: brightness(70%);
    opacity: 0.85;
    background-size: cover;
    vertical-align: middle;
  }
  @media screen and (max-width: 767px) {
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
    font-size: 2.8em;
    color: #fafafa;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    @media screen and (max-width: 767px) {
      font-size: 1.4rem;
      line-height: 30px;
    }
  }
  .slider_subText {
    font-size: 1.2em;
    margin-top: 15px;
    color: #fafafa;
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

export default Slide02
