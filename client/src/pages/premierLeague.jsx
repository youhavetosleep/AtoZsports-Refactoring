import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import instance from '../api'
import premier from '../image/premier_league.png'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

const PremierLeague = ({ isLogin, setIsLogin }) => {
  const nowData = new Date()
  const year = nowData.getFullYear()
  const [matches, setMatches] = useState([])
  useEffect(() => {
    showResult()
  }, [])

  const showResult = () => {
    instance
      .get('/epl/result', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        const { data } = res
        const list = data.map((el) => {
          const { stadium, homeTeam, awayTeam } = el
          const homeScore = String(el.homeScore)
          const awayScore = String(el.awayScore)
          const time = changeDate(el.time)
          return { time, stadium, homeTeam, awayTeam, homeScore, awayScore }
        })
        setMatches(list)
      })
  }

  const showMatch = () => {
    instance
      .get('/epl/match', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        const { data } = res
        const list = data.map((el) => {
          const { stadium, homeTeam, awayTeam } = el
          const time = changeDate(el.time)
          return { time, stadium, homeTeam, awayTeam }
        })
        setMatches(list)
      })
  }

  const changeDate = (time) => {
    const timeStr = time.split(' ')
    const year = timeStr[3]
    const monthStr = timeStr[1]
    let monthInt
    switch (monthStr) {
      case 'Jan':
        monthInt = '01'
        break
      case 'Feb':
        monthInt = '02'
        break
      case 'Mar':
        monthInt = '03'
        break
      case 'Apr':
        monthInt = '04'
        break
      case 'May':
        monthInt = '05'
        break
      case 'Jun':
        monthInt = '06'
        break
      case 'Jul':
        monthInt = '07'
        break
      case 'Aug':
        monthInt = '08'
        break
      case 'Sep':
        monthInt = '09'
        break
      case 'Oct':
        monthInt = '10'
        break
      case 'Nov':
        monthInt = '11'
        break
      case 'Dec':
        monthInt = '12'
        break
      default:
        break
    }
    const day = timeStr[2]
    const hm = timeStr[4]
    const koreaTime = new Date(`${year}-${monthInt}-${day}T${hm}:00.000Z`)
    koreaTime.setHours(koreaTime.getHours() + 8)
    const month = koreaTime.toDateString().split(' ')[0]
    const mmdd = koreaTime.toLocaleDateString().slice(6)
    const hhmm = koreaTime.toISOString().split('T')[1].split(':')
    return `${mmdd} ${month} ${hhmm[0]}:${hhmm[1]}`
  }

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <LeagueContainer>
        <LeagueIn>
          <LeagueLogo>
            <img src={premier} alt="premier" className="league_logo" />
          </LeagueLogo>
          <LeagueList>
            <div className="league_year">{year}</div>
          </LeagueList>
          <ButtonWrap>
            <Button onClick={showResult}>경기 결과</Button>|
            <Button onClick={showMatch}>경기 일정</Button>
          </ButtonWrap>
          {matches.map((match) => {
            return (
              <>
                <Match>
                  <MatchTime>{match.time}</MatchTime>
                  <Stadium>{match.stadium}</Stadium>
                  <TeamWrap>
                    <HomeTeam>{match.homeTeam}</HomeTeam>
                    {match.homeScore ? (
                      <>
                        <Score>
                          {match.homeScore} : {match.awayScore}
                        </Score>
                      </>
                    ) : (
                      <>
                        <Score>vs</Score>
                      </>
                    )}
                    <AwayTeam>{match.awayTeam}</AwayTeam>
                  </TeamWrap>
                </Match>
              </>
            )
          })}
        </LeagueIn>
      </LeagueContainer>
      <Footer />
    </>
  )
}

const LeagueContainer = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const LeagueIn = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  margin: 0px auto 0px auto;
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const LeagueLogo = styled.div`
  display: flex;
  .league_logo {
    width: 600px;
    @media screen and (max-width: 767px) {
    width: 100%;
  }
  }
`

const LeagueList = styled.div`
  display: flex;
  max-width: 700px;
  width: 80%;
  margin: 0px auto 30px auto;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid black;
  @media screen and (max-width: 767px) {
    width: 85%;
  }
  .league_year {
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
    margin: 0px auto 30px auto;
    @media screen and (max-width: 767px) {
    width: 100%;
  }
  }
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 30%;
  margin: 10px 0px 10px 0px;
  @media screen and (max-width: 767px) {
    width: 50%;
  }
`

const Button = styled.div`
  width: 100px;
  text-align: center;
  border-radius: 5px;
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
  :active {
    font-weight: bold;
    color: #890909;
  }
`

const Match = styled.div`
  border-top: 1px solid #cbc8c8;
  padding: 20px;
  width: 600px;
  margin: 30px 0 30px 0;
`

const MatchTime = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 7px;
`

const Stadium = styled.div`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-bottom: 20px;
`

const TeamWrap = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    margin: 10px auto 0px auto;
    width: 50%;
  }
`

const HomeTeam = styled.div`
  position: absolute;
  left: 0;
  @media screen and (max-width: 767px) {
    width: 20%;
    text-align: center;
  }
`

const Score = styled.div`
  position: absolute;
  margin: 30px 0px 10px 0px;
  font-size: 16px;
`

const AwayTeam = styled.div`
  position: absolute;
  right: 0;
  @media screen and (max-width: 767px) {
    width: 20%;
    text-align: center;
  }
`

export default PremierLeague
