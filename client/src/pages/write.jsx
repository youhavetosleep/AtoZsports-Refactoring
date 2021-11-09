/*global kakao*/
import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/fa'
import GlobalStyle from '../globalStyle/globalStyle'
import Footer from '../components/footer'
import WriteContentsMap from '../components/map/writeContentsMap'
import CalendarWrite from '../utils/calenderWrite'
import SelectBoxWrite from '../utils/selectBoxWrite'
import store from '../store/store'
import { useDispatch } from 'react-redux'
import { writePostData } from '../_actions/post_action'
import Navbar from '../components/navbar'

const Write = ({ isLogin, setIsLogin }) => {
  const history = useHistory()
  const mapRef = useRef()
  const dispatch = useDispatch()
  let userInfo = store.getState().user

  // map page에서 경기잡기 버튼 누를 때 리덕스에 상태가 저장되고
  // 저장된 경기장의 이름을 가져오기 위한 getState
  let mapData = store.getState().ground

  const Token = userInfo.loginSuccess.accessToken

  const handledate = (date) => {
    let ChangeDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    setStartDate(ChangeDate)
  }

  const [startDate, setStartDate] = useState(new Date())

  const [postTitle, setPostTitle] = useState('') // title
  const [postDivision, setPostDivision] = useState('') // division
  const [postStartTime, setPostStartTime] = useState('') // startTime
  const [postEndTime, setPostEndTime] = useState('') // endTime
  const sports = 'futsal' // sports
  const [postContent, setPostContent] = useState('') // content
  const [postGround, setPostGround] = useState('') // ground
  const [postPhoneOpen, setphoneOpen] = useState(false) // phoneOpen
  const [postAdressName, setAdressName] = useState('') // adressName
  const userId = userInfo.loginSuccess.userData.id

  const [getPlace, setGetPlace] = useState('')
  const [getGroundData, setGetGroundData] = useState([])
  const [groundData, setGroundData] = useState({})

  // const a = [...getGroundData, getGroundData]
  // console.log(startDate)

  // 게시글 제목 가져오기
  const handleInputTitle = (e) => {
    setPostTitle(e.target.value)
  }
  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setPostStartTime(e.target.value)
  }
  const handleEndHour = (e) => {
    setPostEndTime(e.target.value)
  }
  const handleClickMember = () => {
    setPostDivision('member')
  }
  const handleClickMatch = () => {
    setPostDivision('match')
  }
  const handlePhoneCheck = (e) => {
    postPhoneOpen ? setphoneOpen(false) : setphoneOpen(true)
  }
  const handleInputText = (e) => {
    setPostContent(e.target.value)
  }

  const getData = (getPlace) => {
    setGetPlace(getPlace)
  }
  // console.log('getPlace ====> ', getPlace)
  // console.log('placeName ====> ', getPlace.place_name)
  // console.log('addressName ====> ', getPlace.address_name)
  // console.log('phone ====> ', getPlace.phone)
  // console.log('longitude ====> ', getPlace.x)
  // console.log('latitude ====> ', getPlace.y)
  // console.log('placeUrl ====> ', getPlace.place_url)
  // console.log(postStartTime, postEndTime)

  useEffect(() => {
    setGroundData({
      placeName: getPlace.place_name,
      addressName: getPlace.address_name,
      phone: getPlace.phone,
      longitude: getPlace.x,
      latitude: getPlace.y,
      placeUrl: getPlace.place_url
    })
  }, [getPlace])

  // console.log(`${startDate} ${postStartTime}`)

  // 등록하기 버튼 클릭시 발생하는 이벤트
  const handelSendPost = () => {
    dispatch(
      writePostData(
        postTitle,
        postDivision,
        startDate,
        postStartTime,
        postEndTime,
        sports,
        postContent,
        groundData,
        postPhoneOpen,
        Token
      )
    ).then((res) => {
      // console.log(res.payload)
      history.push(`/post/id=${res.payload.id}`)
    })
  }

  return (
    <>
    <Navbar 
    isLogin={isLogin}
    setIsLogin={setIsLogin}
    />
      <GlobalStyle />
      <WriteContainer>
        <WriteIn>
          <div className="write_title">게시글 작성</div>
          <WriteTitle>
            <input
              type="text"
              placeholder="게시글 제목을 입력해 주세요"
              className="write_postTitle"
              onChange={(e) => {
                handleInputTitle(e)
              }}
            />
          </WriteTitle>
          <WriteMap>
            <WriteContentsMap
              getPlace={getPlace}
              getData={getData}
              setGetGroundData={setGetGroundData}
              getGroundData={getGroundData}
            />
          </WriteMap>
          <WritePlace>
            <div className="write_palce">선택한 경기장</div>
            <input
              type="text"
              // map 페이지에서 넘어올 때 map에서 선택한 경기장의 이름
              // value={mapData.mapData.place_name}
              value={getPlace.place_name}
              ref={mapRef}
              className="write_choiceGround"
            />
          </WritePlace>
          <WriteRequest>
            <div className="write_kindRequest">요청 종류</div>
            <RequestBtn>
              <div
                className={
                  postDivision === 'member' ? 'write_btn1Click' : 'write_btn1'
                }
                onClick={handleClickMember}
              >
                용병모집
              </div>
              <div
                className={
                  postDivision === 'match' ? 'write_btn2Click' : 'write_btn2'
                }
                onClick={handleClickMatch}
              >
                경기제안
              </div>
            </RequestBtn>
          </WriteRequest>
          <WriteDate>
            <div className="write_data">경기 일정</div>
            <CalendarWrap>
              <CalendarWrite
                className="Calender"
                setStartDate={handledate}
                startDate={startDate}
              />
              <DownWrap>
                <FaChevronDown />
              </DownWrap>
              <TimeWrap>
                <SelectBoxWrite
                  handleStartHour={handleStartHour}
                  handleEndHour={handleEndHour}
                />
              </TimeWrap>
            </CalendarWrap>
          </WriteDate>
          <WritePhoneCheck>
            <div className="write_phonecheck">전화번호 표시</div>
            <input
              type="checkbox"
              className="write_checkBox"
              onChange={(e) => handlePhoneCheck(e)}
            />
          </WritePhoneCheck>
          <WriteEtc>
            <div className="write_etc">요청사항</div>
            <textarea
              className="write_textArea"
              onChange={(e) => handleInputText(e)}
            ></textarea>
          </WriteEtc>
          <div className="write_send" onClick={handelSendPost}>
            등록하기
          </div>
        </WriteIn>
      </WriteContainer>
      <Footer />
    </>
  )
}

