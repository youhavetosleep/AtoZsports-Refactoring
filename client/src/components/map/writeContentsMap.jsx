import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import store from '../../store/store'
import WriteContentsSearch from './writeContentsSearch'

const WriteContentsMap = ({ getData, setGetGroundData,getGroundData }) => {
  const [inputText, setInputText] = useState('')
  const [place, setPlace] = useState('')

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
  height: 500px;
  display: flex;
`

const SearchForm = styled.form`
  bottom: 93%;
  position: absolute;
  left: 10px;
  top: 25px;
  z-index: 30;
  @media screen and (max-width: 767px) {
    top: 20px;
    left: 43px;
  }
`

const Input = styled.input`
  width: 260px;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 5px 0px 0px 5px;
  font-size: 17px;
  border: solid 1px #c6c6c6;
  ::placeholder {
    font-size: 15px;
    @media screen and (max-width: 767px) {
      font-size: 13px;
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
