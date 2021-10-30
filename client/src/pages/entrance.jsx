import React from 'react'
import styled from 'styled-components'
import GlobalStyle from '../globalStyle/globalStyle'
import futsal from '../image/futsal.jpg'
import running from '../image/running.jpeg'
import basketball from '../image/basketball.jpeg'
import comming from '../image/comming.jpeg'
import { Link } from 'react-router-dom'

const Entrance = () => {
  return (
    <>
      <GlobalStyle />
      <Sports_Main>
        <Sports_Sub>
          <Link to="/futsal" style={{ textDecoration: 'none' }}>
            <Footsal>
              <img src={futsal} className="entrance_img" />
              <div className="entrance_Text">
                <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
                <div className="entrance_subText">FUTSAL</div>
              </div>
            </Footsal>
          </Link>
        </Sports_Sub>
        <Sports_Sub>
          <Running>
            <img src={running} className="entrance_img" />
            <div className="entrance_mainText">함께 달릴 준비가 되었나요?</div>
            <div className="entrance_subText">COMMING SOON</div>
          </Running>
        </Sports_Sub>
        <Sports_Sub>
          <BasketBall>
            <img src={basketball} className="entrance_img" />
            <div className="entrance_mainText">왼손은 거들뿐</div>
            <div className="entrance_subText">COMMING SOON</div>
          </BasketBall>
        </Sports_Sub>
        <Sports_Sub>
          <CommingSoon>
            <img src={comming} className="entrance_img" />
            <div className="entrance_mainText">계속 업데이트 됩니다</div>
            <div className="entrance_subText">COMMING SOON</div>
          </CommingSoon>
        </Sports_Sub>
      </Sports_Main>
    </>
  )
}

const Sports_Main = styled.section`
  height: 100%;
  display: flex;
  background-color: none;
`

const Sports_Sub = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-size: cover;
  :hover {
    .entrance_mainText{
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
    top: 45%;
	  left: 26%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 37%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const Running = styled.div`
  position: relative;
  .entrance_Text {
  
  }
  .entrance_mainText {
    top: 45%;
	  left: 22%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 19%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const BasketBall = styled.div`
  position: relative;
  .entrance_Text {
  
  }
  .entrance_mainText {
    top: 45%;
	  left: 36%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 20%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

const CommingSoon = styled.div`
  position: relative;
  .entrance_Text {
  
  }
  .entrance_mainText {
    top: 45%;
	  left: 28%;
    font-size: 1.3vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 19%;
    font-size: 2vw;
    font-weight: bold;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 25vw;
    height: 100vh;
    background-size: cover;
    vertical-align: middle;
  }
`

export default Entrance
