import React from 'react'
import styled from 'styled-components'
import { ko } from 'date-fns/esm/locale'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = ({ handledate, startDate }) => {
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
  font-size: 16px;
`

export default Calendar
