import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/footer'
import MatchCard from '../components/matchCard'
import EditPasswordModal from '../modal/editPasswordModal'
import Swal from 'sweetalert2'
import {
  getUserFavoriteData,
  getUserMatchData
} from '../_actions/matchCard_action'
import {
  deleteUser,
  userChangePsword
} from '../_actions/user_action'
import instance from '../api/index.jsx'
import RegionBoxMypage from '../utils/regionBoxMypage'
import Navbar from '../components/navbar'

const Mypage = ({
  isLogin,
  setIsLogin,
  userInfo,
  region1,
  region2,
  handleRegion1,
  handleRegion2
}) => {
  const dispatch = useDispatch()
  const nicknameRef = useRef()
  const userPhoneRef = useRef()
  const favoriteRef = useRef()

  let Token = ''
  if (userInfo.loginSuccess) {
    Token = userInfo.loginSuccess.accessToken
  }

  let userInfoSuccess = ''
  if (userInfo.loginSuccess) {
    userInfoSuccess = userInfo.loginSuccess.userData
  }

  let userHomeground = ''
  if (userInfo.loginSuccess) {
    userHomeground = userInfo.loginSuccess.userData.homeground
  }

  // AccessToken
  // const Token = userInfo.loginSuccess.accessToken

  // UserInfo
  // const userInfoSuccess = userInfo.loginSuccess.userData
  // console.log('기존 사용자  =====> ', userInfoSuccess)

  // 개인정보 변경 관련
  const [editeInfo, setEditInfo] = useState(false)
  const [editUserInfo, setEditUserInfo] = useState({
    email: userInfoSuccess.email,
    userPhone: userInfoSuccess.userPhone,
    nickname: userInfoSuccess.nickname,
    homeground: userInfoSuccess.homeground,
    favoriteSports: userInfoSuccess.favoriteSports,
    userId: userInfoSuccess.id
  })

  const [phoneNumber, setPhoneNumber] = useState(editUserInfo.userPhone)
  const [nickname, setNickname] = useState(editUserInfo.nickname)
  const [favoriteSports, setFavoriteSports] = useState(
    editUserInfo.favoriteSports
  )

  // 사용자지역 도/시 변수 화
  const mainRegion = userHomeground.slice(0, 2) // 사용자 지역 - 도
  const subRegion = userHomeground.slice(3, 6) // 사용자 지역 - 시

  // UserInfo Check
  const [phoneCheck, setPhoneCheck] = useState(false)
  const [nickCheck, setNickCheck] = useState(false)
  const [messagePwCheck, setMessagePwChecks] = useState('')

  // 작성한 공고, 관심 공고
  const [changeCard, setChangeCard] = useState('작성한 공고')
  const [writeData, setWriteData] = useState([])
  const [favoriteData, setFavoriteData] = useState([])

  // Password Change
  const [editPsword, setEditPsword] = useState(false)
  const [firstPsword, setFirstPsword] = useState('')
  const [secondPsword, setSecondPsword] = useState('')
  const [editPswordModal, setEditPswordModal] = useState(false)
  const [messagePassword, setMessagePasswords] = useState('')
  const [pwColor, setPwColor] = useState(false)
  const [pwCheckColor, setPwCheckColor] = useState(false)

  // 입력한 값의 결과여부 표시
  const [messageNickname, setMessageNickname] = useState('')
  const [messageUserPhone, setMessageUserName] = useState('')
  const [YesOrNo, setYesOrNo] = useState(false)

  // console.log('editUserInfo ====> ', editUserInfo)

  // (nickname) 한글, 영문, 숫자만 가능하며 2-10자리까지
  const nickname_Reg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/
  const password_Reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
  const userPhone_Reg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/

  useEffect(() => {
    instance
      .get(`/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        withCredentials: true
      })
      .then((res) => {
        setEditUserInfo(res.data.userData)
        // console.log(res.data.userData)
      })
  }, [editeInfo])

  // 작성한공고, 모집공고 가져오기
  useEffect(async () => {
    await dispatch(getUserMatchData(Token)).then((res) => {
      setWriteData(res.payload)
    })
    await dispatch(getUserFavoriteData(Token)).then((res) => {
      setFavoriteData(res.payload)
    })
  }, [dispatch])

  const matchBtn = () => {
    setChangeCard('관심 공고')
  }

  const memberBtn = () => {
    setChangeCard('작성한 공고')
  }

  // 개인정보수정 칸을 여는기능
  const handleEditPage = () => {
    setEditInfo(true)
  }
  // 개인정보수정 칸을 닫는기능
  const handelCancelBtn = () => {
    setEditInfo(false)
  }
  // 비밀번호 수정 모달창을 여는기능
  const handleEditPasswordBtn = () => {
    setEditPswordModal(true)
  }

  const handleGotoReview = () => {
      Swal.fire({
        text: '생각해보니까 원래 비밀번호네요! 쏘리',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인'
      })
      return
  }

  // 핸드폰 번호 변경
  const changeUserPhoneNumber = (e) => {
    if (!userPhone_Reg.test(e.target.value)) {
      setPhoneNumber(e.target.value)
      setMessageUserName('- 을 포함한 번호를 입력해주세요')
      setPhoneCheck(false)
    } else if (userPhone_Reg.test(e.target.value)) {
      setPhoneNumber(e.target.value)
      setPhoneCheck(true)
      setMessageUserName('✔ 확인되었습니다.')
    }
  }

  // console.log('핸드폰번호 상태 ====> ', phoneNumber)

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
            nickname,
            curNickname: userInfoSuccess.nickname
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
          if (res.data.message === '✔ 사용 가능한 닉네임입니다') {
            setNickCheck(true)
            return
          } else {
            setNickCheck(false)
          }
        })
    }
  }

  // 닉네임 변경
  const changeUserNickname = (e) => {
    setNickname(e.target.value)
  }
  // console.log('닉네임 상태 ====> ', nickname)

  // 좋아하는 스포츠 변경
  const changeUserFavoriteSports = (e) => {
    setFavoriteSports(e.target.value)
  }
  // console.log('스포츠 상태 ====> ', nickname)

  // 개인정보 변경 send 버튼 클릭시 발생하는 이벤트
  const handleSendUserinfo = () => {
    instance
      .patch(
        `/users`,
        {
          nickname: nickname,
          userPhone: phoneNumber,
          homeground: `${region1} ${region2}`,
          favoriteSports: favoriteSports,
          userId: userInfoSuccess.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`
          },
          withCredentials: true
        }
      )
      .then((res) => {
        setEditInfo(false)
        window.location.reload()
      })
  }

  // 변경할 비밀번호 작성

  const checkPassword = () => {
    if (!password_Reg.test(firstPsword)) {
      setPwColor(false)
      setMessagePasswords('(최소 8자) 문자/숫자/특수문자 모두 포함해야합니다')
      return
    }
    setPwColor(true)
    setMessagePasswords('✔ 사용 가능한 비밀번호입니다')
  }

  // 비밀번호 확인
  const doubleCheckPassword = () => {
    if (firstPsword === secondPsword && password_Reg.test(secondPsword)) {
      setMessagePwChecks('✔ 비밀번호가 확인되었습니다')
      setPwCheckColor(true)
    } else {
      setMessagePwChecks('✔ 비밀번호가 일치하지 않습니다')
      setPwCheckColor(false)
    }
  }

  
  const handleChangePassword = () => {
    if (messagePwCheck === '✔ 비밀번호가 확인되었습니다') {
      dispatch(userChangePsword(secondPsword, Token))
      .then((res) => {
        let a = ''
        if (res.payload.response) {
          a = res.payload.response.data
        }
        if(a) {
          handleGotoReview()
        } else {
          setEditPsword(false)
          window.location.reload()
        }
      })
    }
  }

  // setYesOrNo(true)
  //   if (YesOrNo) {
  //     return dispatch(deleteUser(Token))
  //       .then((res) => (window.location.href = '/'))
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  // 회원탈퇴

    const withdrawal = () => {
      if (!YesOrNo) {
        Swal.fire({
          icon: 'warning',
          text: '정말 탈퇴하시겠습니까?',
          showConfirmButton: true,
          confirmButtonText: '확인',
          denyButtonColor: '#d2d2d2',
          showCancelButton: true,
          cancelButtonText: '취소'
        })
        .then((res) => {
          if(res.isConfirmed) {
            setYesOrNo(true)
            dispatch(deleteUser(Token))
            .then((res) => (window.location.href = '/'))
            .catch(err => console.log(err))
          } else {
            return
          }
        })
      }
    }


  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <MypageContainer>
        <MypageIn>
          {editPswordModal ? (
            <EditPasswordModal
              setEditPswordModal={setEditPswordModal}
              setEditPsword={setEditPsword}
              setMessagePasswords={setMessagePasswords}
              setMessagePwChecks={setMessagePwChecks}
              token={Token}
            />
          ) : null}
          {!editeInfo && !editPsword ? (
            <MypageUserInfo>
              <div className="mypage_title">마이페이지</div>
              <UserInfo>
                <UserInfoContents>
                  <UserinfoEmail>
                    <div className="userinfo_emailTitle">이메일</div>
                    <div className="userinfo_emailContents">
                      {editUserInfo.email}
                    </div>
                  </UserinfoEmail>
                  <UuserinfoPhone>
                    <div className="userinfo_phoneTitle">핸드폰</div>
                    <div className="userinfo_phoneContents">
                      {editUserInfo.userPhone}
                    </div>
                  </UuserinfoPhone>
                  <UserinfoNickname>
                    <div className="userinfo_nicknameTitle">닉네임</div>
                    <div className="userinfo_nicknameContents">
                      {editUserInfo.nickname}
                    </div>
                  </UserinfoNickname>
                  <UserinfoHomeground>
                    <div className="userinfo_homegroundTitle">우리동네</div>
                    <div className="userinfo_homegroundContents">
                      {editUserInfo.homeground}
                    </div>
                  </UserinfoHomeground>
                  <UserinfoFavorite>
                    <div className="userinfo_favoriteTitle">
                      좋아하는 스포츠
                    </div>
                    <div className="userinfo_favorite">
                      {editUserInfo.favoriteSports}
                    </div>
                  </UserinfoFavorite>
                </UserInfoContents>
                <EditUserInfo>
                  <div className="editInfo" onClick={handleEditPage}>
                    정보수정
                  </div>
                  <div className="editPassWord" onClick={handleEditPasswordBtn}>
                    비밀번호 변경
                  </div>
                </EditUserInfo>
              </UserInfo>
            </MypageUserInfo>
          ) : editeInfo && !editPsword ? (
            <MypageUserInfo>
              <div className="mypage_title">개인정보 변경</div>
              <UserInfo>
                <UserInfoContents>
                  <UserinfoEmail>
                    <div className="userinfo_emailTitle">이메일</div>
                    <input
                      type="text"
                      className="editinfo_emailContents"
                      value={editUserInfo.email}
                      disabled
                    />
                  </UserinfoEmail>
                  <UuserinfoPhone>
                    <div className="userinfo_phoneTitle">핸드폰</div>
                    <input
                      type="text"
                      maxLength="13"
                      className="editinfo_phoneContents"
                      value={phoneNumber}
                      onChange={(e) => changeUserPhoneNumber(e)}
                      ref={userPhoneRef}
                    />
                    {phoneCheck ? (
                      <PassCheck>{messageUserPhone}</PassCheck>
                    ) : (
                      <Check>{messageUserPhone}</Check>
                    )}
                  </UuserinfoPhone>
                  <UserinfoNickname>
                    <div className="userinfo_nicknameTitle">닉네임</div>
                    <input
                      type="text"
                      className="editinfo_nicknameContents"
                      value={nickname}
                      onChange={(e) => changeUserNickname(e)}
                      onBlur={checkNickname}
                      ref={nicknameRef}
                    />
                    {nickCheck ? (
                      <PassCheck>{messageNickname}</PassCheck>
                    ) : (
                      <Check>{messageNickname}</Check>
                    )}
                  </UserinfoNickname>
                  <UserinfoHomeground>
                    <div className="userinfo_homegroundTitle">우리동네</div>
                    {/* <input
                      type="text"
                      className="editinfo_homegroundContents"
                      placeholder={mypageInfo.homeground}
                      onChange={(e) => changeUserHomeGround(e)}
                    /> */}
                    <div className="userinfo_regionBox">
                      <RegionBoxMypage
                        region1={region1}
                        handleRegion1={handleRegion1}
                        handleRegion2={handleRegion2}
                        mainRegion={mainRegion}
                        subRegion={subRegion}
                      />
                    </div>
                  </UserinfoHomeground>
                  <UserinfoFavorite>
                    <div className="userinfo_favoriteTitle">
                      좋아하는 스포츠
                    </div>
                    <input
                      type="text"
                      className="editinfo_favorite"
                      value={favoriteSports}
                      onChange={(e) => changeUserFavoriteSports(e)}
                      ref={favoriteRef}
                    />
                  </UserinfoFavorite>
                </UserInfoContents>
                <EditUserInfo>
                  <div className="sendEditInfo" onClick={handleSendUserinfo}>
                    Send
                  </div>
                  <div className="cancelEdit" onClick={handelCancelBtn}>
                    Cancel
                  </div>
                </EditUserInfo>
              </UserInfo>
            </MypageUserInfo>
          ) : (
            <MypageUserInfo>
              <div className="editePsword_title">비밀번호 변경</div>
              <UserPsContainer>
                <UserInfoContents>
                  <UserinfoPsword>
                    <div className="editePsword_password">변경할 비밀번호</div>
                    <input
                      type="password"
                      className="editePsword_inputPsword"
                      onChange={(e) => setFirstPsword(e.target.value)}
                      onBlur={checkPassword}
                    />
                    {pwColor ? (
                      <PassCheck1>{messagePassword}</PassCheck1>
                    ) : (
                      <Check1>{messagePassword}</Check1>
                    )}
                  </UserinfoPsword>
                  <UserinfoPswordCheck>
                    <div className="editePsword_passwordCheck">
                      비밀번호 확인
                    </div>
                    <input
                      type="password"
                      className="editePsword_inputPswordCheck"
                      onChange={(e) => setSecondPsword(e.target.value)}
                      onBlur={doubleCheckPassword}
                    />
                    {pwCheckColor ? (
                      <PassCheck2>{messagePwCheck}</PassCheck2>
                    ) : (
                      <Check2>{messagePwCheck}</Check2>
                    )}
                  </UserinfoPswordCheck>
                </UserInfoContents>
                <EditUserInfo>
                  <div
                    className="sendEditPsword"
                    onClick={handleChangePassword}
                  >
                    변경하기
                  </div>
                </EditUserInfo>
              </UserPsContainer>
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
                  관심 공고
                </span>
              </span>
            </ChoiceState>
            <div className="writeORfavorite">
              {changeCard === '작성한 공고'
                ? writeData &&
                  writeData.map((member, idx) => {
                    return (
                      <MatchCard member={member} key={idx} isLogin={isLogin} />
                    )
                  })
                : favoriteData &&
                  favoriteData.map((member, idx) => {
                    return (
                      <MatchCard member={member} key={idx} isLogin={isLogin} />
                    )
                  })}
            </div>
            {changeCard === '작성한 공고' && writeData.length === 0 ? (
              <div className="mypage_Match">작성한 공고가 없습니다.</div>
            ) : null}
            {changeCard === '관심 공고' && favoriteData.length === 0 ? (
              <div className="mypage_Match">관심등록한 공고가 없습니다.</div>
            ) : null}
          </MyCard>
          <GoodbyeUser>
            <div
              className="PleaseDontgo"
              onClick={withdrawal}
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
  @media screen and (max-width: 767px) {
    max-width: 375px;
  }
`

const MypageIn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    max-width: 375px;
  }
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
  @media screen and (max-width: 767px) {
    max-width: 375px;
    margin: 30px auto 0px auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mypage_title {
    font-size: 2rem;
    margin-left: 40px;
    @media screen and (max-width: 767px) {
      font-size: 1.6rem;
      margin-left: 0px;
    }
  }
  .editePsword_title {
    font-size: 2rem;
    margin-left: 40px;
    @media screen and (max-width: 767px) {
      font-size: 1.6rem;
      margin-left: 0px;
    }
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 10px 0px 0px 0px;
  padding: 60px 0px 0px 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 60px 0px 0px 30px;
    margin: 10px 0px 0px 0px;
    max-width: 375px;
    width: 300px;
  }
`

const UserPsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin: 10px 0px 0px 0px;
  padding: 60px 0px 0px 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 20px 0px 0px 30px;
    margin: 10px 0px 0px 0px;
    max-width: 375px;
    width: 300px;
  }
`

const UserInfoContents = styled.div`
  display: flex;
  width: 300%;
  flex-direction: column;
  font-size: 20px;
  margin-left: 15px;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    margin-left: -20px;
    width: 500px;
  }
