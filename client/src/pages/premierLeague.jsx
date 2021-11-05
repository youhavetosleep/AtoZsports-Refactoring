import React from 'react'
import styled from 'styled-components'
import premier from '../image/premier_league.png'
import Footer from '../components/footer'

const PremierLeague = () => {

  const nowData = new Date()
  const year = nowData.getFullYear()

  return (
    <>
      <LeagueContainer>
        <LeagueIn>
          <LeagueLogo>
            <img src={premier} alt="premier" className='league_logo' />
          </LeagueLogo>
          <LeagueList>
            <div className='league_year'>{year}</div>
          </LeagueList>
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
.league_logo{
  width: 600px;
}
`

const LeagueList = styled.div`
display: flex;
width: 510px;
border-bottom: 1px solid black;
margin: 0px 0px 30px 0px;
padding: 0px 0px 10px 0px;
justify-content: center;

.league_year {
  font-size: 1.8rem;
  text-align: center;
}
`

export default PremierLeague
