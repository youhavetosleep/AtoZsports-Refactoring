import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import Map from '../../pages/map'

const MapSearch = () => {
  const [inputText, setInputText] = useState('')
  const [place, setPlace] = useState('안양 풋살')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(inputText)
    setInputText('')
  }

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
      <Map searchPlace={place} />
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
  z-index: 300;
`

const Input = styled.input`
  width: 343px;
  padding: 15px 20px;
  border-radius: 10px;
  border: solid 1px #c6c6c6;
`

const SearchPosition = styled.div`
  position: relative;
  z-index: 200;
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
