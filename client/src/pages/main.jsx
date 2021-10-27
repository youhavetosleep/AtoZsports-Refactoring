import React from 'react'
import styled from 'styled-components'
import GlobalStyle from '../globalStyle/globalStyle'
import mainLogo from '../image/mainLogo.png'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'

const Main = () => {
  return (
    <>
      <GlobalStyle />
      <MainPage>
        <MainLogoPage>
          <MainLogo>
            <img src={mainLogo} className="logo"></img>
            <div className="logo_text">우리동네 스포츠의 A 부터 Z 까지</div>
            <Link to="/entrance" className="logo_button">
              입장하기
            </Link>
          </MainLogo>
          <DownArrow>
            <DownArrow2>
              <DownArrowSpan>
                <span></span>
                <span></span>
              </DownArrowSpan>
            </DownArrow2>
          </DownArrow>
        </MainLogoPage>
        <Landing1>
          <Landing_Container>
            <Landing_In>
              <Landing_text>
                <div className="landing_mainText">
                  우리동네의
                  <br />
                  경기장을 찾아보세요.
                </div>
                <div className="landing_subText">
                  우리동네 경기장에서부터
                  <br />
                  전국의 경기장 정보를 제공합니다.
                  <br />
                  <br />
                  한번 검색해보세요,
                  <br />
                  지금도 그곳에선 뜨거운 경기가 열리고 있습니다!
                </div>
              </Landing_text>
              <img src={mainLogo} className="landing_gif"></img>
            </Landing_In>
          </Landing_Container>
        </Landing1>
        <Landing2>
          <Landing_Container>
            <Landing_In>
            <img src={mainLogo} className="landing_gif"></img>
              <Landing_text>
                <div className="landing_mainText2">
                  팀원을 모집할 수 있고
                  <br />
                  경기를 주선할 수 있습니다.
                </div>
                <div className="landing_subText2">
                  같이 운동할 팀원을 찾고 있나요?
                  <br />
                  이곳에선 다양한 스포츠메이트를 만날 수 있습니다.
                  <br />
                  적재적소에 필요한 팀원을 모집해 보세요.
                  <br />
                  <br />
                  이미 팀이 있다면
                  <br />
                  다른팀에게 경기를 제안할 수 있습니다.
                </div>
              </Landing_text>
            </Landing_In>
          </Landing_Container>
        </Landing2>
        <Landing1>
          <Landing_Container>
            <Landing_In>
              <Landing_text>
                <div className="landing_mainText">
                  다양한 소통의 기능을
                  <br />
                  제공합니다.
                </div>
                <div className="landing_subText">
                  같은 경기장을 사용했던 사람들의 솔직한 리뷰나
                  <br />
                  사용하고싶은 경기장의 리뷰를 확인할 수 있습니다.
                  <br />
                  <br />
                  팀원간의 커뮤니케이션을 위해
                  <br />
                  실시간 채팅기능을 제공합니다.
                </div>
              </Landing_text>
              <img src={mainLogo} className="landing_gif"></img>
            </Landing_In>
          </Landing_Container>
        </Landing1>
        <LandingFinal>
          <LandingFinal_Text>
            <div className="landing_finalText">
              A to Z Sports 는<br />
              당신의 참여를 기다리고 있습니다.
            </div>
            <div className="landing_subText">
              다양한 분야의 스포츠 메이트들이 이미 운동을 시작했습니다!
            </div>
            <Link to="/entrance" className="logo_button">
              입장하기
            </Link>
          </LandingFinal_Text>
        </LandingFinal>
      </MainPage>
      <Footer />
    </>
  )
}

const MainPage = styled.div`
  background: #fafafa;
`

const MainLogoPage = styled.div`
  width: 100%;
  height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MainLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    width: 27rem;
  }
  .logo_text {
    margin-top: 5px;
    font-size: 23px;
    text-align: center;
  }
  .logo_button {
    margin-top: 32px;
    padding: 7px;
    width: 145px;
    height: 14px;
    text-align: center;
    font-size: 15px;
    color: #353535;
    border: 2.5px solid #353535;
    border-radius: 15px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: #840909;
      border: 2.5px solid #840909;
      transition: 0.3s ease-out;
    }
  }
`

const DownArrow = styled.section`
  position: absolute;
  bottom: 3rem;
  left: 0;
  width: 100%;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const DownArrow2 = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const DownArrowSpan = styled.div`
  span {
    display: block;
    width: 1.5em;
    height: 1.5em;
    border-bottom: 2px solid #606060;
    border-right: 2px solid #606060;
    transform: rotate(45deg);
    margin: -8px;
    animation: animate-arrows 2s infinite;

    @keyframes animate-arrows {
      0% {
        opacity: 0;
        transform: rotate(45deg) translate(-1.5em, -1.5em);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: rotate(45deg) translate(1.5em, 1.5em);
      }
    }
  }
`

const Landing1 = styled.section`
  background-color: #f2f2f2;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const Landing_Container = styled.div`
  max-width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Landing_In = styled.div`
  width: 100vw;
  height: 50%;
  margin: 12rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0.2rem;
  .landing_gif {
    display: flex;
    width: 40vw;
  }
`

const Landing_text = styled.div`
display: flex;
flex-direction: column;
  .landing_mainText {
    font-size: 40px;
    display: flex;
    flex-direction: column;
  }
  .landing_subText {
    font-size: 20px;
    margin-top: 20px;
  }
  .landing_mainText2 {
    font-size: 40px;
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  .landing_subText2 {
    font-size: 20px;
    margin-top: 20px;
    text-align: right;
  }
`

const Landing2 = styled.section`
  background-color: #fafafa;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const LandingFinal = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 200px;
`

const LandingFinal_Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .landing_finalText {
    font-size: 40px;
  text-align: center;
  }
  .landing_subText {
    margin-top: 30px;
  }
  .logo_button {
    margin-top: 32px;
    padding: 7px;
    width: 145px;
    height: 14px;
    text-align: center;
    font-size: 15px;
    color: #353535;
    border: 2.5px solid #353535;
    border-radius: 15px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: #840909;
      border: 2.5px solid #840909;
      transition: 0.3s ease-out;
    }
  }
`

export default Main
