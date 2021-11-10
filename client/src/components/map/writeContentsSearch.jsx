/*global kakao*/
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const WriteContentsSearch = ({ searchPlace, getData, setGetGroundData, getGroundData }) => {
  const mapRef = useRef()
  const MenuRef = useRef()

  const history = useHistory()
  // const Review = () => {
  //   history.push('/review')
  // }
  // const [clickPlace, setClickPlace] = useState('')
  // console.log('click =====>', clickPlace)

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
        // console.log(data, status, pagination)
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
      // for(let i = 0 ; i < places.len)
      // setGetGroundData(places)
      let listEl = document.getElementById('placesList'),
        menuEl = MenuRef.current,
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = ''

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl)

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker()

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        // console.log(places[i])
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        ;(function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title)
          })
          // kakao.maps.event.addListener(marker, 'click', function () {
          //   getData(places[i].place_name)         
          // })
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close()
          })
          itemEl.onmouseover = function () {
            displayInfowindow(marker, title)
          }
          itemEl.onclick = function () {
            getData(places[i])
          }

          itemEl.onmouseout = function () {
            infowindow.close()
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
      itemStr +=
        '<form class="review"></form>'
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
      // console.log(title)
    }

    // const choicePlace = (marker, title) => {
    //   setClickPlace(title)
    // }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild)
      }
    }
  }, [searchPlace])

  return (
    <Container>
      <BackList>
      <div class="map_wrap">
        <MapView ref={mapRef} />
      </div>
      <MenuWrap ref={MenuRef}>
        {/* <SearchLine /> */}
        <List>
          <ListLine />
          <ListTitle>경기장 목록</ListTitle>
        </List>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </MenuWrap>
      </BackList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  @media screen and (max-width: 767px) {
   /* height: 100vh; */
  }
  
  #placesList li {
    position: relative;
    list-style: none;
    height: 90px;
    @media screen and (max-width: 767px) {
      height: 70px;
  }
  }
  #placesList .item {
    border-bottom: 1px solid #888;
    overflow: hidden;
    cursor: pointer;
    min-height: 65px;
    @media screen and (max-width: 767px) {
      min-height: 30px;
  }
    :hover {
      background-color: #f4f4f4;
    }
  }
  #placesList .item span {
    display: block;
    margin-top: 10px;
    
  }
  // 지도 주소
  #placesList .item h5,
  #placesList .item .info {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    
  }
  #placesList .item .info {
    padding: 30px 0 10px 55px;
    @media screen and (max-width: 767px) {
      padding: 20px 0 10px 10px;
  }
  }
  #placesList .item h5 {
    font-size: 15px;
  }
  #placesList .info .gray {
    color: #8a8a8a;
  }
  #placesList .info .jibun {
    padding-left: 26px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png')
      no-repeat;
  }
  #placesList .review {
    display: flex;
    position: absolute;
    bottom: 10%;
    right: 1%;
  }
  #placesList .item .markerbg {
    float: left;
    position: absolute;
    width: 36px;
    height: 37px;
    margin: 30px 0 0 10px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png')
      no-repeat;
      @media screen and (max-width: 767px) {
    display: none;
  }
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

const BackList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .map_wrap {
    position: relative;
  }
`

const MapView = styled.div`
  display: flex;
  position: relative;
  width: 530px;
  height: 450px;
  justify-content: center;
  align-items: center;
  margin: 80px 0px 0px 270px;
  border-radius: 12px;
  top: -40px;
  right: 0;
  @media screen and (max-width: 767px) {
    margin: -300px 0px 0px 0px;
    width: 79vw;
    height: 400px;
    border-radius: 5px;
    top: 0;
  }
`

const MenuWrap = styled.div`
  position: absolute;
  top: 90px;
  left: 10px;
  width: 260px;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background: rgba(255, 255, 255);
  font-size: 12px;
  border-radius: 10px;
  z-index: 2;
  @media screen and (max-width: 767px) {
    width: 79vw;
    top: 280px;
    left: 11%;
    height: 190px;
    border-radius: 5px;
  }
  
`

// const SearchLine = styled.div`
// position: absolute;
// top: 100px;
//   height: 50px;
// `

const List = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    height: 0px;
  }
`

const ListLine = styled.div`
  position: absolute;
  top: 79%;
  left: 0;
  width: 100%;
  border: 1px solid #5c5c5c;
  @media screen and (max-width: 767px) {
    top: 0px;
  }
`

const ListTitle = styled.h1`
position: absolute;
top: 40%;
  width: 100px;
  height: 10px;
  font-size: .9rem;
  background-color: #fafafa;
  text-align: center;
  color: #5c5c5c;
  @media screen and (max-width: 767px) {
    top: -5px;
  }
`

export default WriteContentsSearch
