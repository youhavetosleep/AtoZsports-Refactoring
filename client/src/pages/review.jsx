/*global kakao */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import review from '../image/review.jpeg'
import {
  getGroundData,
  selectGroundData,
  mapData,
  accordGroundData
} from '../_actions/ground_action'
import Comment from '../components/comment/comment'
import ReviewInfo from '../components/reviewInfo'
import RegionBox from '../utils/regionBox'
import store from '../store/store'

const Review = ({
  userInfo,
  setRegion1,
  setRegion2,
  region1,
  region2,
  handleRegion1,
  handleRegion2
}) => {
  const dispatch = useDispatch()
  // const token = userInfo.loginSuccess.accessToken
  const [groundData, setGroundData] = useState([])
  const [markerData, setMarkerData] = useState([])
  const [selected, setSelected] = useState('normal')
  const [groundSelect, setGroundSelect] = useState(1)

  // region box 클릭시에 해당 주소의 첫번째 경기장의 위치를 중심으로 검색
  const [location1, setLocation1] = useState(37.2520770795763)
  const [location2, setLocation2] = useState(127.214827986162)

  const [center, setCenter] = useState({
    center: new kakao.maps.LatLng(location1, location2),
    level: 10
  })

  const changeComment = () => {
    setSelected('choose')
  }

  const Ground = () => {
    dispatch(getGroundData(region1, region2))
      .then((res) => {
        setMarkerData(res.payload)
        // 페이지에 입장했을 때 사용자가 선호하는 지역의 첫 번째로 등록된 풋살장을 보여주기 위한 상태 업데이트
        setCenter({
          center: new kakao.maps.LatLng(
            res.payload[0].longitude,
            res.payload[0].latitude
          ),
          level: 10
        })
        if (res.payload[0].longitude === 37.2520770795763) {
          Swal.fire({
            text: '해당 지역의 경기장 리뷰가 없습니다!',
            icon: 'warning',
            confirmButtonColor: '#d2d2d2',
            confirmButtonText: '확인'
          })
        }
        setSelected('normal')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const mapscript = () => {
    let container = document.getElementById('map')

    let map = new kakao.maps.Map(container, center)

    //줌 컨트롤러
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    let normalImageSrc =
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png'
    markerData.map((el) => {
      let imageSize = new kakao.maps.Size(35, 35)
      // let imageSize = new kakao.maps.Size(64, 69)
      // let imageOption = {offset: new kakao.maps.Point(27, 69)}
      let markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize)

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(el.longitude, el.latitude),
        image: markerImage
      })
      let iwContent =
        `<div class='info-title' style="     display: block;
        background: #952e16;
        color: #fff;
        text-align: center;
        height: 24px;
        line-height:22px;
        border-radius:4px;
        padding:0px 10px;padding:6px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
        `${el.placeName}` +
        `</div>`

      let infowindow = new kakao.maps.InfoWindow({ content: iwContent })
      kakao.maps.event.addListener(markers, 'mouseover', function () {
        infowindow.open(map, markers)
      })
      kakao.maps.event.addListener(markers, 'mouseout', function () {
        infowindow.close(map, markers)
      })
      kakao.maps.event.addListener(markers, 'click', function () {
        dispatch(selectGroundData(el.id)).then((res) => {
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
    // 지도를 그려주기 위한 useEffect
    // 아래 조건문을 통해 map 페이지에서 리뷰 보기를 눌러 들어왔는지를 판단
    // 리뷰 보기를 눌러 들어왔다면 해당 경기장의 지역을 Region박스에 담아 준다.
    //
    if (store.getState().ground.mapData !== undefined) {
      const data = store.getState().ground.mapData
      data.address_name && setRegion1(data.address_name.split(' ')[0])
      data.address_name && setRegion2(data.address_name.split(' ')[1])
      data.y && setLocation1(data.y)
      data.x && setLocation2(data.x)
    }
    // if (userInfo.loginSuccess !== undefined) {
    //   if(userInfo.loginSuccess.userData.homeground.split(' ')[0] === region1) {
    //     setRegion1(userInfo.loginSuccess.userData.homeground.split(' ')[0])
    //   }
    //   if(userInfo.loginSuccess.userData.homeground.split(' ')[1] === region2) {
    //     setRegion1(userInfo.loginSuccess.userData.homeground.split(' ')[0])
    //   }
    // }
    // setRegion1('')
    // setRegion2('')
    Ground()
  }, [region2])

  // 지도가 그려지면 해당 지역에 등록된 경기장을 보여주기 위한 useEffect
  //  map페이지에서 리뷰보기 클릭시 넘어올 때는 store.getState().ground.accordData가 있는지 없는지로 확인
  useEffect(() => {
    if (store.getState().ground.mapData !== undefined) {
      const data = store.getState().ground.mapData
      if (data.address_name !== undefined) {
        if (store.getState().ground.accordData !== undefined) {
          dispatch(
            selectGroundData(store.getState().ground.accordData.data)
          ).then((res) => {
            setGroundData(res.payload)
            markerDetail(res.payload.id)
            dispatch(mapData({}))
          })
        }
      }
    }
    mapscript()
  }, [markerData, groundData, center])

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
            ) : (
              <InitText>경기를 원하는 지역을 검색하고</InitText>
            )}
            {selected === 'choose' ? (
              <Comment groundData={groundData} groundSelect={groundSelect} />
            ) : (
              <InitText>핀을 눌러 리뷰를 확인하세요!</InitText>
            )}
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

const InitText = styled.h1`
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
`

export default Review
