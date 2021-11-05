import React from 'react'
import styled from 'styled-components'
import sublogo from '../image/subLogo.png'

const LogoCard = () => {
  return (
    <>
      <MoreViewCardContainer>
        <div className="articlebox-listbox">
          <ul>
            <img src={sublogo} alt="sublogo" className="moreCard-logo" />
          </ul>
        </div>
      </MoreViewCardContainer>
    </>
  )
}

const MoreViewCardContainer = styled.div`
  .moreCard-logo {
    margin: 24% 0px 0px 26%;
    width: 130px;
    opacity: 0.5;
  }

  .articlebox {
    &-listbox {
      background-color: white;
      border: 1px solid #747474;
      border-radius: 5px;
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
    }

    &-state {
      /* border: 1px solid gray;
    border-radius: 10px; */
      width: 50%;
      font-size: 1rem;
      margin: 0px 50px 0px 30px;
      padding: 2px 80px 2px 15px;
      color: #353535;
      position: absolute;
      right: 24px;
      margin: 0 !important;
    }
  }
`

export default LogoCard
