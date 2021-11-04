import React from 'react'
import styled from 'styled-components'
import { ko } from 'date-fns/esm/locale'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = ({ handledate, startDate }) => {
  //selected에 .add(1, 'days') 추가 
  // 추가하니까 캘린더는 잘 나오는데 
  // 데이터는 하루 늦게로 나옴
  return (
    <>
      <Dateform
        selected={moment(startDate).toDate()}
        onChange={(date) => handledate(date)}
        dateFormat="yyyy-MM-dd"
        locale={ko}
      />
    </>
  )
}

const Dateform = styled(DatePicker)`
  width: 153px;
  height: 35px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 4px;
  border : 1px solid #c6c6c6;
  font-size: 16px;
  opacity : 90%;
  :hover {
    cursor: pointer;
  }
`

export default Calendar
