import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { REGION, AREA } from './data'

const RegionBox = ({ region1, region2, handleData1, handleData2, firstData1, firstData2 }) => {
  console.log('메인렌딩 리젼1', region1)
  let setFirst = region1 || '지역'
  let setSecond = region2 || '시/구/군'
  const [data1, setData1] = useState(setFirst)
  useEffect(() => {
    firstData1(setFirst)
    firstData2(setSecond)
  },[])
  console.log('메인렌딩 데이터 췍',data1)
  const handleCOMP = (e) => {
    setData1(e.value)
  }
  const options = useMemo(() => REGION)
  console.log('보자보자 옵션1보자',options)
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
  console.log('보자보자 픽2보자',pickSecondRegion)
  const options2 = useMemo(() => pickSecondRegion)
  console.log('보자보자 옵션2보자',options2)
  let findDefaultValue2
  options2.map((el, idx) => {
    if(el.value === setSecond) {
      findDefaultValue2 = idx
    }
  })
  console.log('넘어오는 리젼2값', region2)
  console.log('옵션2 idx값',findDefaultValue2)
  
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

export default RegionBox
