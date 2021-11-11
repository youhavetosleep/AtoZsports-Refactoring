import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

import '../styles/slick.css'
import { getMatchData } from '../_actions/matchCard_action'
import RegionBoxFutsal from '../utils/regionBoxFutsal'
import gotomap from '../image/gotomap.jpg'
import sublogo from '../image/subLogo.png'
import stadium from '../image/stadium.jpg'
import premier from '../image/premier_league.png'
import Footer from '../components/footer'
import Slide01 from '../components/futsalSlide/slide01'
import Slide02 from '../components/futsalSlide/slide02'
import Slide03 from '../components/futsalSlide/slide03'
import MatchCard from '../components/matchCard'
import MoreViewCard from '../components/moreviewCard'
import LogoCard from '../components/logoCard'
import Navbar from '../components/navbar'
import { accordGroundData, mapData } from '../_actions/ground_action'

const Futsal = ({
  region1,
  region2,
  isLogin,
  setIsLogin
}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [CurrentOrder, setCurrentOrder] = useState('member')
  const [memberData, setMemberData] = useState([])
  const [dummyData, setDummyData] = useState([{}, {}, {}, {}, {}])

  let setFirst = region1
  let setSecond = region2

  const [firstRegion, setFirstRegion] = useState(setFirst)
  const [secondRegion, setSecondRegion] = useState(setSecond)

  const firstData1 = (e) => {
    setFirstRegion(e)
  }
  const firstData2 = (e) => {
    setSecondRegion(e)
  }
  const handleData1 = (e) => {
    setFirstRegion(e.value)
  }
  const handleData2 = (e) => {
    setSecondRegion(e.value)
  }

  useEffect(() => {
    dispatch(mapData({}))
    dispatch(getMatchData(CurrentOrder, firstRegion, secondRegion))
      .then((res) => {
        setMemberData(res.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [CurrentOrder, secondRegion])

  const matchBtn = () => {
    setCurrentOrder('match')
  }

  const memberBtn = () => {
    setCurrentOrder('member')
  }

  const handleGotoReview = () => {
    history.push(`/review`)
  }

  const matchInfoHadler = () => {
    if (!isLogin) {
      Swal.fire({
        text: '로그인이 필요한 서비스 입니다!',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인'
      })
      return
    } else {
      history.push(`/write`)
      window.location.reload()
    }
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
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <FutsalLandingPage>
        <FutsalSliderSection>
          <Slider {...setting} className="slider">
            <div witdh="100%">
              <Slide01 />
            </div>
            <div witdh="100%">
              <Slide02 />
            </div>
            <div witdh="100%">
              <Slide03 />
            </div>
          </Slider>
        </FutsalSliderSection>
        <FutsalBackMapSection>
          <Link to="/entrance" style={{ textDecoration: 'none' }}>
            <BackPage>
              <img src={sublogo} alt="sublogo" className="backPage"></img>
              <div className="back_to_main">다른운동하러가기</div>
            </BackPage>
          </Link>
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <GotoMap>
              <img src={gotomap} alt="gotomap" className="mapImage"></img>
              <div className="go_to_mapText">우리동네 풋살장 검색하기 ➝ </div>
              <div className="go_to_map">지도로 이동하기 </div>
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
                  CurrentOrder === 'member' ? 'setbold first' : 'first'
                }
                onClick={memberBtn}
              >
                용병모집
              </span>
              |
              <span
                className={
                  CurrentOrder === 'match' ? 'setbold second' : 'second'
                }
                onClick={matchBtn}
              >
                경기제안
              </span>
            </span>
            <RegionBoxFutsal
              region1={region1}
              region2={region2}
              handleData1={handleData1}
              handleData2={handleData2}
              firstData1={firstData1}
              firstData2={firstData2}
            />
          </MatchSoonFilter>
          <MatchSoonList>
            <div className="all_MatchCard">
              {
                //카드가 전부 차있을 경우
                memberData.length === 5
                  ? memberData &&
                    memberData.map((member, idx) => {
                      return (
                        <MatchCard
                          member={member}
                          key={idx}
                          isLogin={isLogin}
                        />
                      )
                    })
                  : null
              }
              {memberData.length === 5 ? <MoreViewCard /> : null}
            </div>
            <div className="notAll_MatchCard">
              {
                // 공고가 1개 이상 4개 이하일때
                memberData.length < 5 && memberData.length > 0
                  ? memberData &&
                    memberData.slice(0, 5).map((member, idx) => {
                      return (
                        <MatchCard
                          member={member}
                          key={idx}
                          isLogin={isLogin}
                        />
                      )
                    })
                  : null
              }
              {memberData.length < 5 && memberData.length > 0
                ? dummyData &&
                  dummyData.slice(0, 5 - memberData.length).map((el) => {
                    return <LogoCard />
                  })
                : null}
              {memberData.length < 5 && memberData.length > 0 ? (
                <MoreViewCard />
              ) : null}
            </div>
            {memberData.length === 0 ? (
              <>
                <div className="empty_MatchCard">
                  <div className="gotoWrite">
                    해당지역의 공고가 없습니다,
                    <br />
                    직접 작성해보시겠어요?
                  </div>
                  <div className="linkWrite" onClick={() => matchInfoHadler()}>
                    게시글 작성
                  </div>
                </div>
              </>
            ) : null}
          </MatchSoonList>
        </FutsalMatchSoonSection>
        <FutsalAnotherSection>
          <div className="reviewLeague">
            <StadiumReview onClick={handleGotoReview}>
              <img src={stadium} alt="stadium" className="stadiumImg"></img>
              <div className="stadiumReview1">풋살장 리뷰</div>
              <div className="stadiumReview2">
                경기장을 직접 사용한 사람들의 리뷰
              </div>
              <div className="stadiumReview3">리뷰 바로가기</div>
            </StadiumReview>
            <Link to="/premierleague" style={{ textDecoration: 'none' }}>
              <PremierLeague>
                <img
                  src={premier}
                  alt="premier"
                  className="premierLeagueImg"
                ></img>
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
  @media screen and (max-width: 767px) {
    width: auto;
  }
`

const FutsalSliderSection = styled.section`
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 64vh;
  }
  .slider {
    color: #fafafa;
  }
`

const FutsalBackMapSection = styled.section`
  max-width: 1110px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 40px auto 60px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0px auto -35px 0px;
  }
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
  @media screen and (max-width: 767px) {
  }
  .back_to_main {
    font-size: 13px;
    color: #747474;
    position: absolute;
    bottom: 18px;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .backPage {
    top: 0px;
    width: 90%;
    height: 90%;
  }
  @media screen and (max-width: 767px) {
    margin-top: -8.3vh;
    width: 40px;
    height: 40px;
  }
`

const GotoMap = styled.div`
  width: 810px;
  display: flex;
  height: 150px;
  margin-left: 30px;
  padding: 0px 10px 0px 0px;
  position: relative;
  @media screen and (max-width: 767px) {
    width: auto;
    height: 130px;
    margin-top: -2.8vh;
    margin-left: 10px;
  }
  .mapImage {
    opacity: 0.9;
    filter: brightness(75%);
    border-radius: 5px;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 63%;
      object-fit: cover;
    }
  }
  .go_to_mapText {
    display: flex;
    font-size: 2em;
    color: #fafafa;
    position: absolute;
    right: -30px;
    bottom: 60px;
    @media screen and (max-width: 767px) {
      font-size: 0.9rem;
      color: #fafafa;
      position: absolute;
      right: 18%;
      top: 55px;
    }
  }
  .go_to_map {
    font-size: 1.3em;
    color: #fafafa;
    position: absolute;
    right: -30px;
    bottom: 15px;
    @media screen and (max-width: 767px) {
      color: red;
      display: none;
    }
  }
`

const FutsalMatchSoonSection = styled.section`
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  padding: 60px 0px 50px 0px;
  margin: auto;
  @media screen and (max-width: 767px) {
    width: auto;
    padding: 20px 0px 15px 0px;
  }
`

const MatchSoonTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .matchSoon_title {
    font-size: 3rem;
    @media screen and (max-width: 767px) {
      width: auto;
      justify-content: center;
      font-size: 2rem;
    }
  }
`

const MatchSoonFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }
  .setbold {
    font-weight: bolder;
  }
  .ordergroup {
    color: #353535;
    left: 0;
    position: flex;
    text-align: left;
    top: 100px;
    @media screen and (max-width: 767px) {
      margin-bottom: 15px;
    }
    .first {
      margin-right: 20px;
      :hover {
        cursor: pointer;
      }
    }
    .second {
      margin-left: 20px;
      :hover {
        cursor: pointer;
      }
    }
  }
`

const MatchSoonList = styled.div`
  display: grid;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  .all_MatchCard {
    display: grid;
    grid-template-columns: repeat(3, 360px);
    row-gap: 20px;
    column-gap: 24px;
    @media screen and (max-width: 767px) {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(1, 97%);
      row-gap: 0px;
      column-gap: 24px;
      margin-left: 17px;
    }
  }
  .notAll_MatchCard {
    display: grid;
    grid-template-columns: repeat(3, 360px);
    row-gap: 20px;
    column-gap: 24px;
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: repeat(1, 97%);
      row-gap: 0px;
      column-gap: 24px;
      margin-left: 17px;
    }
  }
  .moreView {
    display: grid;
    @media screen and (max-width: 767px) {
    }
  }
  .empty_MatchCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    .gotoWrite {
      font-size: 1.5rem;
      text-align: center;
      line-height: 30px;
    }
    .linkWrite {
      margin-top: 20px;
      font-size: 1.1rem;
      color: black;
      border: 1px solid gray;
      border-radius: 15px;
      padding: 7px 15px 5px 15px;
      :hover {
        color: #840909;
        border: 1px solid #840909;
      }
    }
  }
