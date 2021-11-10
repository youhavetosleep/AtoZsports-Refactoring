import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import WriteContentsSearch from './writeContentsSearch'

const WriteContentsMap = ({ getData, setGetGroundData,getGroundData }) => {
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
        <SearchForm onSubmit={handleSubmit}>
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
      <WriteContentsSearch 
      searchPlace={place}
      getData={getData}
      setGetGroundData={setGetGroundData}
      getGroundData={getGroundData}
      />
    </Wrapper>
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
    top: 20px;
    left: 43px;
  }
`

const Input = styled.input`
  width: 400px;
  padding: 20px 25px;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 17px;
  border: solid 1px #c6c6c6;
  ::placeholder {
    font-size: 17px;
    @media screen and (max-width: 767px) {
      font-size: 15px;
  }
  }
  @media screen and (max-width: 767px) {
    top: 0px;
    width: calc(100vw - 85px);
    padding: 7px 15px;
  }
`

const SearchPosition = styled.div`
  position: relative;
`

const SearchBtn = styled.button`
  position: absolute;
  border: none;
  top: 0%;
  right: 2%;
  width: 35px;
  height: 40px;
  font-size: 20px;
  background: none;
  color: #c6c6c6;
`

export default WriteContentsMap
