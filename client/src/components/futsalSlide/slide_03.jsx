import React from 'react';
import styled from 'styled-components'
import GlobalStyle from '../../globalStyle/globalStyle'
import futsalSliderImg from '../../image/futsal_main.jpg'
import { Link } from 'react-router-dom'

const Slide_03 = () => {
  return (
    <>
      <GlobalStyle />
      <Slider_03>
        <img src={futsalSliderImg} className="slider_img"></img>
        <SliderText>
        <div className="slider_mainText">
          경기장을 직접 사용한 사용자들의
          <br />
          솔직한 후기를 제공합니다.
        </div>
        <div className="slider_subText">
          몸으로 느끼며 체험한 경기장들을
          <br />
          솔직하게 리뷰합니다, 사용자들과 소통하며
          <br />
          경기장의 정보를 확인하세요.
        </div>
        <Link to='/review' style={{textDecoration: 'none'}}>
        <div className="slider_button">경기장 리뷰보기</div>
        </Link>
        </SliderText>
      </Slider_03>
    </>
  )
}

const Slider_03 = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
position: relative;

.slider_img{
 width: 100%;
 height: 100%;
 filter: brightness(70%);
 opacity: .85;
 background-size: cover;
    vertical-align: middle;
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
 color: white;
 text-align: center;
 font-weight: bold;
 line-height:60px;
}
.slider_subText {
 font-size: 1.2em;
 margin-top: 15px;
 color: white;
 text-align: center;
 line-height:25px;
 font-weight: lighter;
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
}
`



export default Slide_03