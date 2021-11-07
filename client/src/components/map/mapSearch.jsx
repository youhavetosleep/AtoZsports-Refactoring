import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import store from '../../store/store'
import Map from '../../pages/map'
import { mapData } from '../../_actions/ground_action'

const MapSearch = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState('')
  const [place, setPlace] = useState('안양 풋살')

  const [getPlace, setGetPlace] = useState('')

  const getData = (getPlace) => {
    setGetPlace(getPlace)
  }

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(inputText)
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
      if (getPlace !== '') {
        if (Object.keys(store.getState().ground.accordData).length !== 0) {
          Swal.fire({
            title: '원하는 서비스를 선택하세요',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '경기 잡기',
            denyButtonText: '리뷰 보기',
            confirmButtonColor: '#5ca415',
            denyButtonColor: '#919191'
          }).then((result) => {
            dispatch(mapData(getPlace))
            if (result.isConfirmed) {
              history.push('/write')
            }
            if (result.isDenied) {
              history.push('/review')
            }
          })
        } else
          Swal.fire({
            title: '원하는 서비스를 선택하세요',
            text: '해당 경기장엔 리뷰가 없습니다',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '경기 잡기',
            denyButtonText: '리뷰 없음',
            confirmButtonColor: '#5ca415',
            denyButtonColor: '#919191'
          }).then((result) => {
            dispatch(mapData(getPlace))
            if (result.isConfirmed) {
              history.push('/write')
            }
            if (result.isDenied) {
              // history.push('/review')
            }
          })
      }
  }, 100);

  return () => clearTimeout(tick);
  }, [getPlace])

  return (
    <Wrapper>
      <SearchPosition>
        <SearchForm className="inputForm" onSubmit={handleSubmit}>
          <Input
            placeholder="운동장을 찾아보세요"
            onChange={onChange}
            value={inputText}
          />
          <SearchBtn type="submit">
            <FaSearch />
          </SearchBtn>
        </SearchForm>
      </SearchPosition>
      <Map searchPlace={place} getData={getData} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const SearchForm = styled.form`
  margin-left: 45px;
  position: absolute;
  left: -23.5%;
  margin-top: 20px;
  z-index: 30;
`

const Input = styled.input`
  width: 343px;
  padding: 15px 20px;
  border-radius: 10px;
  border: solid 1px #c6c6c6;
`

const SearchPosition = styled.div`
  position: relative;
  z-index: 20;
`

const SearchBtn = styled.button`
  position: absolute;
  border: none;
  top: 5%;
  right: 2%;
  width: 50px;
  height: 50px;
  font-size: 25px;
  background: none;
  color: #c6c6c6;
`

export default MapSearch
