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
                <div className="entrance_subText">Futsal</div>
              </div>
            </Footsal>
          </Link>
        </Sports_Sub>
        <Sports_Sub>
          <Running>
            <img src={running} className="entrance_img" />
            <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
            <div className="entrance_subText">Futsal</div>
          </Running>
        </Sports_Sub>
        <Sports_Sub>
          <BasketBall>
            <img src={basketball} className="entrance_img" />
            <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
            <div className="entrance_subText">Futsal</div>
          </BasketBall>
        </Sports_Sub>
        <Sports_Sub>
          <CommingSoon>
            <img src={comming} className="entrance_img" />
            <div className="entrance_mainText">5 on 5 의 짧지만 강렬함</div>
            <div className="entrance_subText">Futsal</div>
          </CommingSoon>
        </Sports_Sub>
      </Sports_Main>
    </>
  )
}

const Sports_Main = styled.section`
  height: 100vh;
  display: flex;
  background-color: none;
`

const Sports_Sub = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`

const Footsal = styled.div`
  position: relative;
  .entrance_Text {
    
  }
  .entrance_mainText {
    top: 45%;
	  left: 20%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 40%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 100%;
    background-size: cover;
    vertical-align: middle;
    :hover {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

const Running = styled.div`
  position: relative;
  .entrance_mainText {
    top: 45%;
	  left: 20%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 40%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 100%;
    background-size: cover;
    vertical-align: middle;
    :hover {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

const BasketBall = styled.div`
  position: relative;
  .entrance_mainText {
    top: 45%;
	  left: 20%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 40%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 100%;
    background-size: cover;
    vertical-align: middle;
    :hover {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

const CommingSoon = styled.div`
  position: relative;
  .entrance_mainText {
    top: 45%;
	  left: 20%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_subText {
    top: 50%;
	  left: 40%;
    font-size: 30px;
    color: #353535;
    position: absolute;
    z-index: 10;
  }
  .entrance_img {
    opacity: 0.3;
    width: 100%;
    background-size: cover;
    vertical-align: middle;
    :hover {
      cursor: pointer;
      opacity: 1;
      filter: brightness(80%);
      transition: 0.3s ease-out;
    }
  }
`

export default Entrance
