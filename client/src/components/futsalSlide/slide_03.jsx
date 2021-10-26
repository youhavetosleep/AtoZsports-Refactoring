import React from 'react';
import styled from 'styled-components'
import GlobalStyle from '../../globalStyle/globalStyle'
import futsalSliderImg from '../../image/futsal_main.jpg'
import { Link } from 'react-router-dom'

const Slide_03 = () => {
  return (
    <>
      <GlobalStyle />
      <Slider_01>
        <img src={futsalSliderImg} className="slider_img"></img>
        <div className="slider_mainText">
          경기장을 직접 사용한 사용자들의<br />
          솔직한 후기를 제공합니다.
        </div>
        <div className="slider_subText">
          몸으로 느끼며 체험한 경기장들을
          <br />
          솔직하게 리뷰합니다. 사용자들과 소통하며
          <br />
          경기장의 정보를 확인하세요.
        </div>
        <Button to='/review' className="slider_button">경기장 리뷰보기</Button>
      </Slider_01>
    </>
  )
}

const Slider_01 = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
position: relative;
.slider_mainText {
 top: 35%;
 position: absolute;
 font-size: 50px;
 color: white;
 text-align: center;
 line-height:60px;
}
.slider_mainText p {
 top: 100%;
 left: 20%;
 position: absolute;
 font-size: 35px;
 color: white;
 text-align: center;
}
.slider_subText {
 margin-top: 80px;
 font-size: 23px;
 position: absolute;
 color: white;
 text-align: center;
 line-height:30px;
 font-weight: lighter;
}
.slider_img{
 width: 100%;
 height: 94vh;
 filter: brightness(70%);
 opacity: .85;
 background-size: cover;
    vertical-align: middle;
}
`

const Button = styled(Link)`
position: absolute;
  ;
  top: 62%;
  padding: 9px;
  width: 130px;
  height: 13px;
  text-align: center;
  font-size: 15px;
  background-color: #fafafa;
  opacity: .5;
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
`


export default Slide_03