/*global kakao */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import review from '../image/review.jpeg'
import Comment from '../components/comment/comment'
import { getGroundData, selectGroundData } from '../_actions/ground_action'
import ReviewInfo from '../components/reviewInfo'
import RegionBox from '../utils/regionBox'

const Review = ({ userInfo, region1, region2, handleRegion1, handleRegion2 }) => {
  const dispatch = useDispatch()
  const token = userInfo.loginSuccess.accessToken
  const [groundData, setGroundData] = useState([])
  const [markerData, setMarkerData] = useState([])
  const [selected, setSelected] = useState('normal')
  const [groundSelect, setGroundSelect] = useState(1)

  const changeComment = () => {
    setSelected('choose')
  }
  
  const Ground = () => {
    dispatch(getGroundData(region1, region2)).then((res) => {
      setMarkerData(res.payload)
      setSelected('normal')
    })
  }

  const mapscript = () => {
    let container = document.getElementById('map')
    let options = {
      center: new kakao.maps.LatLng(37.2520770795764, 127.214827986162),
      level: 10
    }

    let map = new kakao.maps.Map(container, options)
    
    //줌 컨트롤러
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    let normalImageSrc =
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png'
      markerData.map((el) => {
      
      // 지도 위치변경을 위해 만들어둔 options 현재는 아무 작동하지않음
      options = {
        center: new kakao.maps.LatLng(markerData[3].longitude, markerData[3].latitude),
        level: 10
      }

      let imageSize = new kakao.maps.Size(35, 35)
      let markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize)

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(el.longitude, el.latitude),
        image: markerImage
      })
      let iwContent =
        `<div style="text-align:center;padding:6px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
        `<div style="font-weight: 600; margin-bottom: 3px;">${el.placeName}</div>` +
        `</div>`

      let infowindow = new kakao.maps.InfoWindow({ content: iwContent })
      kakao.maps.event.addListener(markers, 'mouseover', function () {
        infowindow.open(map, markers)
      })
      kakao.maps.event.addListener(markers, 'mouseout', function () {
        infowindow.close(map, markers)
      })
      kakao.maps.event.addListener(markers, 'click', function () {
        dispatch(selectGroundData(el.id, token)).then(res =>{
          setGroundData(res.payload)
          markerDetail(res.payload.id)
        })
      })
    })
  }

  const markerDetail = (id) => {
    setSelected('normal')
    setGroundSelect(id)
    changeComment()
  }

  useEffect(() => {
    Ground()
  }, [region2])

  useEffect(() => {
    mapscript()
  }, [markerData, groundData])

  return (
    <>
      <TitleWrapper>
        <TitleImg src={review} />
        <TitleText>
          Review<p>경기장은 어땠나요?</p>
        </TitleText>
      </TitleWrapper>
      <FormContainer>
        <RegionWrapper>
      <RegionBox
        region1={region1}
        handleRegion1={handleRegion1}
        handleRegion2={handleRegion2}
      />
      </RegionWrapper>
        <FormWrapper>
          <MapWrap id="map"></MapWrap>
          <ContentWrap>
            {selected === 'choose' ? (
              <ReviewInfo groundData={groundData} />
            ) : null}
            {selected === 'choose' ? (
              <Comment groundData={groundData} groundSelect={groundSelect} />
            ) : null}
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

const RegionWrapper = styled.div`
position: absolute;
  top: 3.5%;
  left: 22.4%;

`

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 3px #bebebe;
  height: 1300px;
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

export default Review
