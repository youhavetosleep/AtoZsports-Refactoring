import React from 'react'
import styled from 'styled-components'
import { ko } from 'date-fns/esm/locale'
import { FaChevronDown } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = ({ handledate, startDate }) => {
  return (
    <CalendarWrap>
      <Dateform
        selected={moment(startDate).toDate()}
        onChange={(date) => handledate(date)}
        // dateFormat={moment().format('YYYY-MM-DD')}
        dateFormat="yyyy-MM-dd"
        locale={ko}
      />
      <DownWrap>
        <FaChevronDown />
      </DownWrap>
    </CalendarWrap>
  )
}

const CalendarWrap = styled.div`
position: relative;
display :flex;
@media screen and (max-width: 767px) {
  width : 245px;
  margin : 0 auto;
}
`

const DownWrap = styled.div`
  width: 0.1px;
  color: #000000;
  z-index: -1;
  position: absolute;
  top: 10.5px;
  right : 25px;
  @media screen and (max-width: 767px) {
    top: 12px;
  right : 15px;
  }

`

const Dateform = styled(DatePicker)`
  width: 153px;
  height: 37.5px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #cdcdcd;
  font-size: 16px;
  opacity: 90%;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    width: 245px;
    margin-left: 12px;
    text-align: center;
  }
`

export default Calendar
