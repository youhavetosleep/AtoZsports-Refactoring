import React from 'react'
import styled from 'styled-components'
import { ko } from 'date-fns/esm/locale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = ({ handledate, startDate }) => {
  return (
    <>
      <Dateform
        selected={startDate}
        onChange={(date) => handledate(date)}
        dateFormat="yyyy-MM-dd"
        locale={ko}
      />
    </>
  )
}

const Dateform = styled(DatePicker)`
  width: 150px;
  height: 30px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 13px;
`

export default Calendar
