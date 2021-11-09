/*global kakao*/
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { accordGroundData } from '../_actions/ground_action'
import instance from '../api'

const Map = ({ getData, searchPlace, changeClick, click }) => {
  const mapRef = useRef()
  const MenuRef = useRef()
  const dispatch = useDispatch()

  const [addressName, setAddressName] = useState('')

  const [list, setList] = useState([])

  useEffect(() => {
    let markers = [], // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      }

    // 지도를 생성합니다
    let map = new kakao.maps.Map(mapRef.current, mapOption)
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places()

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    // mapsearch 컴포넌트에서 검색어를 입력해서 searchPlace에 담아 준것
    ps.keywordSearch(searchPlace, placesSearchCB)

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data)

        // 페이지 번호를 표출합니다
        displayPagination(pagination)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.')
        return
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.')
        return
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      let listEl = document.getElementById('placesList'),
        menuEl = MenuRef.current,
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = ''

      // 검색리스트 상태에 담기!
      setList(places)

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl)

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker()

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다

        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition)

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        ;(function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title)
          })

          // 클릭시 리뷰페이지로 이동
          kakao.maps.event.addListener(marker, 'click', function () {
            setAddressName(title)
            console.log('marker click!')
            changeClick(click + 1)
            instance
              .post(
                `/futsal/ground/check`,
                {
                  placeName: places[i].place_name
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }
              )
              .then((res) => {
                dispatch(accordGroundData({}))
                dispatch(accordGroundData(res.data))
                  .then((res) => console.log(res))
                  .catch((err) => dispatch(accordGroundData({})))
              })
              .catch((err) => dispatch(accordGroundData({})))
            // console.log(places[i].place_name)
            // dispatch(accordGroundData(places[i].place_name))
            //   .then((res) => console.log(res))
            //   .catch((err) => console.log(err))
            getData(places[i])
          })

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close()
          })
          itemEl.onmouseover = function () {
            displayInfowindow(marker, title)
          }
          itemEl.onmouseout = function () {
            infowindow.close()
          }
          itemEl.onclick = function () {
            console.log('list click!')
            changeClick(click + 1)

            instance
              .post(
                `/futsal/ground/check`,
                {
                  placeName: places[i].place_name
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }
              )
              .then((res) => {
                // dispatch(accordGroundData({}))
                dispatch(accordGroundData(res.data))
                  .then((res) => console.log(res))
                  .catch((err) => dispatch(accordGroundData({})))
              })
              .catch((err) => dispatch(accordGroundData({})))
            // dispatch(accordGroundData(places[i].place_name)).then(
            //   (res) => console.log(res)
            // ).catch((err) => console.log(err))
            getData(places[i])
          }
        })(marker, places[i].place_name)
        fragment.appendChild(itemEl)
      }
      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment)
      menuEl.scrollTop = 0

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds)
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      let el = document.createElement('li'),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          '   <h5>' +
          places.place_name +
          '</h5>'
      itemStr += '<span>' + places.address_name + '</span>'
      itemStr += '<form class="review">' + `<p>></p>` + '</form>'
      el.innerHTML = itemStr
      el.className = 'item'

      return el
    }
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      let imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage
        })
      marker.setMap(map) // 지도 위에 마커를 표출합니다
      markers.push(marker) // 배열에 생성된 마커를 추가합니다
      return marker
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = []
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      let paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }
        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      let content = '<div style="padding:5px;z-index:1;">' + title + '</div>'

      infowindow.setContent(content)
      infowindow.open(map, marker)
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild)
      }
    }
  }, [searchPlace, addressName])

  return (
    <Container>
      <MapWrap></MapWrap>
      <BackList />
      <div class="map_wrap">
        <MapView ref={mapRef} />
      </div>
      <MenuWrap ref={MenuRef}>
        <SearchLine />
        <List>
          <ListLine />
          <ListTitle>경기장 목록</ListTitle>
        </List>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </MenuWrap>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  .map_wrap,
  .map_wrap a,
  .map_wrap a:hover,
  .map_wrap a:active {
    color: #000;
    text-decoration: none;
  }
  .map_wrap {
    position: relative;
  }
  #placesList li {
    position: relative;
    list-style: none;
    height: 100px;
  }
  #placesList .item {
    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
    min-height: 65px;
    :hover {
      background-color: #f4f4f4;
    }
  }
  #placesList .item span {
    display: block;
    margin-top: 4px;
  }
  #placesList .item h5,
  #placesList .item .info {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  #placesList .item .info {
    padding: 35px 0 10px 55px;
  }
  #placesList .item h5 {
    font-size: 20px;
    @media screen and (max-width: 767px) {
      font-size: 15px;
    }
  }
  #placesList .info .gray {
    color: #8a8a8a;
  }
  #placesList .info .jibun {
    padding-left: 26px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png')
      no-repeat;
  }
  #placesList .info .tel {
    color: #009900;
  }
  #placesList .review {
    display: flex;
    position: absolute;
    bottom: 35%;
    right: 1%;
    top: 40%;
  }
  #placesList .review p {
    margin: 0;
    padding: 0;
    margin-right: 1px;
    font-size: 30px;
    color: #c4c4c4;
    border-radius: 25px;
    text-align: center;
    width: 60px;
    text-decoration: none;
  }
  #placesList .item .markerbg {
    float: left;
    position: absolute;
    width: 36px;
    height: 37px;
    margin: 35px 0 0 10px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png')
      no-repeat;
  }
  #placesList .item .marker_1 {
    background-position: 0 -10px;
  }
  #placesList .item .marker_2 {
    background-position: 0 -56px;
  }
  #placesList .item .marker_3 {
    background-position: 0 -102px;
  }
  #placesList .item .marker_4 {
    background-position: 0 -148px;
  }
  #placesList .item .marker_5 {
    background-position: 0 -194px;
  }
  #placesList .item .marker_6 {
    background-position: 0 -240px;
  }
  #placesList .item .marker_7 {
    background-position: 0 -286px;
  }
  #placesList .item .marker_8 {
    background-position: 0 -332px;
  }
  #placesList .item .marker_9 {
    background-position: 0 -378px;
  }
  #placesList .item .marker_10 {
    background-position: 0 -423px;
  }
  #placesList .item .marker_11 {
    background-position: 0 -470px;
  }
  #placesList .item .marker_12 {
    background-position: 0 -516px;
  }
  #placesList .item .marker_13 {
    background-position: 0 -562px;
  }
  #placesList .item .marker_14 {
    background-position: 0 -608px;
  }
  #placesList .item .marker_15 {
    background-position: 0 -654px;
  }
  #pagination {
    margin: 10px auto;
    text-align: center;
  }
  #pagination a {
    display: inline-block;
    margin-right: 10px;
  }
  #pagination .on {
    font-weight: bold;
    cursor: default;
    color: #777;
  }