`

const UserinfoPsword = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 40px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  .editePsword_password {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 110px;
    }
  }
  .editePsword_inputPsword {
    margin: 0px 0px 0px 80px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 20px;
    }
  }
`

const UserinfoPswordCheck = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 20px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
  }
  .editePsword_passwordCheck {
    display: flex;
    align-items: center;
    color: #565656;
    margin: 0px 0px 115px 0px;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 110px;
    }
  }
  .editePsword_inputPswordCheck {
    margin: 0px 0px 120px 95px;
    padding: 0px 0px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 20px;
    }
  }
`

const UserinfoEmail = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 20px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: -30px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
  }
  .userinfo_emailTitle {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 60px;
    }
  }

  .userinfo_emailContents {
    margin: 0px 0px 0px 127px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 70px;
    }
  }
  .editinfo_emailContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 0px 0px 10px;
    border: none;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 33px;
    }
  }
`

const UuserinfoPhone = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
  }
  .userinfo_phoneTitle {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 60px;
    }
  }

  .userinfo_phoneContents {
    margin: 0px 0px 0px 127px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 70px;
    }
  }
  .editinfo_phoneContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 27px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 40px;
    }
  }
`

const UserinfoNickname = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
  }
  .userinfo_nicknameTitle {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 60px;
    }
  }
  .userinfo_nicknameContents {
    margin: 0px 0px 0px 127px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 70px;
    }
  }
  .editinfo_nicknameContents {
    margin: 0px 0px 0px 127px;
    padding: 0px 27px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 40px;
      align-items: center;
    }
    :focus {
      outline-color: #840909;
    }
  }
`

