/*global kakao*/
import React, { useEffect, useRef } from 'react'
import GlobalStyle from '../globalStyle/globalStyle'
import Footer from '../components/footer'
import styled from 'styled-components'
import WriteContentsMap from '../components/map/writeContentsMap'

const Write = () => {
  const mapRef = useRef()

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
            className='write_choicGround' 
            />
          </WritePlace>
          <WriteRequest>
            <div className='write_kindRequest'>요청 종류</div>
            <RequestBtn>
               <div className='write_btn'>용병모집</div>
               <div className='write_btn'>경기제안</div>
            </RequestBtn>
          </WriteRequest>
          <WriteDate>

          </WriteDate>
          <WritePhoneCheck>

          </WritePhoneCheck>
          <WriteEtc>

          </WriteEtc>
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
 margin: 550px auto 20px auto;
 .write_palce {
  display: flex;
  font-size: 1.3rem;
 }
 .write_choicGround {
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
  flex-direction: column;
  align-items: center;
  .write_kindRequest {
    
  }

`
const RequestBtn = styled.div`
  display: flex;
  flex-direction: row;
`

const WriteDate = styled.div`

`

const WritePhoneCheck = styled.div`

`

const WriteEtc = styled.div`

`

export default Write