const WriteContainer = styled.div`
  display: flex;
  width: 100%;
`

const WriteIn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .write_title {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 80px 0px 20px 0px;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      margin: 30px 0px 20px 0px;
    }
  }
  .write_send {
    display: flex;
    justify-content: center;
    margin: 30px 0px 50px 700px;
    font-size: 1.6rem;
    :hover {
      color: #890909;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      max-width: 375px;
      margin: 140px 0px 50px 0px;
    }
  }
`

const WriteTitle = styled.div`
  display: flex;
  justify-content: center;
  .write_postTitle {
    max-width: 800px;
    width: 780px;
    height: 50px;
    font-size: 1.6rem;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fafafa;
    :focus {
      outline: none;
    }
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 300px;
      height: 30px;
      font-size: 1rem;
    }
  }
`

const WriteMap = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  margin: 0px auto 0px auto;
  z-index: 1;
  /* height: 100px; */
  @media screen and (max-width: 767px) {
    /* width: 1vw; */
  }
`

const WritePlace = styled.div`
  display: flex;
  max-width: 800px;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto 20px auto;
  .write_palce {
    display: flex;
    font-size: 1.3rem;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      margin: 170px 0px 20px 0px;
    }
  }
  .write_choiceGround {
    width: 780px;
    height: 30px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
    font-size: 1.5rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      width: 290px;
    height: 30px;
    margin: -10px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    font-size: 1.2rem;
    }
  }
`

