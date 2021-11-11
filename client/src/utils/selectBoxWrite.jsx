import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { STARTOPTIONS, ENDOPTIONS } from './data'

const SelectBox = ({ startTime, endTime, handleStartHour, handleEndHour }) => {
  let setStartTime = startTime
  let setEndTime = endTime

  const options = useMemo(() => STARTOPTIONS)

  let findDefaultValue
  options.map((el, idx) => {
    if (el.value === setStartTime) {
      findDefaultValue = idx
    }
  })

  const options2 = useMemo(() => ENDOPTIONS)
  let findDefaultValue2
  options.map((el, idx) => {
    if (el.value === setEndTime) {
      findDefaultValue2 = idx
    }
  })
  return (
    <SelectBoxContainer>
      <SelectWrap className="first">
        <Select
          options={options}
          defaultValue={options[findDefaultValue]}
          onChange={handleStartHour}
        />
      </SelectWrap>
      <SelectWrap className="second">
        <Select
          options={options2}
          defaultValue={options2[findDefaultValue2]}
          onChange={handleEndHour}
        />
      </SelectWrap>
    </SelectBoxContainer>
  )
}

const SelectBoxContainer = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0px auto 0px auto;
  }
  .second {
    margin-left: 10px;
    padding: 0px 0px 0px 0px;
    font-size: 1rem;
    @media screen and (max-width: 767px) {
      width: 100%;
      margin: 0px 23.5% 0px 0px;
    }
  }
`
const SelectWrap = styled.div`
  position: relative;
  width: 180px;
  padding: 0px 0px 10px 0px;
  @media screen and (max-width: 767px) {
    width: calc(100% - 0px);
    margin: 0px 10px 0px 0px;
  }
`

export default SelectBox
