import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
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
    if (getPlace !== '') {
      Swal.fire({
        title: '원하는 서비스를 선택하세요',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '경기잡기',
        denyButtonText: '리뷰검색',
        confirmButtonColor: '#5ca415',
        denyButtonColor: '#919191'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(mapData(getPlace))
          history.push('/write')
        }
        if (result.isDenied) {
          history.push('/review')
        }
      })
    }
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
