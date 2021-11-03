import React from 'react';
import styled from 'styled-components'
import {STAR} from './data'
const ScoreBox = (props) => {

  return (
    <SelectBoxWrapper>
    <Select>
    {STAR.map((option) => (
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
  box-sizing: border-box;
  padding: 8px 8px;
  margin-right :5px; 
  font-size: inherit;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`
export default ScoreBox;