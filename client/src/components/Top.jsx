import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

function Top() {
  return (
    <TopContainer>
      <div className="top">
        <div onClick={() => window.scrollTo({ top: 0 })} className="top_circle">
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
    </TopContainer>
  )
}

const TopContainer = styled.div`
  .top {
    position: fixed;
    z-index: 900;
    bottom: 40px;
    right: 40px;
  }

  .top_circle {
    width: 50px;
    height: 50px;
    background-color: #747474;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    color: #fafafa;
  }

  .top_circle:hover {
    background-color: #840909;
    cursor: pointer;
  }
`

export default Top
