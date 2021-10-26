import React from 'react';
import styled from 'styled-components'
import GlobalStyle from '../../globalStyle/globalStyle'
import futsalSliderImg from '../../image/futsal_main.jpg'
import { Link } from 'react-router-dom'

const Slide_02 = () => {
  return (
    <>
      <GlobalStyle />
      <Slider_01>
        <img src={futsalSliderImg} className="slider_img"></img>
        <div className="slider_mainText">
          우리동네 풋살장을 검색해 보세요.
        </div>
        <div className="slider_subText">
          미처 몰랐던 우리동네 풋살장을
          <br />
          찾아보세요, 의외로 많은 경기장을
          <br />
          확인할 수 있습니다.
        </div>
        <Button to='/map' className="slider_button">풋살장 검색하기</Button>
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


export default Slide_02