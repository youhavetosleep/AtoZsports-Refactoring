import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import store from '../store/store'
import { useHistory } from 'react-router'

function MatchCard({ member, isLogin }) {
  const history = useHistory()
  let userInfo = store.getState().user
  // console.log(isLogin)

  const matchInfoHadler = () => {
    if(!isLogin){
      Swal.fire({
        text: '로그인이 필요한 서비스 입니다!',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인'
      })
      return
    }else{
    history.push(`/post/id=${member.id}`)
    window.location.reload()
  }
}

  // console.log(member.notReadMessage)

  return (
    <>{member.notReadMessage === undefined ? (
      <MatchCardContainer>
        <div 
        className="matchCard-listbox" 
        onClick={() => matchInfoHadler()}>
          <ul>
            <li className="matchCard-title">{member.title}</li>
            <li className="matchCard-date">
              {member.startTime.slice(0, 10)}&nbsp;
              {member.startTime.slice(11, 16)}&nbsp; ~ &nbsp;
              {member.endTime.slice(0, 10)}&nbsp;
              {member.endTime.slice(11, 16)}
            </li>
            <li className="matchCard-ground">{member.placeName}</li>
            <li className="matchCard-content">{member.content}</li>
            <li></li>
          </ul>
          <span className="matchCard-state">
            <span className={member.status === '모집중' ? 'progress' : 'end'}>
              {member.status}
            </span>
          </span>
        </div>
      </MatchCardContainer>
    ) : (
      <MatchCardContainer>
        <div 
        className="matchCard-listbox" 
        onClick={() => matchInfoHadler()}>
          <ul>
            <li className="matchCard-title">{member.title}</li>
            <li className=
            {member.notReadMessage === 0 && !member.notReadMessage? 
              "matchCard-ReadMsg"
            :
            "matchCard-notReadMsg"
            }>{member.notReadMessage}</li>
            <li className="matchCard-date">
              {member.startTime.slice(0, 10)}&nbsp;
              {member.startTime.slice(11, 16)}&nbsp; ~ &nbsp;
              {member.endTime.slice(0, 10)}&nbsp;
              {member.endTime.slice(11, 16)}
            </li>
            <li className="matchCard-ground">{member.placeName}</li>
            <li className="matchCard-content">{member.content}</li>
            <li></li>
          </ul>
          <div className="matchCard-sports"># {member.sports}</div>
          <span className="matchCard-state">
            <span className={member.status === '모집중' ? 'progress' : 'end'}>
              {member.status}
            </span>
          </span>
        </div>
      </MatchCardContainer>
    )}
      
    </>
  )
}

const MatchCardContainer = styled.div`
  /* z-index: 10; */
  @media screen and (max-width: 767px) {
        width: 100%;
  }
 
  .matchCard {
  
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
      @media screen and (max-width: 767px) {
        width: auto;
        height: auto;
  }

      ul {
        height: 100%;
        width: 100%;
        @media screen and (max-width: 767px) {
        width: calc(100% - 5px);
        height: auto;
  }
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

    &-ReadMsg {
      position: absolute;
      right: 110px;
      bottom: 25px;
      width: 20px;
      height: 15px;
      text-align: center;
      font-weight: bold;
      padding: 5px 1px 3px 2px;
      border-radius: 15px;
      color: #fafafa;
      background-color: white;
    }

    &-notReadMsg {
      position: absolute;
      right: 110px;
      bottom: 25px;
      width: 20px;
      height: 15px;
      text-align: center;
      font-weight: bold;
      padding: 5px 1px 3px 2px;
      border-radius: 15px;
      color: #fafafa;
      background-color: #890909;
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
    
    &-sports {
      position: absolute;
      bottom: 25px;
      left: 30px;
      font-size: 1.3rem;
      color: #747474;
    }

    &-state {
      border-radius: 10px;
      font-size: 0.8rem;
      color: #353535;
      position: absolute;
      right: 24px;
      bottom: 30px;
      margin: 0 !important;
      .progress {
        border: 1px solid #840909;
        color: #840909;
        border-radius: 13px;
        padding: 4px 20px 4px 20px;
      }
      .end {
        color: #353535;
        background-color: #c4c4c4;
        border-radius: 13px;
        padding: 5px 15px 5px 15px;
      }
    }
  }
`

export default MatchCard
