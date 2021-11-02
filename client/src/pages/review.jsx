/*global kakao */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import review from '../image/review.jpeg'
import instance from '../api/index'
import ScoreBox from '../utils/scoreBox'
import Comment from '../components/comment/comment'
import { getGroundData } from '../_actions/ground_action'

const Review = () => {
  const dispatch = useDispatch()
  const [groundData, setGroundData] = useState('')
  const [markerData, setMarkerData] = useState([])

  const Ground = () => {
    dispatch(getGroundData()).then(res => {
      setMarkerData(res.payload)
    })
  }

  const mapscript = () => {
    let container = document.getElementById('map')
    let options = {
      center: new kakao.maps.LatLng(37.2520770795764, 127.214827986162),
      level: 10
    }
    let selectedMarker = null;
    //map
    const map = new kakao.maps.Map(container, options)

    markerData.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.longitude, el.latitude),
        //마커에 hover시 나타날 title
        title: el.placeName,
      })
    })

  //   let marker = new kakao.maps.Marker({
  //     map: map,
  //     position: kakao.maps.LatLng(37.2520770795764, 127.214827986162)
  // });

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      selectedMarker = 'a'
      // 클릭한 위도, 경도 정보를 가져옵니다 
      let latlng = mouseEvent.latLng;
      
      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      
      let resultDiv = document.getElementById('result'); 
      resultDiv.innerHTML = message;
    })
  }

  useEffect(() => {
    Ground()
    mapscript()
  }, [])

  return (
    <>
      <TitleWrapper>
        <TitleImg src={review} />
        <TitleText>
          Review<p>경기장은 어땠나요?</p>
        </TitleText>
      </TitleWrapper>
      {/* <div id="map" style={{ width: "100px", height: "100px" }}></div> */}
      <FormContainer>
        <FormWrapper>
          <MapWrap id="map"></MapWrap>
          <ContentWrap>
            <InfoWrap>
            <p id="result"></p>
              <Title>{groundData.placeName}</Title>
              <ScoreBox />
              <TitleScore>{groundData.score}</TitleScore>
              <Info className="address">{groundData.addressName}</Info>
              <Info className="phone">{groundData.phone}</Info>
            </InfoWrap>
            <Comment />
          </ContentWrap>
        </FormWrapper>
      </FormContainer>
    </>
  )
}

const TitleWrapper = styled.div`
  height: 300px;
  position: relative;
  background-color: #535353;
`

const TitleImg = styled.img`
  opacity: 50%;
  width: 100%;
  height: 100%;
`

const TitleText = styled.h1`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
  p {
    font-size: 20px;
    font-weight: 20;
    margin-left: 5px;
    margin-top: 5px;
  }
`

const FormContainer = styled.div`
  background-color: #ffffff;
  height: 1500px;
  position: relative;
`

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 3px #bebebe;
  height: 1200px;
  width: 1050px;
  border-radius: 5px;
`
const MapWrap = styled.div`
  width: 1050px;
  height: 400px;
`
const ContentWrap = styled.div`
  padding: 50px 100px;
  box-sizing: border-box;
`
const InfoWrap = styled.div`
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  padding-bottom: 50px;
  border-bottom: 1px solid black;
  .address {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .phone {
    font-size: 17px;
  }
`
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`
const TitleScore = styled.div`
  margin-bottom: 40px;
`
const Info = styled.p``

export default Review
