import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/fa'
import { REGION, AREA } from './data'

const RegionBoxFutsal = ({ region1, handleRegion1, handleRegion2 }) => {
  const [region2, setRegion2] = useState([])

  const selectRegion = () => {
    AREA.forEach((selected) => {
      if (selected.name === region1) {
        setRegion2(selected.list)
      }
    })
  }

  useEffect(() => {
    selectRegion()
  }, [region2, region1])

  console.log(region1, region2)

  return (
    <SelectBoxContainer>
      <SelectWrap>
        <Select onChange={handleRegion1}>
          {REGION.map((option) => (
            <option
              key={option.value}
              value={option.value}
              defaultValue={option.value}
              
            >
              {option.name}
            </option>
          ))}
        </Select>
        <DownWrap>
          <FaChevronDown />
        </DownWrap>
      </SelectWrap>
      <SelectWrap className='second'>
        <Select onChange={handleRegion2}>
          {region2.map((option) => (
            <option
              key={option.value}
              value={option.value}
              defaultValue={option.value}
              
            >
              {option.value}
            </option>
          ))}
        </Select>
        <DownWrap>
          <FaChevronDown />
        </DownWrap>
      </SelectWrap>
    </SelectBoxContainer>
  )
}

const SelectBoxContainer = styled.div`
  display: flex;
  .second {
    margin-left: 7px;
  }
`
const SelectWrap = styled.div`
  position: relative;
  @media screen and (max-width: 767px) {
    /* width: 30px; */
  }
`
const DownWrap = styled.div`
  width: 0.1px;
  position: absolute;
  top: 27.5%;
  right: 20%;
  color: #000000;
  z-index: -1;
  @media screen and (max-width: 767px) {
    /* width: 30px; */
  }
`
export const Select = styled.select`
  margin: 0px 0px 0px 0px;
  min-width: 0;
  width: 135px;
  box-sizing: border-box;
  padding: 8px 8px;
  font-size: 1rem;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  color: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 90%;
  @media screen and (max-width: 767px) {
    font-size: .8rem;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    padding: 5px 5px 5px 10px;
  }
  :hover {
    cursor: pointer;
  }
`

export default RegionBoxFutsal
