import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { FaChevronDown } from 'react-icons/fa'
import moment from 'moment'

import MatchCard from '../components/matchCard'
import { getMatchListData, sortedMatchListData } from '../_actions/post_action'
import Calendar from '../utils/calendar'
import SelectBox from '../utils/selectBox'
import RegionBox from '../utils/regionBox'
import Navbar from '../components/navbar'

const MatchList = ({ isLogin, setIsLogin, region1, region2, setEditPost }) => {
  // 날짜변환
  const changeDate = (date) => {
    return date.toISOString().split('T')[0]
  }
  // moment 로 붙혔음
  // 안붙혔을 때도 정상작동
  let setFirst = region1
  let setSecond = region2

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
  const [sort1, setSort1] = useState(setFirst)
  const [sort2, setSort2] = useState(setSecond)
  // 더보기 버튼
  const handleOffset = async () => {
    let offsetNum = offset + 1
    setOffset(offsetNum)
  }

  const handleSort1 = (e) => {
    setSort1(e.target.value)
  }
  const handleSort2 = (e) => {
    setSort2(e.target.value)
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

  const matchInfoHadler = () => {
    if (!isLogin) {
      Swal.fire({
        text: '로그인이 필요한 서비스 입니다!',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인'
      })
      return
    } else {
      history.push('/write')
    }
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
        sort1,
        sort2
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
        sort1,
        sort2
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
  }, [sort2, startTime, endTime, CurrentOrder, startDate])

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
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
            <RegionWrap>
              <RegionBox
                region1={region1}
                handleRegion1={handleSort1}
                handleRegion2={handleSort2}
              />
            </RegionWrap>
          </FilterWrap1>
          <FilterWrap2>
            <span className="ordergroup">
              <span
                className={
                  CurrentOrder === 'member' ? 'setbold first' : 'first'
                }
                onClick={latestBtn}
              >
                용병모집
              </span>
              |
              <span
                className={
                  CurrentOrder === 'match' ? 'setbold second' : 'second'
                }
                onClick={viewBtn}
              >
                경기제안
              </span>
            </span>
            <WriteBtn
              onClick={() => {
                matchInfoHadler()
                setEditPost(false)
              }}
            >
              글 작성
            </WriteBtn>
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
                    isLogin={isLogin}
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
    </>
  )
}

const FutsalMatchSoonSection = styled.section`
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 0px 0px 50px 0px;
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
  }
`

const MatchSoonTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  .matchSoon_title {
    font-size: 3rem;
    @media screen and (max-width: 767px) {
      font-size: 2rem;
    }
  }
`

const MatchSoonFilter = styled.div`
  margin-bottom: 10px;
`

const MatchSoonList = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 1110px) {
    justify-content: center;
  }
  .all_MatchCard {
    display: grid;
    grid-template-columns: repeat(3, 360px);
    row-gap: 20px;
    column-gap: 24px;
    @media screen and (max-width: 1110px) {
      display: grid;
      grid-template-columns: repeat(2, 350px);
      row-gap: 0px;
      column-gap: 24px;
    }
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: repeat(1, 350px);
      row-gap: 0px;
      column-gap: 24px;
    }
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
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`

const RegionWrap = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
`

const CalendarWrap = styled.div`
  margin-right: 23px;
  position: relative;
  @media screen and (max-width: 767px) {
    margin-right: 24px;
    right: -17px;
  }
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
  @media screen and (max-width: 1110px) {
    width: 710px;
    margin: 10px auto;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
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
    padding: 5px 10px;
    box-sizing: border-box;
    position: flex;
    text-align: left;
    margin: auto 0;
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
  @media screen and (max-width: 1110px) {
    width: 700px;
    margin: 0 auto;
  }
  @media screen and (max-width: 767px) {
    width: 350px;
    margin: 0 auto;
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
  border: 1px solid #6f6f6f;
  color: #6f6f6f;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: inherit;
  border-radius: 5px;
  font-size: 1.2rem;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    margin-right: 12px;
  }
`

const AlertMessage = styled.h1`
  margin: 100px auto;
  font-size: 30px;
  text-align: center;
  justify-content: center;
`

export default MatchList
