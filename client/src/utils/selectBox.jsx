import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { STARTOPTIONS, ENDOPTIONS } from './data'

const SelectBox = ({ handleStartHour, handleEndHour }) => {
  
  const options = useMemo(() => STARTOPTIONS)
  
  const options2 = useMemo(() => ENDOPTIONS)
  
  
  return (
    <SelectBoxContainer>
      <SelectWrap>
        <Select options={options} defaultValue={options[0]} onChange={handleStartHour}/>
      </SelectWrap>
      <SelectWrap className='second'>
        <Select options={options2} defaultValue={options2[0]} onChange={handleEndHour}/>
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
  /* width: 9vw; */
`

export default SelectBox
