import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/footer'
import MatchCard from '../components/matchCard'
import GlobalStyle from '../globalStyle/globalStyle'
import EditPasswordModal from '../modal/editPasswordModal'
import {
  getUserFavoriteData,
  getUserMatchData
} from '../_actions/matchCard_action'
import { deleteUser, mypageUser } from '../_actions/user.action'
import instance from '../api/index.jsx'

const Mypage = ({ userInfo }) => {
  const dispatch = useDispatch()
  
  const Token = userInfo.loginSuccess.accessToken
  const userInfoSuccess = userInfo.loginSuccess
  // console.log(userInfoSuccess)
  
  const [changeCard, setChangeCard] = useState('작성한 공고')
  const [writeData, setWriteData] = useState([])
  const [favoriteData, setFavoriteData] = useState([])
  const [editeInfo, setEditInfo] = useState(false)
  const [editPswordModal, setEditPswordModal] = useState(false)
  const [YesOrNo, setYesOrNo] = useState(false)
  const [editUserInfo, setEditUserInfo] = useState({})
  const [mypageInfo, setMypageInfo] = useState(userInfoSuccess)
  const [nickCheck, setNickCheck] = useState(false)
  const [messageNickname, setMessageNickname] = useState('')
  const [nickname, setNickname] = useState('')
  
  
  // (nickname) 한글, 영문, 숫자만 가능하며 2-10자리까지
  const nickname_Reg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

  useEffect(() => {
    dispatch(getUserMatchData(Token)).then((res) => {
      setWriteData(res.payload.data.postList)
    })
  }, [setWriteData])

  useEffect(() => {
    dispatch(getUserFavoriteData(Token)).then((res) => {
      setFavoriteData(res.payload.data)
    })
  }, [setFavoriteData])

  const matchBtn = () => {
    setChangeCard('관심 공고')
  }

  const memberBtn = () => {
    setChangeCard('작성한 공고')
  }

  const handleEditPage = () => {
    setEditInfo(true)
  }

  const handleSendUserinfo = () => {
    if(messageNickname === '✔ 사용 가능한 닉네임입니다'){
    dispatch(mypageUser(editUserInfo, Token))
    .then((res) => {
      setMypageInfo(res.payload.userData)
      // console.log(res.payload.userData)
    })
    setEditInfo(false)
  } else {
    return;
  }
}

  // 닉네임 확인
  const checkNickname = async () => {
    if (!nickname_Reg.test(nickname)) {
      setNickCheck(false)
      setMessageNickname('(2-10자) 한글, 영문, 숫자만 가능합니다')
      return
    } else {
      await instance
        .post(
          '/users/nick-check',
          {
            nickname
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        )
        .then((res) => {
          setMessageNickname(res.data.message)
          // console.log(res.data.message)
          if (res.data.message === '✔ 사용 가능한 닉네임입니다') {
            setNickCheck(true)
            return
          }else {
            setNickCheck(false)
          }
        })
    }
  }

  const handleEditPasswordBtn = () => {
    setEditPswordModal(true)
  }

  const handelCancelBtn = () => {
    setEditInfo(false)
  }

  const withdrawal = () => {
    if (YesOrNo) {
      return dispatch(deleteUser(Token))
        .then((res) => (window.location.href = '/'))
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const changeUserInfo = (e) => {
    setEditUserInfo({
      email: userInfo.loginSuccess.email,
      userPhone: userInfo.loginSuccess.userPhone,
      nickname: e.target.value,
      homeground: userInfo.loginSuccess.homeground,
      favoriteSports: userInfo.loginSuccess.favoriteSports,
      userId: userInfo.loginSuccess.id
    })
    setNickname(e.target.value)
  }
  

  return (
    <>
      <GlobalStyle />
      <MypageContainer>
        <MypageIn>
          {editPswordModal ? (
            <EditPasswordModal 
            setEditPswordModal={setEditPswordModal} 
            token={Token}
            />
          ) : null}
          {!editeInfo ? (
            <MypageUserInfo>
              <div className="mypage_title">마이페이지</div>
              <UserInfo>
                <UserInfoContents>
                  <Userinfo_email>
                    <div className="userinfo_emailTitle">이메일</div>
                    <div className="userinfo_emailContents">
                      {mypageInfo.email}
                    </div>
                  </Userinfo_email>
                  <Uuserinfo_phone>
                    <div className="userinfo_phoneTitle">핸드폰</div>
                    <div className="userinfo_phoneContents">
                      {mypageInfo.userPhone}
                    </div>
                  </Uuserinfo_phone>
                  <Userinfo_nickname>
                    <div className="userinfo_nicknameTitle">닉네임</div>
                    <div className="userinfo_nicknameContents">
                      {mypageInfo.nickname}
                    </div>
                  </Userinfo_nickname>
                  <Userinfo_homeground>
                    <div className="userinfo_homegroundTitle">우리동네</div>
                    <div className="userinfo_homegroundContents">
                      {mypageInfo.homeground}
                    </div>
                  </Userinfo_homeground>
                  <Userinfo_favorite>
                    <div className="userinfo_favoriteTitle">
                      좋아하는 스포츠
                    </div>
                    <div className="userinfo_favorite">
                      {mypageInfo.favoriteSports}
                    </div>
                  </Userinfo_favorite>
                </UserInfoContents>
                <EditUserInfo>
                  <div
                    className="editInfo"
                    onClick={handleEditPage}
                  >
                    정보수정
                  </div>
                  <div className="editPassWord" onClick={handleEditPasswordBtn}>
                    비밀번호 변경
                  </div>
                </EditUserInfo>
              </UserInfo>
            </MypageUserInfo>
          ) : (
            <MypageUserInfo>
              <div className="mypage_title">개인정보 변경</div>
              <UserInfo>
                <UserInfoContents>
                  <Userinfo_email>
                    <div className="userinfo_emailTitle">이메일</div>
                    <input
                      type="text"
                      className="editinfo_emailContents"
                      value={mypageInfo.email}
                      disabled
                    />
                  </Userinfo_email>
                  <Uuserinfo_phone>
                    <div className="userinfo_phoneTitle">핸드폰</div>
                    <input
                      type="text"
                      className="editinfo_phoneContents"
                      value={mypageInfo.userPhone}
                      disabled
                    />
                  </Uuserinfo_phone>
                  <Userinfo_nickname>
                    <div className="userinfo_nicknameTitle">닉네임</div>
                    <input
                      type="text"
                      className="editinfo_nicknameContents"
                      placeholder={mypageInfo.nickname}
                      onChange={(e) => changeUserInfo(e)}
                      onBlur={checkNickname}
                    />
                      {nickCheck ? (
                         <PassCheck>{messageNickname}</PassCheck>
                          ) : (
                        <Check>{messageNickname}</Check>
                      )}
                  </Userinfo_nickname>
                  <Userinfo_homeground>
                    <div className="userinfo_homegroundTitle">우리동네</div>
                    <input
                      type="text"
                      className="editinfo_homegroundContents"
                      value={mypageInfo.homeground}
                      disabled
                    />
                  </Userinfo_homeground>
                  <Userinfo_favorite>
                    <div className="userinfo_favoriteTitle">
                      좋아하는 스포츠
                    </div>
                    <input
                      type="text"
                      className="editinfo_favorite"
                      value={mypageInfo.favoriteSports}
                      disabled
                    />
                  </Userinfo_favorite>
                </UserInfoContents>
                <EditUserInfo>
                  <div 
                  className="sendEditInfo" 
                  onClick={handleSendUserinfo}
                  >
                    Send
                  </div>
                  <div 
                  className="cancelEdit" 
                  onClick={handelCancelBtn}
                  >
                    Cancel
                  </div>
                </EditUserInfo>
              </UserInfo>
            </MypageUserInfo>
          )}
          <MyCard>
            <ChoiceState>
              <span className="ordergroup">
                <span
                  className={
                    changeCard === '작성한 공고' ? 'setbold first' : 'first'
                  }
                  onClick={memberBtn}
                >
                  작성한 공고
                </span>
                |
                <span
                  className={
                    changeCard === '관심 공고' ? 'setbold second' : 'second'
                  }
                  onClick={matchBtn}
                >
                  관심공고
                </span>
              </span>
            </ChoiceState>
            <div className="writeORfavorite">
              {changeCard === '작성한 공고'
                ? writeData &&
                  writeData.map((member, idx) => {
                    return <MatchCard member={member} key={idx} />
                  })
                : favoriteData &&
                  favoriteData.map((member, idx) => {
                    return <MatchCard member={member} key={idx} />
                  })}
            </div>
            {changeCard === '작성한 공고' && writeData === undefined ? (
              <div className="mypage_Match">작성한 공고가 없습니다.</div>
            ) : null}
            {changeCard === '관심 공고' && favoriteData === undefined ? (
              <div className="mypage_Match">관심등록한 공고가 없습니다.</div>
            ) : null}
          </MyCard>
          <GoodbyeUser>
            <div
              className="PleaseDontgo"
              onClick={(e) => {
                withdrawal()
                setYesOrNo(true)
              }}
            >
              회원탈퇴
            </div>
          </GoodbyeUser>
        </MypageIn>
      </MypageContainer>
      <Footer />
    </>
  )
}

const MypageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: left;
`

const MypageIn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MypageUserInfo = styled.section`
  max-width: 800px;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: left;
  padding: 0px 0px 0px 0px;
  margin: 50px auto 0px auto;

  .mypage_title {
    font-size: 2rem;
    margin-left: 40px;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 10px 0px 0px 0px;
  padding: 60px 0px 0px 30px;
`

const UserInfoContents = styled.div`
  display: flex;
  width: 300%;
  flex-direction: column;
  font-size: 20px;
  margin-left: 15px;
`

const Userinfo_email = styled.div`
  display: flex;
  width: 70%;

  margin: 0px 0px 0px 0px;
  padding: 0px 0px 20px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  .userinfo_emailTitle {
    color: #565656;
  }
  .userinfo_emailContents {
    margin: 0px 0px 0px 127px;
  }
  .editinfo_emailContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
  }
`

const Uuserinfo_phone = styled.div`
  display: flex;
  width: 70%;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  .userinfo_phoneTitle {
    color: #565656;
  }
  .userinfo_phoneContents {
    margin: 0px 0px 0px 127px;
  }
  .editinfo_phoneContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
  }
`

const Userinfo_nickname = styled.div`
  display: flex;
  width: 70%;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  .userinfo_nicknameTitle {
    color: #565656;
  }
  .userinfo_nicknameContents {
    margin: 0px 0px 0px 127px;
  }
  .editinfo_nicknameContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    :focus {
      outline-color: #840909;
    }
  }
`

const Userinfo_homeground = styled.div`
  display: flex;
  width: 70%;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  .userinfo_homegroundTitle {
    color: #565656;
  }
  .userinfo_homegroundContents {
    margin: 0px 0px 0px 110px;
  }
  .editinfo_homegroundContents {
    margin: 0px 0px 0px 115px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
  }
`

const Userinfo_favorite = styled.div`
  display: flex;
  width: 70%;
  margin: 40px 0px 50px 0px;
  font-size: 1rem;
  .userinfo_favoriteTitle {
    color: #565656;
  }
  .userinfo_favorite {
    margin: 0px 0px 0px 65px;
  }
  .editinfo_favorite {
    margin: 0px 0px 0px 68px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
  }
`

const EditUserInfo = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  text-align: right;
  color: #565656;
  margin-right: 50px;
  .editInfo {
    :hover {
      cursor: pointer;
      color: #840909;
    }
  }
  .editPassWord {
    margin-top: 10px;
    :hover {
      cursor: pointer;
      color: #840909;
    }
  }
  .sendEditInfo {
    display: flex;
    position: absolute;
    justify-content: right;
    font-size: 1.4rem;
    margin-bottom: 30px;
    bottom: 10px;
    right: 30px;
    border-bottom: 1px solid black;
    :hover {
      cursor: pointer;
      border-bottom: 1px solid #840909;
      color: #840909;
    }
  }
  .cancelEdit {
    display: flex;
    position: absolute;
    justify-content: right;
    font-size: 1.4rem;
    margin-bottom: 30px;
    bottom: 10px;
    right: 100px;
    border-bottom: 1px solid black;
    :hover {
      cursor: pointer;
      border-bottom: 1px solid #840909;
      color: #840909;
    }
  }
`
const Check = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #840909;
`

const PassCheck = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #1b7e07;
`

const ChoiceState = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  margin: 40px 0px 0px 0px;
  .myMercenary {
    margin-right: 10px;
  }
  .letsGame {
    margin-left: 10px;
  }
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

const MyCard = styled.section`
  display: grid;
  position: relative;
  /* flex-direction: column; */
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px 0px 0px 20px;
  .writeORfavorite {
    display: grid;
    grid-template-columns: repeat(2, 360px);
    row-gap: 20px;
    column-gap: 24px;
    margin: 20px 0px 0px 0px;
  }
  .mypage_Match {
    display: flex;
    width: auto;
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
    margin: 150px auto 168px auto;
  }
`

const MyRecruitment = styled.div`
  display: flex;
  margin: 30px 0px 30px 0px;
`

const MyAttention = styled.div`
  display: flex;
`
const GoodbyeUser = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 10px 0px 30px 0px;
  display: flex;
  justify-content: right;
  align-items: center;
  border-top: 1px solid black;
  .PleaseDontgo {
    width: 90px;
    height: 15px;
    padding: 8px 0px 3px 0px;
    font-size: 0.9rem;
    text-align: center;
    color: #840909;
    border: 2px solid #840909;
    border-radius: 15px;
    :hover {
      cursor: pointer;
      background-color: #840909;
      color: white;
    }
  }
`
export default Mypage
