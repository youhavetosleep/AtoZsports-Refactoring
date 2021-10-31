import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { getMatchData, getMatchList } from '../_actions/matchCard_action'
import Footer from '../components/footer'
import gotomap from '../image/gotomap.jpg'
import sublogo from '../image/subLogo.png'
import stadium from '../image/stadium.jpg'
import premier from '../image/premier_league.png'
import '../styles/slick.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import GlobalStyle from '../globalStyle/globalStyle'
import Slide_01 from '../components/futsalSlide/slide_01'
import Slide_02 from '../components/futsalSlide/slide_02'
import Slide_03 from '../components/futsalSlide/slide_03'
import MatchCard from '../components/matchCard'
import { Link } from 'react-router-dom'
import MoreViewCard from '../components/moreviewCard'

const Futsal = () => {
  const dispatch = useDispatch()

  const [CurrentOrder, setCurrentOrder] = useState('용병모집')
  const [memberData, setMemberData] = useState(null)

  useEffect(() => {
    dispatch(getMatchData())
      .then((res) => {
        setMemberData(res.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  },[])

  console.log(memberData)


  const latestBtn = () => {
    setCurrentOrder('용병모집')
    // console.log(setCurrentOrder())
  }

  const viewBtn = () => {
    setCurrentOrder('경기제안')
  }

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
          <Link to="/entrance" style={{ textDecoration: 'none' }}>
            <BackPage>
              <img src={sublogo} className="backPage"></img>
              <div className="back_to_main">메인페이지로 가기</div>
            </BackPage>
          </Link>
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <GotoMap>
              <img src={gotomap} className="mapImage"></img>
              <div className="go_to_mapText">우리동네 풋살장 검색하기</div>
              <div className="go_to_map">지도로 이동하기</div>
            </GotoMap>
          </Link>
        </FutsalBackMapSection>
        <FutsalMatchSoonSection>
          <MatchSoonTitle>
            <div className="matchSoon_title">Match Soon!</div>
          </MatchSoonTitle>
          <MatchSoonFilter>
            <span className="ordergroup">
              <span
                className={
                  CurrentOrder === '최신순' ? 'setbold first' : 'first'
                }
                onClick={latestBtn}
              >
                용병모집
              </span>
              |
              <span
                className={
                  CurrentOrder === '조회순' ? 'setbold second' : 'second'
                }
                onClick={viewBtn}
              >
                경기제안
              </span>
            </span>
            <div className="dropBox"></div>
          </MatchSoonFilter>
          <MatchSoonList>
            <div className='matchCard'>
            {memberData && memberData.map((member, idx) => (
              <MatchCard
              setMemberData={setMemberData}
              member={member}
              key={idx}
              />
            ))}
            <div className='moreView'>
            <MoreViewCard />
            </div>
            </div>
          </MatchSoonList>
        </FutsalMatchSoonSection>
        <FutsalAnotherSection>
          <div className="reviewLeague">
            <Link to="/review" style={{ textDecoration: 'none' }}>
              <StadiumReview>
                <img src={stadium} className="stadiumImg"></img>
                <div className="stadiumReview1">풋살장 리뷰</div>
                <div className="stadiumReview2">
                  경기장을 직접 사용한 사람들의 리뷰
                </div>
                <div className="stadiumReview3">리뷰 바로가기</div>
              </StadiumReview>
            </Link>
            <Link to="/premierleague" style={{ textDecoration: 'none' }}>
              <PremierLeague>
                <img src={premier} className="premierLeagueImg"></img>
                <div className="premierLeagueText">프리미어리그 바로가기</div>
              </PremierLeague>
            </Link>
          </div>
          <Notice>
            <div className="notice">공지사항</div>
            <div className="notice_list">
              <div className="notice_title">[공지]</div>
              <div className="notice_text">누리 풋살장 잔디교체 공사중</div>
            </div>
            <div className="notice_list">
              <div className="notice_title">[공지]</div>
              <div className="notice_text">
                유림 풋살장 거리두기 단계 격상으로
                <br />
                인해 잠정 운영 중단
              </div>
            </div>
            <div className="notice_list">
              <div className="notice_title">[공지]</div>
              <div className="notice_text">
                유저 간 실시간 채팅기능
                <br />
                업데이트 예정
              </div>
            </div>
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
  .slider {
    color: white;
  }
`

const FutsalBackMapSection = styled.section`
  max-width: 1110px;
  display: flex;
  align-items: center;
  margin: 40px auto 60px;
`

const BackPage = styled.div`
  width: 120px;
  display: flex;
  height: 108px;
  border: 1px solid #747474;
  padding: 20px;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  .back_to_main {
    font-size: 13px;
    color: #747474;
    position: absolute;
    bottom: 18px;
  }
  .backPage {
    top: 0px;
    width: 90%;
    height: 90%;
  }
`

const GotoMap = styled.div`
  width: 810px;
  display: flex;
  height: 150px;
  margin-left: 30px;
  padding: 0px 10px 0px 0px;
  /* transition: all 0.5s; */
  position: relative;
  .mapImage {
    opacity: 0.9;
    filter: brightness(75%);
    border-radius: 5px;
  }
  .go_to_mapText {
    display: flex;
    font-size: 2em;
    color: #fafafa;
    position: absolute;
    right: -30px;
    bottom: 60px;
  }
  .go_to_map {
    font-size: 1.3em;
    color: #fafafa;
    position: absolute;
    right: -30px;
    bottom: 15px;
  }
`

const FutsalMatchSoonSection = styled.section`
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  border-top: 1px solid #C4C4C4;
  border-bottom: 1px solid #C4C4C4;
  padding: 60px 0px 50px 0px;
  margin: auto;
`

const MatchSoonTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .matchSoon_title {
    font-size: 3rem;
  }
`

const MatchSoonFilter = styled.div`
  margin-bottom: 20px;
`

const MatchSoonList = styled.div`
  display: flex;
  position: relative;
  
  .matchCard {
  display: grid;
  grid-template-columns: repeat(3, 31.8%);
  row-gap: 20px;
  column-gap: 24px;
  /* margin-bottom: 20px; */
  }
  .moreView {
    position: flex;
    right: -15px;
    bottom: 0px;
    display: flex;
  }
`

const MatchText = styled.div``

// const MatchCard = styled.div``

const FutsalAnotherSection = styled.section`
  max-width: 1110px;
  display: flex;
  justify-content: center;
  margin: 60px auto 60px auto;
  position: relative;
`

const StadiumReview = styled.div`
  display: flex;
  position: relative;
  width: 740px;
  height: 290px;
  padding: 0px 0px 30px 0px;
  border-radius: 5px;
  .stadiumReview1 {
    position: absolute;
    font-size: 2.5em;
    color: #fafafa;
    top: 40px;
    left: 30px;
  }
  .stadiumReview2 {
    position: absolute;
    font-size: 1.5em;
    color: #fafafa;
    top: 90px;
    left: 30px;
    font-weight: lighter;
  }
  .stadiumReview3 {
    position: absolute;
    font-size: 1.3em;
    color: #fafafa;
    right: 70px;
    bottom: 20px;
  }
  .stadiumImg {
    width: 800px;
    height: 320px;
    border-radius: 5px;
    opacity: 0.9;
    filter: brightness(60%);
  }
`

const PremierLeague = styled.div`
  display: flex;
  position: relative;
  justify-content: left;
  width: 700px;
  height: 100px;
  border: 1px solid #747474;
  padding: 37px 28px 4px 10px;
  margin-top: 30px;
  border-radius: 5px;
  .premierLeagueImg {
    display: flex;
    position: absolute;
    width: 400px;
    height: 130px;
    top: 0px;
  }
  .premierLeagueText {
    position: absolute;
    font-size: 1.2em;
    color: #373737;
    right: 70px;
    bottom: 20px;
  }
`

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 452px;
  border: 1px solid #747474;
  padding: 20px;
  margin-left: 30px;
  border-radius: 5px;
  .notice {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .notice_list {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .notice_title {
      color: #840909;
    }
    .notice_text {
      margin-left: 10px;
      line-height: 20px;
    }
  }
`

export default Futsal

function NextArrow(props) {
  const { className, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  )
}

function PrevArrow(props) {
  const { className, onClick } = props
  return (
    <>
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </>
  )
}
