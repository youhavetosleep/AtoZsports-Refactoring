/*global kakao */
import React, { useEffect, useState } from 'react'

const Post = () => {
  useEffect(() => {
    mapscript()
  }, [])
  const [markerData, setMarkerData] = useState([
    {
      title: '유림풋살장',
      lat: 37.2520770795764,
      lng: 127.214827986162
    },
    { title: '오토허브풋살장', 
    lat: 37.2675531813486, 
    lng: 127.091819699652 }
  ])

  const mapscript = () => {
    let container = document.getElementById('map')
    let options = {
      center: new kakao.maps.LatLng(37.2520770795764, 127.214827986162),
      level: 5
    }
 

    //map
    const map = new kakao.maps.Map(container, options)

    markerData.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title
      })
    })
  }

  return <div id="map" style={{ width: '1000px', height: '1000px' }}></div>
}

export default Post
