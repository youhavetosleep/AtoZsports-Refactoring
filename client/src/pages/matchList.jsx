import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import MatchCard from '../components/matchCard'
import {
  getMatchListData,
  sortedMatchListData
} from '../_actions/matchCard_action'
import Calendar from '../utils/calendar'
import SelectBox from '../utils/selectBox'
import RegionBox from '../utils/regionBox'

const MatchList = ({ region1, region2, handleRegion1, handleRegion2 }) => {
  const newdate = new Date()
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(1)
  const [CurrentOrder, setCurrentOrder] = useState('member')
  const [listData, setListData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // 더보기 버튼
  const handleOffset = async () => {
    let offsetNum = offset + 1
    setOffset(offsetNum)
  }

  // 캘린더 컴포넌트 날짜 value 가져오기
  const handledate = (date) => {
    const monthIndex = date.getMonth() + 1
    const year = date.getFullYear()
    const day = ('0' + date.getDate()).slice(-2)
    let date1 = `${year}-${`0${monthIndex}`.slice(-2)}-${day}`
    setStartDate(date1)
  }

  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setStartTime(e.target.value)
  }
  const handleEndHour = (e) => {
    setEndTime(e.target.value)
  }

  // 용병모집 버튼
  const latestBtn = () => {
    setCurrentOrder('member')
  }
  // 경기제안 버튼
  const viewBtn = () => {
    setCurrentOrder('match')
  }

  // sort 값에 따른 매치 리스트 세팅
  useEffect(() => {
    setListData([])
    dispatch(
      sortedMatchListData(
        offset,
        startTime,
        endTime,
        CurrentOrder,
        startDate,
        region1,
        region2
      )
    )
      .then((res) => {
        setListData([...listData, ...res.payload])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [region2, offset, startTime, endTime, CurrentOrder, startDate])

  // match 버튼 눌렀을 때 첫 매치리스트 세팅
  useEffect(() => {
    setListData([])
    dispatch(getMatchListData(offset, CurrentOrder, newdate))
      .then((res) => {
        setListData([...listData, ...res.payload])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [offset])

  return (
    <FutsalMatchSoonSection>
      <MatchSoonTitle>
        <div className="matchSoon_title">Match</div>
      </MatchSoonTitle>
      <MatchSoonFilter>
        <FilterWrap>
          <DateWrap>
            <CalendarWrap>
              <Calendar
                className="Calender"
                handledate={handledate}
                startDate={startDate}
              />
            </CalendarWrap>
            <TimeWrap>
              <SelectBox
                handleStartHour={handleStartHour}
                handleEndHour={handleEndHour}
              />
            </TimeWrap>
          </DateWrap>
          <RegionBox
            region1={region1}
            handleRegion1={handleRegion1}
            handleRegion2={handleRegion2}
          />
        </FilterWrap>
        <span className="ordergroup">
          <span
            className={CurrentOrder === '최신순' ? 'setbold first' : 'first'}
            onClick={latestBtn}
          >
            용병모집
          </span>
          |
          <span
            className={CurrentOrder === '조회순' ? 'setbold second' : 'second'}
            onClick={viewBtn}
          >
            경기제안
          </span>
        </span>
        <div className="dropBox"></div>
      </MatchSoonFilter>
      <MatchSoonList>
        <div className="matchCard">
          {listData &&
            listData.map((member, idx) => {
            return <MatchCard setListData={setListData} member={member} key={idx} />
})}
        </div>
        <button onClick={handleOffset}>더보기 </button>
      </MatchSoonList>
    </FutsalMatchSoonSection>
  )
}

// const MatchList = styled.div`

// `

const FutsalMatchSoonSection = styled.section`
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 60px 0px 50px 0px;
  margin: 100px auto;
`

const MatchSoonTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  .matchSoon_title {
    font-size: 3rem;
  }
`

const MatchSoonFilter = styled.div`
  margin-bottom: 20px;
`

const MatchSoonList = styled.div`
  display: flex;
  position: relative;

  .matchCard {
    display: grid;
    grid-template-columns: repeat(3, 31.8%);
    row-gap: 20px;
    /* margin-bottom: 20px; */
  }

  .moreView {
    position: flex;
    right: -15px;
    bottom: 0px;
    display: flex;
  }
`

const DateWrap = styled.div`
  display: flex;
`
const CalendarWrap = styled.div`
  margin-right: 23px;
`

const TimeWrap = styled.div``

const FilterWrap = styled.div`
  justify-content: space-between;
  display: flex;
  margin-bottom: 30px;
`
export default MatchList