const UserinfoHomeground = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dddddd;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: 20px 0px 0px 0px;
    padding: 0px 0px 10px 0px;
  }
  .userinfo_homegroundTitle {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 60px;
    }
  }
  .userinfo_homegroundContents {
    margin: 0px 0px 0px 110px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 70px;
    }
  }
  .editinfo_homegroundContents {
    margin: 0px 0px 0px 115px;
    padding: 0px 27px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      padding: 0px 0px 0px 0px;
      margin: 0px 0px 0px 40px;
    }
  }
  .userinfo_regionBox {
    margin: 0px 0px 0px 112px;
    @media screen and (max-width: 767px) {
      padding: 0px 0px 0px 0px;
      margin: 0px 0px 0px 40px;
    }
  }
`

const UserinfoFavorite = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  margin: 40px 0px 50px 0px;
  font-size: 1rem;
  @media screen and (max-width: 767px) {
    max-width: 375px;
    width: 310px;
    margin: 20px 0px 30px 0px;
    padding: 0px 0px 10px 0px;
  }
  .userinfo_favoriteTitle {
    color: #565656;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      width: 60px;
      line-height: 20px;
    }
  }
  .userinfo_favorite {
    margin: 0px 0px 0px 65px;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 70px;
    }
  }
  .editinfo_favorite {
    margin: 0px 0px 0px 68px;
    padding: 0px 27px 0px 10px;
    border: 1px solid #737373;
    border-radius: 5px;
    height: 25px;
    font-size: 1rem;
    background-color: #fafafa;
    @media screen and (max-width: 767px) {
      margin: 0px 0px 0px 40px;
    }
  }
`

