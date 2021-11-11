import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import store from '../../store/store'
import Map from '../../pages/map'
import { mapData } from '../../_actions/ground_action'
import Navbar from '../navbar'
import Footer from '../footer'

const MapSearch = ({ isLogin, setIsLogin, setClickMap }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState('')
  const [place, setPlace] = useState('')

  const [getPlace, setGetPlace] = useState('')

  // 중복된 marker & list를 감지하기위한 상태
  const [click, setClick] = useState([])

  const getData = (getPlace) => {
    setGetPlace(getPlace)
  }

  // 중복된 marker & list를 감지하기위한 함수
  const changeClick = (num) => {
    setClick([...click, ...num])
  }

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // entrance에서 선택하고 들어온 운동종목을 맵에서 검색시 기본 값으로 두기 위한 상태 업데이트
    // (ex. entrance를 풋살로 클릭했을 때 '강남' 검색어 입력시 '강남 풋살' 로 검색결과가 표시)
    setPlace(`${inputText} ${store.getState().user.sport}`)
    setInputText('')
  }

  useEffect(() => {
    // map.jsx와 동시에 동작하기 때문에
    // ground.accordData가 한박자 늦게 반응 한다.
    // setTimeout으로 useEffect에 딜레이를 줘서
    // map에서 마커나 리스트를 클릭하고 state 업데이트가 이루어진 후
    // 아래 동작 수행
    // 이렇게 되면 한 템포 늦게 반영되는 것이 해결
    const tick = setTimeout(() => {
      //지도에서 경기장목록 & 마커를 클릭하면 accordData에 데이터가 담기고
      // 데이터의 유무에 따라 다른 모달을 표시
      if (getPlace !== '') {
        if (Object.keys(store.getState().ground.accordData).length !== 0) {
          Swal.fire({
            text: '원하는 서비스를 선택하세요',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '경기 잡기',
            denyButtonText: '리뷰 보기',
            cancelButtonText: '닫기',
            confirmButtonColor: '#5ca415',
            denyButtonColor: '#919191'
          }).then((result) => {
            dispatch(mapData(getPlace))
            if (result.isConfirmed) {
              if (!isLogin) {
                Swal.fire({
                  text: '로그인이 필요한 서비스 입니다!',
                  icon: 'warning',
                  confirmButtonColor: '#d2d2d2',
                  confirmButtonText: '확인'
                })
                return
              }
              setClickMap({
                placeName: getPlace.place_name,
                addressName: getPlace.address_name,
                phone: getPlace.phone,
                longitude: getPlace.y,
                latitude: getPlace.x,
                placeUrl: getPlace.place_url
              })
              history.push('/write')
            }
            if (result.isDenied) {
              history.push('/review')
            }
          })
        } else
          Swal.fire({
            text: '해당 경기장엔 리뷰가 없습니다',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '경기 잡기',
            denyButtonText: '리뷰 없음',
            cancelButtonText: '닫기',
            confirmButtonColor: '#5ca415',
            denyButtonColor: '#919191'
          }).then((result) => {
            dispatch(mapData(getPlace))
            if (result.isConfirmed) {
              if (!isLogin) {
                Swal.fire({
                  text: '로그인이 필요한 서비스 입니다!',
                  icon: 'warning',
                  confirmButtonColor: '#d2d2d2',
                  confirmButtonText: '확인'
                })
                return
              }
              history.push('/write')
            }
            if (result.isDenied) {
            }
          })
      }
    }, 100)

    return () => clearTimeout(tick)
  }, [getPlace, click])

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Wrapper>
        <SearchPosition>
          <SearchForm className="inputForm" onSubmit={handleSubmit}>
            <Input
              placeholder="지역이나 경기장 이름을 검색해주세요"
              onChange={onChange}
              value={inputText}
            />
            <SearchBtn type="submit">
              <FaSearch />
            </SearchBtn>
          </SearchForm>
        </SearchPosition>
        <Map
          searchPlace={place}
          getData={getData}
          changeClick={changeClick}
          click={click}
          setClick={setClick}
        />
      </Wrapper>
      <Footer />
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const SearchForm = styled.form`
  bottom: 93%;
  position: absolute;
  left: 36px;
  top: 0;
  z-index: 30;
  @media screen and (max-width: 767px) {
    top: 240px;
    left: 31px;
  }
`

const Input = styled.input`
  width: 400px;
  padding: 20px 25px;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 17px;
  border: solid 1px #c6c6c6;
  ::placeholder {
    font-size: 17px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100vw - 60px);
    padding: 10px 15px;
  }
`

const SearchPosition = styled.div`
  position: relative;
  z-index: 1;
`

const SearchBtn = styled.button`
  position: absolute;
  border: none;
  top: 12%;
  right: 2%;
  width: 50px;
  height: 50px;
  font-size: 25px;
  background: none;
  color: #c6c6c6;
  @media screen and (max-width: 767px) {
    top: -2px;
    right: 0;
  }
`

export default MapSearch
