import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/slick.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import GlobalStyle from '../globalStyle/globalStyle'
import Slide_01 from '../components/futsalSlide/slide_01'
import Slide_02 from '../components/futsalSlide/slide_02'
import Slide_03 from '../components/futsalSlide/slide_03'

const Futsal = () => {
  const dispatch = useDispatch();

  const [matchData, setMatchData] = useState({
    "id": 1,
    "title": "공덕 풋살장 용병뛰실분?",
    "division": null,
    "startTime": "2021.11.01 08:30",
    "endTime": "2021.11.01 12:00",
    "placeName": "공덕 풋살장",
    "content": "공격수 1명, 키퍼 1명 구합니다. 픽업은 안되고 직접오셔야 됩니다.",
    "status": true,
},{
  "id": 2,
  "title": "공덕 풋살장 용병뛰실분?",
  "division": null,
  "startTime": "2021.11.01 08:30",
  "endTime": "2021.11.01 12:00",
  "placeName": "공덕 풋살장",
  "content": "공격수 1명, 키퍼 1명 구합니다. 픽업은 안되고 직접오셔야 됩니다.",
  "status": true,
}
);

  const setting = {
    slide: 'div',
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <>
      <GlobalStyle />
        <Navbar />
          <FutsalLandingPage>
            <FutsalSliderSection>
              <Slider {...setting} className="slider">
                <div witdh="100%">
                  <Slide_01 />
                </div>
                <div witdh="100%">
                  <Slide_02 />
                </div>
                <div witdh="100%">
                  <Slide_03 />
                </div>
              </Slider>
            </FutsalSliderSection>
            <FutsalBackMapSection>
              <BackPage>
                  <div className="back_to_main">메인페이지로 가기</div>
              </BackPage>
              <GotoMap>
                  <div className="go_to_mapText">
                    우리동네 풋살장 검색하기
                  </div>
                  <div className="go_to_map">지도로 이동하기</div>
              </GotoMap>
            </FutsalBackMapSection>
            <FutsalMatchSoonSection>
              <MatchText>
                  {/* <div className="matchSoon">Match Soon!</div>
                  {matchData.length === 0 ? (
                    <p className="noissue stopdragging">소식이 없습니다.</p>
                  ) : (
                    matchData.map(el => {
                      return (
                        <div key={el.title}>
                          <ul>
                            <li>{el.title}</li>
                          </ul>
                        </div>
                      )
                    })
                  )} */}
              </MatchText>
              <MatchCard />
            </FutsalMatchSoonSection>
            <FutsalAnotherSection>
              <StadiumReview>

              </StadiumReview>
              <PremierLeague>

              </PremierLeague>
              <Notice>

              </Notice>
            </FutsalAnotherSection>
          </FutsalLandingPage>
      <Footer />
    </>
  )
}

const FutsalLandingPage = styled.div`
width: 100%;
`

const FutsalSliderSection = styled.section`
width: 100%;
.slider{
  color: white;
}
`

const FutsalBackMapSection = styled.section`
max-width: 1100px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
/* margin-top: 40px; */
margin: 40px auto 60px;
`

const BackPage = styled.div`
width: 280px;
display: flex;
height: 150px;
border: 1px solid red;
justify-content: center;
.back_to_main {
  font-size: 20px;
}
`

const GotoMap = styled.div`
width: 80vw;
display: flex;
height: 150px;
border: 1px solid red;
margin-left: 30px;
.go_to_mapText {
 font-size: 2em;
}
.go_to_map {
 font-size: 1.5em;
}
`

const FutsalMatchSoonSection = styled.section`

`

const MatchText = styled.div`

`

const MatchCard = styled.div``

const FutsalAnotherSection = styled.section`

`

const StadiumReview = styled.div`

`

const PremierLeague = styled.div`

`

const Notice = styled.div`

`


export default Futsal

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <>
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </>
  );
}