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
      <MainLogo>
        <LogoImg src={mainLogo}></LogoImg>
        <LogoText>우리동네 스포츠의 A 부터 Z 까지</LogoText>
        <Button to='/entrance'>입장하기</Button>
      </MainLogo>
        <DownArrow>
          <DownArrow2>
            <DownArrowSpan />
            <DownArrowSpan />
          </DownArrow2>
        </DownArrow>
      <Landing1>
        <OneText>
          <div className="landing_text">
          <div className="landing_mainText">
            우리동네의<br/> 
            경기장을 찾아보세요.
          </div>
          <div className="landing_subText">
            우리동네 경기장에서부터<br/>
            전국의 경기장 정보를 제공합니다.
            <br/>
            <br/>
            한번 검색해보세요,<br/>
            지금도 그곳에선 뜨거운 경기가 열리고 있습니다!
          </div>
          </div>
        </OneText>
        <OneGif>
          <img src={mainLogo}></img>
        </OneGif>
      </Landing1>
      <Landing1>
      <OneGif>
          <img src={mainLogo}></img>
        </OneGif>
        <OneText>
          <div className="landing_text">
          <div className="landing_mainText">
            팀원을 모집할 수 있고<br/> 
            경기를 주선할 수 있습니다.
          </div>
          <div className="landing_subText">
            같이 운동할 팀원을 찾고 있나요?<br/>
            이곳에선 다양한 스포츠메이트를 만날 수 있습니다.<br/>
            적재적소에 필요한 팀원을 모집해보세요.
            <br/>
            <br/>
            이미 팀이 있다면,<br/>
            다른팀에게 경기를 제안할 수 있습니다.
          </div>
          </div>
        </OneText>
      </Landing1>
      <Landing1>
        <TwoText>
          <div className="landing_text2">
          <div className="landing_mainText2">
            다양한 소통의 기능을<br/> 
            제공합니다.
          </div>
          <div className="landing_subText2">
            우리동네 경기장에서부터<br/>
            전국의 경기장 정보를 제공합니다.
            <br/>
            <br/>
            한번 검색해보세요,<br/>
            지금도 그곳에선 뜨거운 경기가 열리고 있습니다!
          </div>
          </div>
        </TwoText>
        <OneGif>
          <img src={mainLogo}></img>
        </OneGif>
      </Landing1>
      <LandingFinal>
        <FinalMainText>
          A to Z Sports 는<br/>
          당신의 참여를 기다리고 있습니다.
        </FinalMainText>
        <FinalSubText>
          다양한 분야의 스포츠 메이트들이 이미 운동을 시작했습니다!
        </FinalSubText>
        <Button to='/entrance'>입장하기</Button>
      </LandingFinal>
    </MainPage>
    <Footer />
    </>
  )
}

const MainPage = styled.div`
  background: #FAFAFA;
`

const MainLogo = styled.div`
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 310px;
`

const LogoImg = styled.img`
  width: 27rem;
`

const LogoText = styled.div`
  margin-top: 5px;
  font-size: 23px;
  text-align: center;
`

const Button = styled(Link)`
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
  }
`

const DownArrow = styled.section`
  position: block;
  bottom: 9rem;
  left: 0;
  width: 100%;
  height: 8vh;
  margin-top: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const DownArrow2 = styled.div`
  
`

const DownArrowSpan = styled.span`
  display: block;
  width: 1.5em;
  height: 1.5em;
  border-bottom: 2px solid #606060;
  border-right: 2px solid #606060;
  transform: rotate(45deg);
  margin: -8px;
  animation: animate-arrows 1.5s infinite;

  @keyframes animate-arrows{
  0%{
    opacity: 0;
    transform: rotate(45deg) translate(-1.5em, -1.5em);
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    transform: rotate(45deg) translate(1.5em, 1.5em);
  }
}
`

const Landing1 = styled.section`
  background-color: #F2F2F2;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const Landing2 = styled.div`
  background-color: #FAFAFA;
  margin-top: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Landing3 = styled.div`
  background-color: #F2F2F2;
  margin-top: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`


const OneText = styled.div`
  max-width: 1024px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .landing_text {

  }
  .landing_mainText {
    font-size: 40px;
    display: flex;
    flex-direction: column;
  }
  .landing_subText {
    font-size: 20px;
  }
`

const TwoText = styled.div`
  max-width: 1024px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: right;
  .landing_text {

  }
  .landing_mainText {
    font-size: 40px;
    display: flex;
    flex-direction: column;
  }
  .landing_subText {
    font-size: 20px;
  }
`

const MainText = styled.div`

`

const SubText = styled.div`

`

const OneGif = styled.div`

`

const LandingFinal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 200px;
  align-items: center;
`

const FinalMainText = styled.div`
  font-size: 40px;
  text-align: center;
`

const FinalSubText = styled.div`
  margin-top: 30px;
`


export default Main
