import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { REGION, AREA } from './data'

const RegionBoxMypage = ({ region1, region2, handleData1, handleData2, firstData1, firstData2 }) => {
  let setFirst = region1
  let setSecond = region2
  const [data1, setData1] = useState(setFirst)
  useEffect(() => {
    firstData1(setFirst)
    firstData2(setSecond)
  },[])
  console.log('컴포넌트 데이터 췍',data1)
  const handleCOMP = (e) => {
    setData1(e.value)
  }
  const options = useMemo(() => REGION)
  let findDefaultValue
  options.map((el, idx) => {
    if(el.value === data1) {
      findDefaultValue = idx
    }
  })
  let pickSecondRegion
  AREA.forEach((selected) => {
    if(selected.name === data1) {
      pickSecondRegion = selected.list
    }
  })
  const options2 = useMemo(() => pickSecondRegion)
  let findDefaultValue2
  options2.map((el, idx) => {
    if(el.value === region2) {
      findDefaultValue2 = idx
    }
  })
  
  return (
    <SelectBoxContainer>
      <SelectWrap>
        <Select options={options} defaultValue={options[findDefaultValue]} onChange={(e) => {handleData1(e); handleCOMP(e)}}/>
      </SelectWrap>
      <SelectWrap className='second'>
        <Select options={options2} defaultValue={options2[findDefaultValue2]} onChange={handleData2} />
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

export default RegionBoxMypage