const WriteRequest = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  /* align-items: center; */
  margin: 30px auto 20px auto;
  .write_kindRequest {
    display: flex;
    font-size: 1.3rem;
    margin: 0px 0px 0px 0px;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      margin: -20px 0px 0px 5px;
    }
  }
  .write_btn1 {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 0px;
    padding: 15px 153px 10px 153px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
    :hover {
      background-color: #840909;
      color: #fafafa;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 50px;
      height: 20px;   
      padding: 8px 44px 1px 44px;
      margin: 10px 0px 0px 5px;
      font-size: .9rem;
    }
  }
  .write_btn1Click {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 0px;
    padding: 15px 154px 10px 154px;
    background-color: #840909;
    border-radius: 10px;
    font-size: 1.3rem;
    color: #fafafa;
    @media screen and (max-width: 767px) {
      width: 50px;
      height: 20px;   
      padding: 8px 44px 1px 44px;
      margin: 10px 0px 0px 5px;
      font-size: .9rem;
    }
  }
  .write_btn2 {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 20px;
    padding: 15px 153px 10px 153px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 1.3rem;
    :hover {
      background-color: #840909;
      color: #fafafa;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 50px;
      height: 20px;   
      padding: 8px 44px 1px 44px;
      margin: 10px 0px 0px 10px;
      font-size: .9rem;
    }
  }
  .write_btn2Click {
    display: flex;
    justify-content: left;
    margin: 20px 0px 0px 20px;
    padding: 15px 154px 10px 154px;
    background-color: #840909;
    border-radius: 10px;
    font-size: 1.3rem;
    color: #fafafa;
    @media screen and (max-width: 767px) {
      width: 50px;
      height: 20px;   
      padding: 8px 44px 1px 44px;
      margin: 10px 0px 0px 10px;
      font-size: .9rem;
    }
  }
  
`
const RequestBtn = styled.div`
  display: flex;
  flex-direction: row;
`

const WriteDate = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: center;
  margin: 20px auto 20px auto;
  .write_data {
    font-size: 1.3rem;
    margin-left: 10px;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      margin-top: -10px;
    margin-left: 30px;
    }
  }
`

const TimeWrap = styled.div`
@media screen and (max-width: 767px) {
    width: 310px;
    margin: 15px 0px 0px 31px;
    }
`

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px 0px 0px;
  position: relative;
  @media screen and (max-width: 767px) {
    display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
  position: relative;
    }
`

const DownWrap = styled.div`
  /* width: 10px; */
  position: absolute;
  top: 15%;
  right: 17%;
  color: #000000;
  z-index: -1;
  @media screen and (max-width: 767px) {
    right: 19%;
    }
`

const WritePhoneCheck = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  justify-content: left;
  align-items: center;
  margin: 20px auto 20px auto;
  @media screen and (max-width: 767px) {
    margin: 10px 0px 0px 50px;
    }
  .write_phonecheck {
    font-size: 1.3rem;
    margin-right: 20px;
    margin-top: 3px;
    @media screen and (max-width: 767px) {
    font-size: 1rem;
    }
  }
  .write_checkBox {
    transform: scale(1.5);
    /* color: #840909; */
    margin-right: 630px;
    @media screen and (max-width: 767px) {
      margin-right: 130px;
    }
  }
`

const WriteEtc = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: left;
  align-items: center;
  margin: 20px auto 20px auto;
  @media screen and (max-width: 767px) {
    margin: 30px auto -110px auto;
    }
  .write_etc {
    font-size: 1.3rem;
    margin-right: 710px;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      margin-right: 220px;
    }
  }
  .write_textArea {
    margin-top: 20px;
    width: 780px;
    height: 200px;
    resize: none;
    font-size: 1.1rem;
    @media screen and (max-width: 767px) {
      width: 275px;
    height: 200px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 0px;
    }
  }
`

export default Write
