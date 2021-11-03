import React from 'react'
import styled from 'styled-components'
import { ko } from 'date-fns/esm/locale'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const CalendarWrite = ({ handledate, startDate }) => {
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
  width: 380px;
  height: 35px;
  box-sizing: border-box;
  margin: 0px 20px 0px 10px;
  padding: 20px 0px 20px 160px;
  border-radius: 5px;
  border : 1px solid #c6c6c6;
  font-size: 16px;
  opacity : 90%;
  :hover {
    cursor: pointer;
  }
`

export default CalendarWrite
