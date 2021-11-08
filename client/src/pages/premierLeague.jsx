import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import instance from '../api'
import premier from '../image/premier_league.png'
import Footer from '../components/footer'

const PremierLeague = () => {
  const nowData = new Date()
  const year = nowData.getFullYear()
  const [matches, setMatches] = useState([])

  useEffect(() => {
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
          const timeStr = el.time.split(' ')
          const year = timeStr[3]
          const monthStr = timeStr[1]
          let monthInt
          switch (monthStr) {
            case 'Jan':
              monthInt = '01'
              break;
            case 'Feb':
              monthInt = '02'
              break;
            case 'Mar':
              monthInt = '03'
              break;
            case 'Apr':
              monthInt = '04'
              break;
            case 'May':
              monthInt = '05'
              break;
            case 'Jun':
              monthInt = '06'
              break;
            case 'Jul':
              monthInt = '07'
              break;
            case 'Aug':
              monthInt = '08'
              break;
            case 'Sep':
              monthInt = '09'
              break;
            case 'Oct':
              monthInt = '10'
              break;
            case 'Nov':
              monthInt = '11'
              break;
            case 'Dec':
              monthInt = '12'
              break;
            default:
              break;
          }
          const day = timeStr[2]
          const hm = timeStr[4]
          const koreaTime = new Date(`${year}-${monthInt}-${day}T${hm}:00.000Z`)
          koreaTime.setHours(koreaTime.getHours() + 8)
          const month = koreaTime.toDateString().split(' ')[0]
          const mmdd = koreaTime.toLocaleDateString().slice(6)
          const hhmm = koreaTime.toISOString().split('T')[1].split(':')
          // const time = new Date().toISOString()
          const time = `${mmdd} ${month} ${hhmm[0]}:${hhmm[1]}`
          return { time, stadium, homeTeam, awayTeam }
        })
        setMatches(list)
      })
  }, [])

  return (
    <>
      <LeagueContainer>
        <LeagueIn>
          <LeagueLogo>
            <img src={premier} alt="premier" className="league_logo" />
          </LeagueLogo>
          <LeagueList>
            <div className="league_year">{year}</div>
          </LeagueList>
            {
              matches.map((match) => {
                return (
                  <>
                    <Match>
                      <MatchTime>{match.time}</MatchTime>
                      <Stadium>{match.stadium}</Stadium>
                      <HomeTeam>{match.homeTeam}</HomeTeam>
                      <Score>vs</Score>
                      <AwayTeam>{match.awayTeam}</AwayTeam>
                    </Match>
                  </>
                )
              })
            }
        </LeagueIn>
      </LeagueContainer>
      <Footer />
    </>
  )
}

const LeagueContainer = styled.div`
  display: flex;
  width: 100%;
`

const LeagueIn = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  margin: 0px auto 0px auto;
  width: 100%;
`

const LeagueLogo = styled.div`
  display: flex;
  .league_logo {
    width: 600px;
  }
`

const LeagueList = styled.div`
  display: flex;
  width: 510px;
  margin: 0px 0px 30px 0px;
  padding: 0px 0px 10px 0px;
  justify-content: center;
  border-bottom: 1px solid black;
  .league_year {
    font-size: 1.8rem;
    text-align: center;
  }
`

const Match = styled.div`
  border-bottom: 1px solid #cbc8c8;
  padding: 20px;
  width: 500px;
  margin-bottom: 20px;
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

const HomeTeam = styled.div`
  text-align: left;
`

const Score = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 16px;
`

const AwayTeam = styled.div`
  text-align: right;
`

export default PremierLeague
