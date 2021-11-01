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

const MatchList = () => {
  const Newdate = new Date()
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(1)
  const [CurrentOrder, setCurrentOrder] = useState('member')
  const [memberData, setMemberData] = useState(null)
  const [date, setDate] = useState(Newdate)
  const [startDate, setStartDate] = useState(Newdate)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [region1, setRegion1] = useState('')
  const [region2, setRegion2] = useState('')

  // 더보기 버튼
  const handleOffset = async () => {
    let offsetNum = offset + 1
    setOffset(offsetNum)
  }

  // 캘린더 컴포넌트 날짜 value 가져오기
  const handledate = (date) => {
    setStartDate(date)
  }

  // start, end 셀렉트 박스 컴포넌트 value 가져오기
  const handleStartHour = (e) => {
    setStartTime(e.target.value)
  }
  const handleEndHour = (e) => {
    setEndTime(e.target.value)
  }

  const handleRegion1 = (e) => {
    setRegion1(e.target.value)
  }
  const handleRegion2 = (e) => {
    setRegion2(e.target.value)
  }

  const latestBtn = () => {
    setCurrentOrder('member')
  }

  const viewBtn = () => {
    setCurrentOrder('match')
  }

  // match 버튼 눌렀을 때 첫 매치리스트 세팅
  useEffect(() => {
    dispatch(getMatchListData(offset, CurrentOrder, date))
      .then((res) => {
        setMemberData(res.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [offset])

  // sort 값에 따른 매치 리스트 세팅
  useEffect(() => {
    dispatch(
      sortedMatchListData(offset, startTime, endTime, CurrentOrder, startDate)
    )
      .then((res) => {
        setMemberData(res.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [offset, startTime, endTime, CurrentOrder, startDate])

  return (
    <FutsalMatchSoonSection>
      <MatchSoonTitle>
        <div className="matchSoon_title">Match</div>
      </MatchSoonTitle>
      <MatchSoonFilter>
        <RegionBox
          region1={region1}
          handleRegion1={handleRegion1}
          handleRegion2={handleRegion2}
        />
        <SelectBox
          handleStartHour={handleStartHour}
          handleEndHour={handleEndHour}
        />
        <Calendar handledate={handledate} startDate={startDate} />
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
          {memberData &&
            memberData.map((member, idx) => (
              <MatchCard
                setMemberData={setMemberData}
                member={member}
                key={idx}
              />
            ))}
        </div>
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
  margin-bottom: 100px;
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
export default MatchList
