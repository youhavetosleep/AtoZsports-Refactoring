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
        dateFormat="yyyy-MM-dd"
        selected={moment(startDate).toDate()}
        onChange={(date) => handledate(date)}
        locale={ko}
      />
    </>
  )
}

const Dateform = styled(DatePicker)`
  width: 380px;
  height: 30px;
  box-sizing: border-box;
  margin: 0px 20px 0px -20px;
  padding: 20px 0px 20px 150px;
  border-radius: 5px;
  border : 1px solid #c6c6c6;
  justify-content: center;
  font-size: 16px;
  opacity : 90%;
  @media screen and (max-width: 767px) {
  width: 100%;
    }
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
  width: 76.5%;
  height: 35px;
  margin: 0px auto 0px auto;
  padding: 15px 0px 15px 0px;
  text-align: center;
    }
`

export default CalendarWrite