`

const FutsalAnotherSection = styled.section`
  max-width: 1110px;
  display: flex;
  justify-content: center;
  margin: 60px auto 60px auto;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const StadiumReview = styled.div`
  display: flex;
  position: relative;
  width: 740px;
  height: 290px;
  padding: 0px 0px 30px 0px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    align-items: center;
    position: absolute;
    width: 80%;
    height: 50px;
    left: 0px;
    margin-top: 0px;
  }
  .stadiumReview1 {
    position: absolute;
    font-size: 2.5em;
    color: #fafafa;
    top: 40px;
    left: 30px;
    @media screen and (max-width: 767px) {
      display: flex;
      font-size: 1.5rem;
      position: absolute;
      top: -10px;
      left: 35px;
    }
  }
  .stadiumReview2 {
    position: absolute;
    font-size: 1.5em;
    color: #fafafa;
    top: 90px;
    left: 30px;
    font-weight: lighter;
    @media screen and (max-width: 767px) {
      display: flex;
      font-size: 0.8rem;
      position: absolute;
      top: 20px;
      left: 35px;
    }
  }
  .stadiumReview3 {
    position: absolute;
    font-size: 1.3em;
    color: #fafafa;
    right: 70px;
    bottom: 20px;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .stadiumImg {
    width: 800px;
    height: 320px;
    border-radius: 5px;
    opacity: 0.9;
    filter: brightness(60%);
    @media screen and (max-width: 767px) {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 20px;
      width: 114%;
      height: 120px;
      object-fit: cover;
    }
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
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 21px;
    top: 70px;
    width: 81.5%;
    height: 8vh;
    object-fit: cover;
  }
  .premierLeagueImg {
    display: flex;
    position: absolute;
    width: 400px;
    height: 130px;
    top: 0px;
    @media screen and (max-width: 767px) {
      left: 10%;
      top: 1vh;
      width: 80%;
      height: auto;
    }
  }
  .premierLeagueText {
    position: absolute;
    font-size: 1.2em;
    color: #373737;
    right: 70px;
    bottom: 20px;
    @media screen and (max-width: 767px) {
      display: none;
    }
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
  @media screen and (max-width: 767px) {
    display: flex;
    position: relative;
    margin-top: 228px;
    margin-left: 3px;
    margin-bottom: 0px;
    width: 80%;
    height: 180px;
  }

  .notice {
    font-size: 1.2rem;
    font-weight: bold;
    @media screen and (max-width: 767px) {
      display: flex;
      justify-content: left;
      align-items: center;
    }
  }
  .notice_list {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

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
