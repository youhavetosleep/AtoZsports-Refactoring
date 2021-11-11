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
import instance from '../api'
import { useDispatch } from 'react-redux'
import { editPostData } from '../_actions/post_action'
import Navbar from './navbar'

const EditWrite = ({ isLogin, setIsLogin }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  let userPost = store.getState().post
  let userInfo = store.getState().user
  // console.log(userPost)

  const titleRef = useRef()
  const groundRef = useRef()
  const content = useRef()

  let Token = ''
  if (userInfo.loginSuccess) {
    Token = userInfo.loginSuccess.accessToken
  }

  const postData = userPost.postData.postsData
  const sliceStartTime = postData.startTime.slice(11, 16)
  const sliceEndTime = postData.endTime.slice(11, 16)
  // console.log(postData.startTime)

  const [startDate, setStartDate] = useState(postData.startTime.split('T')[0])
  const [postTitle, setPostTitle] = useState(postData.title) // title
  const [postDivision, setPostDivision] = useState(postData.division) // division
  const [postStartTime, setPostStartTime] = useState(sliceStartTime) // startTime
  const [postEndTime, setPostEndTime] = useState(sliceEndTime) // endTime
  const [postContent, setPostContent] = useState(postData.content) // content
  const [postPhoneOpen, setphoneOpen] = useState(false) // phoneOpen

  const [getPlace, setGetPlace] = useState(postData)
  const [getGroundData, setGetGroundData] = useState({})
  const [groundData, setGroundData] = useState({})

  const userId = postData.id
  const postStatus = postData.status

  // console.log(groundData)

  useEffect(() => {
    if (postData.userPhone === undefined) {
      setphoneOpen(false)
    } else {
      setphoneOpen(true)
    }
  }, [])

  const handledate = (date) => {
    let ChangeDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    setStartDate(ChangeDate)
  }

  // 게시글 제목 가져오기
  const handleInputTitle = (e) => {
    setPostTitle(e.target.value)
  }
  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setPostStartTime(e.value)
  }
  const handleEndHour = (e) => {
    setPostEndTime(e.value)
  }
  const handleClickMember = () => {
    setPostDivision('member')
  }
  const handleClickMatch = () => {
    setPostDivision('match')
  }
  const handlePhoneCheck = () => {
    postPhoneOpen ? setphoneOpen(false) : setphoneOpen(true)
  }
  const handleInputText = (e) => {
    setPostContent(e.target.value)
  }

  const getData = (getPlace) => {
    setGetPlace(getPlace)
  }
  // console.log('getPlace ====> ', getPlace)
  //   console.log('placeName ====>=========== ', getPlace.place_name)
  //   console.log('addressName ====> ', getPlace.address_name)
  //   console.log('phone ====> ', getPlace.phone)
  //   console.log('longitude ====> ', getPlace.x)
  //   console.log('latitude ====> ', getPlace.y)
  //   console.log('placeUrl ====> ', getPlace.place_url)
  //   console.log(postStartTime, postEndTime)

  // console.log(postData.placeName)

  useEffect(() => {
    instance
      .post(
        `/futsal/ground/check`,
        {
          placeName: postData.placeName
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      .then((res) => {
        setGroundData({
          placeName: res.data.data.placeName,
          addressName: res.data.data.addressName,
          phone: res.data.data.phone,
          longitude: res.data.data.longitude,
          latitude: res.data.data.latitude,
          placeUrl: res.data.data.placeUrl
        })
      })
  }, [])

  // console.log(groundData)

  useEffect(() => {
    setGroundData({
      placeName: getPlace.placeName,
      addressName: getPlace.addressName,
      phone: getPlace.phone,
      longitude: getPlace.longitude,
      latitude: getPlace.latitude,
      placeUrl: getPlace.placeUrl
    })
  }, [getPlace])

  // console.log(`${startDate} ${postStartTime}`)

  // console.log('======================')
  // console.log('타이틀 ====>', postTitle)
  // console.log('모집유형 ====>', postDivision)
  // console.log('날짜 ====>', startDate)
  // console.log('시작시간 ====>', postStartTime)
  // console.log('종료시간 ====>', postEndTime)
  // console.log('요청사항 ====>', postContent)
  // console.log('경기장 정보 ====>', groundData)
  // console.log('폰사용 ====>', postPhoneOpen)

  // 등록하기 버튼 클릭시 발생하는 이벤트
  const handelSendPost = () => {
    dispatch(
      editPostData(
        postTitle,
        postDivision,
        startDate,
        postStartTime,
        postEndTime,
        postStatus,
        postContent,
        groundData,
        postPhoneOpen,
        userId,
        Token
      )
    ).then((res) => {
      history.push(`/post/id=${userId}`)
    })
  }

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <GlobalStyle />
      <WriteContainer>
        <WriteIn>
          <div className="write_title">게시글 수정</div>
          
          <WriteMap>
            <WriteContentsMap
              getPlace={getPlace}
              getData={getData}
              setGetGroundData={setGetGroundData}
              getGroundData={getGroundData}
            />
          </WriteMap>
          <WriteTitle>
          <div className="write_mainPostTitle">글 제목</div>
            <input
              type="text"
              value={postTitle}
              className="write_postTitle"
              onChange={(e) => {
                handleInputTitle(e)
              }}
              ref={titleRef}
            />
          </WriteTitle>
          <WritePlace>
            <div className="write_palce">선택한 경기장</div>
            <input
              type="text"
              value={groundData.placeName}
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
                handledate={handledate}
                startDate={startDate}
              />
              <DownWrap>
                <FaChevronDown />
              </DownWrap>
              <TimeWrap>
                <SelectBoxWrite
                  handleStartHour={handleStartHour}
                  handleEndHour={handleEndHour}
                  startTime={sliceStartTime}
                  endTime={sliceEndTime}
                />
              </TimeWrap>
            </CalendarWrap>
          </WriteDate>
          <WritePhoneCheck>
            <div className="write_phonecheck">전화번호 표시</div>
            <input
              type="checkbox"
              className="write_checkBox"
              checked={postPhoneOpen ? 'checked' : ''}
              onClick={handlePhoneCheck}
            />
          </WritePhoneCheck>
          <WriteEtc>
            <div className="write_etc">요청사항</div>
            <textarea
              className="write_textArea"
              value={postContent}
              onChange={(e) => handleInputText(e)}
              ref={content}
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
  background-color: #fafafa;
  @media screen and (max-width: 767px) {
      width: auto;
    }
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
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      margin: 30px auto 20px auto;
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
      @media screen and (max-width: 767px) {
      justify-content: center;
      margin: 140px auto 50px auto;
    }
    }
  }