`
const MapWrap = styled.div`
  width: 25vw;
  height: 100vh;
  position: absolute;
  background-color: #fafafa;
  top: 0;
  right: 1;
  overflow: hidden;
  z-index: -100px;
  @media screen and (max-width: 767px) {
  }
`

const MapView = styled.div`
  width: calc(100vw - 473px);
  height: 100vh;
  position: absolute;
  top: 0;
  right: 1;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    width: 100vw;
    height: 200px;
    left: 0;
  }
`

const List = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListLine = styled.div`
  position: absolute;
  top: 55%;
  left: 0;
  width: 100%;
  border: 1px solid #5c5c5c;
  z-index: 5;
`

const ListTitle = styled.h1`
  z-index: 10;
  width: 175px;
  height: 10px;
  font-size: 20px;
  background-color: #fafafa;
  text-align: center;
  color: #5c5c5c;
`

const SearchLine = styled.div`
  height: 10px;
`

const MenuWrap = styled.div`
  position: absolute;
  top: 130px;
  left: 0;
  bottom: 0;
  width: 473px;
  height: 93vh;
  padding: 5px 30px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fafafa;
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    top: 350px;
    width: 100%;
    bottom: 0;
  }
`

const BackList = styled.div`
  height: 100%;
  width: 473px;
  @media screen and (max-width: 767px) {
    width: 0;
  }
`

export default Map
