import React from 'react'
import styled from 'styled-components'
import { REGION, AREA } from './data'

const RegionBox = ({ region1, handleRegion1, handleRegion2 }) => {


  return (
    <SelectBoxWrapper>
      <Select onChange={handleRegion1}>
        {AREA.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={option.value}
          >
            {option.name}
          </option>
        ))}
      </Select>
      {/* <Select onChange={handleRegion2}>
        {REGION.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={option.value}
          >
            {option.value}
          </option>
        ))}
      </Select> */}
    </SelectBoxWrapper>
  )
}

const SelectBoxWrapper = styled.div`
  display: flex;
`

export const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100px;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    border-color: red;
  }
`

export default RegionBox
