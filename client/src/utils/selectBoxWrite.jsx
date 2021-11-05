import React from 'react'
import styled from 'styled-components'
import { STARTOPTIONS, ENDOPTIONS } from './data'

const SelectBoxWrite = ({ handleEndHour, handleStartHour }) => {
  return (
    <SelectBoxWrapper>
      <Select onChange={handleStartHour}>
        {STARTOPTIONS.map((option) => (
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
        {ENDOPTIONS.map((option) => (
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
  text-align: center;
  width: 180px;
  box-sizing: border-box;
  padding: 11px 0px 11px 0px;
  margin-right :20px; 
  font-size: inherit;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export default SelectBoxWrite