const EditUserInfo = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  text-align: right;
  color: #565656;
  margin-right: 50px;
  @media screen and (max-width: 767px) {
    flex-direction: row;
    max-width: 375px;
    width: 200px;
    margin: 0px 0px 30px 130px;
  }
  .editInfo {
    :hover {
      cursor: pointer;
      color: #840909;
    }
  }
  .editPassWord {
    margin-top: 10px;
    @media screen and (max-width: 767px) {
      margin-top: 0px;
      margin-left: 20px;
    }
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
    @media screen and (max-width: 767px) {
      font-size: 1.3rem;
      bottom: 0px;
      right: 38px;
    }
  }
  .sendEditPsword {
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
    @media screen and (max-width: 767px) {
      font-size: 1.3rem;
      bottom: 0px;
    }
  }
`

const Check = styled.div`
  margin: 0;
  margin-top: -115px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #840909;
`

const PassCheck = styled.div`
  margin: 0;
  margin-top: -50px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #1b7e07;
`

const Check1 = styled.div`
  margin: 0;
  margin-top: 0px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #840909;
`

const Check2 = styled.div`
  margin: 0;
  margin-top: -115px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #840909;
`

const PassCheck1 = styled.div`
  margin: 0;
  margin-top: 0px;
  position: absolute;
  right: 30px;
  font-size: 13px;
  color: #1b7e07;
`

const PassCheck2 = styled.div`
  margin: 0;
  margin-top: -110px;
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
  @media screen and (max-width: 767px) {
  }
  .myMercenary {
    margin-right: 10px;
    @media screen and (max-width: 767px) {
      margin-right: 0px;
    }
  }
  .letsGame {
    margin-left: 10px;
    @media screen and (max-width: 767px) {
      margin-left: 0px;
    }
  }
  .setbold {
    font-weight: bolder;
  }
  .ordergroup {
    color: #353535;
    left: 0;
    display: flex;
    text-align: left;
    top: 100px;
    @media screen and (max-width: 767px) {
      max-width: 375px;
      /* display: flex; */
      /* justify-content: center; */
      /* text-align: center; */
      margin: 0px 0px 0px 75px;
      font-size: 1rem;
    }

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
    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 360px);
      row-gap: 20px;
      column-gap: 24px;
    }
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

// const MyRecruitment = styled.div`
//   display: flex;
//   margin: 30px 0px 30px 0px;
// `

// const MyAttention = styled.div`
//   display: flex;
// `

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
    margin: 10px 35px 0px 0px;
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
