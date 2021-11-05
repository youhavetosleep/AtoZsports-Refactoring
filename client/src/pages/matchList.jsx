import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { FaChevronDown } from 'react-icons/fa'
import moment from 'moment'

import MatchCard from '../components/matchCard'
import { getMatchListData, sortedMatchListData } from '../_actions/post_action'
import Calendar from '../utils/calendar'
import SelectBox from '../utils/selectBox'
import RegionBox from '../utils/regionBox'

const MatchList = ({ region1, region2, handleRegion1, handleRegion2 }) => {
  // 날짜변환
  const changeDate = (date) => {
    return date.toISOString().split('T')[0]
  }
  // moment 로 붙혔음
  // 안붙혔을 때도 정상작동
  const newdate = moment(new Date())
  const today = changeDate(newdate)
  const dispatch = useDispatch()
  const history = useHistory()

  const [offset, setOffset] = useState(1)
  const [CurrentOrder, setCurrentOrder] = useState('member')
  const [listData, setListData] = useState([])
  const [startDate, setStartDate] = useState(today)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [finMessage, setFinMessage] = useState('')

  // 더보기 버튼
  const handleOffset = async () => {
    let offsetNum = offset + 1
    setOffset(offsetNum)
  }

  // 캘린더 컴포넌트 날짜 value 가져오기
  const handledate = (date) => {
    let changeDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    setStartDate(changeDate)
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

  // match 버튼 눌렀을 때 첫 매치리스트 세팅
  useEffect(() => {
    dispatch(
      getMatchListData(
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
        if (res.payload.length !== 0) {
          if (res.payload.length < 6) {
            setFinMessage('fin.')
            setListData([...listData, ...res.payload])
          } else {
            setListData([...listData, ...res.payload])
          }
        } else if (res.payload.length === 0) {
          setFinMessage('fin.')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [offset])

  // sort 값에 따른 매치 리스트 세팅
  useEffect(() => {
    setFinMessage('더보기')
    setListData([])
    setOffset(1)
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
        if (res.payload.length < 6) {
          setFinMessage('fin.')
        }
        setListData([...res.payload])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [region2, startTime, endTime, CurrentOrder, startDate])

  return (
    <FutsalMatchSoonSection>
      <MatchSoonTitle>
        <div className="matchSoon_title">Match</div>
      </MatchSoonTitle>
      <MatchSoonFilter>
        <FilterWrap1>
          <DateWrap>
            <CalendarWrap>
              <Calendar
                className="Calender"
                handledate={handledate}
                startDate={startDate}
              />
              <DownWrap>
                <FaChevronDown />
              </DownWrap>
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
        </FilterWrap1>
        <FilterWrap2>
          <span className="ordergroup">
            <span
              className={CurrentOrder === 'member' ? 'setbold first' : 'first'}
              onClick={latestBtn}
            >
              용병모집
            </span>
            |
            <span
              className={CurrentOrder === 'match' ? 'setbold second' : 'second'}
              onClick={viewBtn}
            >
              경기제안
            </span>
          </span>
          <WriteBtn onClick={() => history.push('/write')}>글 작성</WriteBtn>
        </FilterWrap2>
      </MatchSoonFilter>
      <MatchSoonList>
        <div className="all_MatchCard">
          {listData &&
            listData.map((member, idx) => {
              return (
                <MatchCard
                  setListData={setListData}
                  member={member}
                  key={idx}
                />
              )
            })}
        </div>
      </MatchSoonList>
      {listData.length === 0 ? (
        <AlertMessage>
          게시글이 없습니다
          <br />
          <br /> 새로운 매치글을 작성해보세요!
        </AlertMessage>
      ) : null}
      <BtnWrap>
        <PlusBtn onClick={handleOffset}> {finMessage} </PlusBtn>
      </BtnWrap>
    </FutsalMatchSoonSection>
  )
}

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
  margin-bottom: 10px;
`

const MatchSoonList = styled.div`
  display: flex;
  position: relative;

  .all_MatchCard {
    display: grid;
    grid-template-columns: repeat(3, 360px);
    row-gap: 20px;
    column-gap: 24px;
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
  position: relative;
`

const DownWrap = styled.div`
  width: 0.1px;
  position: absolute;
  top: 27.5%;
  right: 15%;
  color: #000000;
  z-index: -1;
`

const TimeWrap = styled.div``

const FilterWrap1 = styled.div`
  justify-content: space-between;
  display: flex;
  margin-bottom: 30px;
`

const FilterWrap2 = styled.div`
  justify-content: space-between;
  display: flex;
  font-size: 20px;
  .setbold {
    font-weight: bolder;
  }
  .ordergroup {
    color: #353535;
    left: 0;
    position: flex;
    text-align: left;
    top: 100px;
    .first {
      margin-right: 20px;
      :hover {
        cursor: pointer;
      }
    }
    .second {
      margin-left: 20px;
      :hover {
        cursor: pointer;
      }
    }
  }
`

const BtnWrap = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
`

const PlusBtn = styled.button`
  margin: 0;
  box-sizing: border-box;
  padding: 5px 20px;
  background-color: white;
  border: 1px solid #cecece;
  border-radius: 10px;
`

const WriteBtn = styled.button`
  border: none;
  background-color: inherit;
  font-size: 1.2rem;
  :hover {
    cursor: pointer;
  }
`

const AlertMessage = styled.h1`
  margin: 100px auto;
  font-size: 30px;
  text-align: center;
  justify-content: center;
`

export default MatchList
