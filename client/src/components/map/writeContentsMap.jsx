import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import WriteContentsSearch from './writeContentsSearch'

const WriteContentsMap = ({ getPlace, getData }) => {
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
      getPlace={getPlace}
      getData={getData}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const SearchForm = styled.form`
  position: absolute;
  top: 40px;
  left: 28px;
  margin-top: 20px;
  z-index: 3;
`

const Input = styled.input`
  width: 170px;
  height: 1px;
  padding: 15px 20px;
  border-radius: 10px;
  border: solid 1px #c6c6c6;
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