`

const WriteTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto 30px auto;
  @media screen and (max-width: 767px) {
    width: 96%;
    margin: 80px auto 30px auto;
    }
    .write_mainPostTitle {
    max-width: 800px;
    width: 53vw;
    font-size: 1.3rem;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      width: 13vw;
      justify-content: center;
      margin: 0px auto 0px auto;
      color: #747474;
      font-weight: bold;
    }
  }
  .write_postTitle {
    max-width: 800px;
    width: 780px;
    height: 50px;
    font-size: 1.6rem;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fafafa;
    border-bottom: 1px solid #747474;
    :focus {
      outline: none;
    }
    @media screen and (max-width: 767px) {
      width: calc(100% - 90px);
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
    width: auto;
  }
`

const WritePlace = styled.div`
  display: flex;
  max-width: 800px;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto 20px auto;
  @media screen and (max-width: 767px) {
    justify-content: center;
      width: 100%;
      margin: 10px auto 0px auto;
    }
  .write_palce {
    display: flex;
    font-size: 1.3rem;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      justify-content: left;
      margin: 0px auto 20px auto;
      color: #747474;
      font-weight: bold;
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
    :focus {
      outline: none;
    }
    @media screen and (max-width: 767px) {
      width: calc(100% - 100px);
      height: 30px;
      font-size: 1rem;
    margin: -10px auto 0px auto;
    padding: 0px 0px 0px 0px;
    }
  }
`

const WriteRequest = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  /* align-items: center; */
  margin: 30px auto 20px auto;
  @media screen and (max-width: 767px) {
    width: 100%;
      font-size: 1rem;
      margin: 30px auto 20px auto;
      justify-content: center;
      
    }
  .write_kindRequest {
    display: flex;
    font-size: 1.3rem;
    margin: 0px 0px 0px 0px;
    @media screen and (max-width: 767px) {

font-size: 1rem;
margin: 0px auto 10px auto;
color: #747474;
font-weight: bold;
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
      width: 50%;
      height: 20px;   
      padding: 8px 44px 1px 55px;
      margin: 10px 0px 0px 50px;
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
      width: 50%;
      height: 20px;   
      padding: 8px 44px 1px 55px;
      margin: 10px 0px 0px 50px;
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
      width: 50%;
      height: 20px;   
      padding: 8px 45px 1px 50px;
      margin: 10px 50px 0px 10px;
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
      width: 50%;
      height: 20px;   
      padding: 8px 45px 1px 50px;
      margin: 10px 50px 0px 10px;
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
  @media screen and (max-width: 767px) {
      width: 100%;
      margin: 15px auto 20px auto;
      color: #747474;
    }
  .write_data {
    font-size: 1.3rem;
    margin-left: 10px;
    @media screen and (max-width: 767px) {
      font-size: 1rem;
      margin-top: -10px;
    margin: 0px auto 0px auto;
    font-weight: bold;
    }
  }
`

const TimeWrap = styled.div`
@media screen and (max-width: 767px) {
    width: 100%;
    margin: 15px 0px 0px 0px;
    }
`

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px 0px 0px;
  position: relative;
  @media screen and (max-width: 767px) {
    display: flex;
    width: 100%;
  flex-direction: column;
  margin: 10px auto 0px auto;
  padding: 0px 0px 0px 50px;
  /* position: relative; */
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
    top: 9%;
    right: 25%;
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
    width: 100%;
    margin: 30px auto -110px auto;
    }
  .write_etc {
    font-size: 1.3rem;
    margin-right: 710px;
    @media screen and (max-width: 767px) {
      font-size: 1.1rem;
      margin-right: 0%;
      color: #747474;
      font-weight: bold;
    }
  }
  .write_textArea {
    margin-top: 20px;
    width: 780px;
    height: 200px;
    resize: none;
    font-size: 1.1rem;
    @media screen and (max-width: 767px) {
      width: 75%;
    height: 200px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 0px;
    }
  }
`

export default EditWrite
