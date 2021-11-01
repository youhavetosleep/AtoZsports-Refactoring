import React from 'react'
import styled from 'styled-components'
import { OPTIONS } from './data'
const SelectBox = ({ handleEndHour, handleStartHour }) => {
  return (
    <SelectBoxWrapper>
      <Select onChange={handleStartHour}>
        {OPTIONS.map((option) => (
          <option
            
            key={option.value}
            value={option.value}
            defaultValue={option.value}
          >
            {option.name}
          </option>
        ))}
      </Select>
      <Select onChange={handleEndHour}>
        {OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={option.value}
          >
            {option.name}
          </option>
        ))}
      </Select>
    </SelectBoxWrapper>
  )
}

const SelectBoxWrapper = styled.div`
  display: flex;
`

const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 80px;
  padding: 8px 8px;
  margin-right :5px; 
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export default SelectBox
