import React from 'react'
import GlobalStyle from '../globalStyle/globalStyle'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


function MatchCard({ member, setMemberData }) {
  const matchInfoHadler = () => {
    setMemberData(member)
  }

  return (
    <>
      <GlobalStyle />
      <MatchCardContainer>
              <div 
              className="articlebox-listbox"
              onClick={() => matchInfoHadler()}
              >
                <Link to="/entrance" style={{ textDecoration: 'none' }}>
                  <ul>
                    <li className="articlebox-title">{member.title}</li>
                    <li className="articlebox-date">
                      {member.startTime} ~ {member.endTime}
                    </li>
                    <li className="articlebox-ground">{member.placeName}</li>
                    <li className="articlebox-content">
                      {member.content}
                    </li>
                    <li>
                      <span className="articlebox-state">
                        <span>{member.status}</span>
                      </span>
                    </li>
                  </ul>
                </Link>
              </div>
      </MatchCardContainer>
    </>
  )
}

const MatchCardContainer = styled.div`
z-index: 10;
  .articlebox {
    &-listbox {
      background-color: white;
      border: 1px solid #747474;
      border-radius: 5px;
      cursor: pointer;
      display: inline-block;
      width: 300px;
      justify-content: center;
      height: 280px;
      margin-bottom: 20px;
      margin-right: 20px;
      padding: 20px;
      position: relative;
      transition: all 0.5s;

      ul {
        height: 100%;
        width: 100%;
      }

      :hover {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
      }
    }

    &-title {
      font-weight: bold;
      font-size: 1.3rem;
      margin: 20px auto 10px auto;
      padding: 0px 0px 10px 0px;
      border-bottom: 1px solid gray;
      color: #353535;
    }

    &-date {
      font-size: 1rem;
      margin-bottom: 4px;
      color: #747474;
      padding: 0px 0px 0px 0px;
    }

    &-ground {
      font-size: 0.9rem;
      margin: 10px auto 20px;
      color: #747474;
      padding: 0px 0px 10px 0px;
    }

    &-content {
      margin-bottom: 40px;
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: #353535;
    }

    &-state {
      border: 1px solid gray;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 2px 15px 2px 15px;
      color: #353535;
      position: absolute;
      right: 24px;
      margin: 0 !important;
    }
  }
`

export default MatchCard
