/*global kakao*/
import React, { useState, useEffect, useRef } from 'react'
import GlobalStyle from '../globalStyle/globalStyle'
import Footer from '../components/footer'
import styled from 'styled-components'
import WriteContentsMap from '../components/map/writeContentsMap'
import Calendar from '../utils/calendar'
import { useDispatch } from 'react-redux'
import { FaChevronDown } from 'react-icons/fa'
import SelectBox from '../utils/selectBox'
import CalendarWrite from '../utils/calenderWrite'
import SelectBoxWrite from '../utils/selectBoxWrite'


const Write = () => {
  const mapRef = useRef()
  const dispatch = useDispatch()
  
  const changeDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const newdate = new Date()
  const today = changeDate(newdate)


  const [startDate, setStartDate] = useState(today)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handledate = (date) => {
    let ChangeDate = changeDate(date)
    setStartDate(ChangeDate)
  }

  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setStartTime(e.target.value)
  }
  const handleEndHour = (e) => {
    setEndTime(e.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <WriteContainer>
        <WriteIn>
          <div className='write_title'>게시글 작성</div>
          <WriteMap>
            <WriteContentsMap />
          </WriteMap>
          <WritePlace>
            <div className='write_palce'>선택한 경기장</div>
            <input 
            type='text' 
            className='write_choiceGround' 
            />
          </WritePlace>
          <WriteRequest>
            <div className='write_kindRequest'>요청 종류</div>
            <RequestBtn>
               <div className='write_btn1'>용병모집</div>
               <div className='write_btn2'>경기제안</div>
            </RequestBtn>
          </WriteRequest>
          <WriteDate>
            <div className='write_data'>경기 일정</div>
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
              <SelectBoxWrite />
            </TimeWrap>
            </CalendarWrap>
          </WriteDate>
          <WritePhoneCheck>
            <div className='write_phonecheck'>전화번호 표시</div>
            <input
            type='checkbox' 
            className='write_checkBox'
            />
          </WritePhoneCheck>
          <WriteEtc>
            <div className='write_etc'>요청사항</div>
            <textarea
            className='write_textArea'
            ></textarea>
          </WriteEtc>
          <div className='write_send'>
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
  }
`

const WriteMap = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  border-top: 1px solid gray;
  margin: 0px auto 0px auto;
  z-index: 1;
  /* height: 100px; */
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
 }
 .write_choiceGround {
   width: 780px;
   height: 30px;
   margin: 20px 0px 0px 0px;
   border-top: none;
   border-left: none;
   border-right: none;
   border-bottom: 1px solid black;
   background-color: #fafafa;
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
}
`

const TimeWrap = styled.div`

`

const CalendarWrap = styled.div`
display: flex;
flex-direction: row;
margin: 20px 0px 0px 0px;
position: relative;
`

const DownWrap = styled.div`
  /* width: 10px; */
  position: absolute;
  top: 15%;
  right: 17%;
  color: #000000;
  z-index: -1;
`

const WritePhoneCheck = styled.div`
  display: flex;
flex-direction: row;
 max-width: 800px;
 justify-content: left;
 align-items: center;
 margin: 20px auto 20px auto;
 .write_phonecheck {
   font-size: 1.3rem;
   margin-right: 20px;
   margin-top: 3px;
 }
 .write_checkBox {
  transform : scale(1.5);
  /* color: #840909; */
  margin-right: 630px;
 }
`

const WriteEtc = styled.div`
display: flex;
flex-direction: column;
 max-width: 800px;
 justify-content: left;
 align-items: center;
 margin: 20px auto 20px auto;
 .write_etc {
   font-size: 1.3rem;
   margin-right: 710px;
 }
.write_textArea {
  margin-top: 20px;
  width: 780px;
  height: 200px;
  resize:none;
  font-size: 1.1rem;
}
`

export default Write
