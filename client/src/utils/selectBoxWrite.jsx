import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { STARTOPTIONS, ENDOPTIONS } from './data'

const SelectBox = ({ startTime, endTime, handleStartHour, handleEndHour }) => {
  let setStartTime = startTime
  let setEndTime = endTime
  console.log(setStartTime, setEndTime)
  const options = useMemo(() => STARTOPTIONS)
  console.log(options)
  let findDefaultValue
  options.map((el, idx) => {
    if(el.value === setStartTime) {
      findDefaultValue = idx
    }
  })  
  console.log(findDefaultValue)
  const options2 = useMemo(() => ENDOPTIONS)
  let findDefaultValue2
  options.map((el, idx) => {
    if(el.value === setEndTime) {
      findDefaultValue2 = idx
    }
  })
  console.log(findDefaultValue2)  
  
  
  return (
    <SelectBoxContainer>
      <SelectWrap>
        <Select options={options} defaultValue={options[findDefaultValue]} onChange={handleStartHour}/>
      </SelectWrap>
      <SelectWrap className='second'>
        <Select options={options2} defaultValue={options2[findDefaultValue2]} onChange={handleEndHour}/>
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
`

export default SelectBox
