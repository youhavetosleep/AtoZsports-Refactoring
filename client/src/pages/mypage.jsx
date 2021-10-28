import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/footer'
import MatchCard from '../components/matchCard'
import GlobalStyle from '../globalStyle/globalStyle'
import EditPasswordModal from '../modal/editPasswordModal'

const Mypage = () => {

  const [changeCard, setChangeCard] = useState('용병모집')
  const [editeInfo, setEditInfo] = useState(false)
  const [editPswordModal, setEditPswordModal] = useState(false)
  


  const handleEditUserinfo = () => {
    editeInfo ? setEditInfo(false) : setEditInfo(true) 
  } 

  const handleEditPasswordBtn = () => {
    setEditPswordModal(true)
  }

 

  return (
    <>
      <GlobalStyle />
      <MypageContainer>
        <MypageIn>
          {editPswordModal ? 
          <EditPasswordModal 
          setEditPswordModal={setEditPswordModal}
          /> : null}
          { !editeInfo ? (
          <MypageUserInfo>
            <div className="mypage_title">마이페이지</div>
            <UserInfo>
              <UserInfoContents>
              <Userinfo_email>
                <div className="userinfo_emailTitle">이메일</div>
                <div className="userinfo_emailContents">football@love.com</div>
              </Userinfo_email>
              <Uuserinfo_phone>
                <div className="userinfo_phoneTitle">핸드폰</div>
                <div className="userinfo_phoneContents">010-1234-5678</div>
              </Uuserinfo_phone>
              <Userinfo_nickname>
                <div className="userinfo_nicknameTitle">닉네임</div>
                <div className="userinfo_nicknameContents">footballS2</div>
              </Userinfo_nickname>
              <Userinfo_homeground>
                <div className="userinfo_homegroundTitle">우리동네</div>
                <div className="userinfo_homegroundContents">용인시</div>
              </Userinfo_homeground>
              <Userinfo_favorite>
                <div className="userinfo_favoriteTitle">좋아하는 스포츠</div>
                <div className="userinfo_favorite">풋살</div>
              </Userinfo_favorite>
              </UserInfoContents>
              <EditUserInfo>
                <div className="editInfo"
                setEditPswordModal={setEditPswordModal}
                onClick={handleEditUserinfo}
                >정보수정
                </div>
                <div 
                className="editPassWord"
                onClick={handleEditPasswordBtn}
                >비밀번호 변경</div>
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
                value="football@love.com"
                disabled
                />
              </Userinfo_email>
              <Uuserinfo_phone>
                <div className="userinfo_phoneTitle">핸드폰</div>
                <input 
                type='text'
                className='editinfo_phoneContents'
                value='010-1234-5678'
                disabled
                />
              </Uuserinfo_phone>
              <Userinfo_nickname>
                <div className="userinfo_nicknameTitle">닉네임</div>
                <input
                type='text' 
                className="editinfo_nicknameContents"
                value='footballS2'
                />
              </Userinfo_nickname>
              <Userinfo_homeground>
                <div className="userinfo_homegroundTitle">우리동네</div>
                <input
                type='text' 
                className="editinfo_homegroundContents"
                value='용인시'
                disabled
                />
              </Userinfo_homeground>
              <Userinfo_favorite>
                <div className="userinfo_favoriteTitle">좋아하는 스포츠</div>
                <input
                type='text' 
                className="editinfo_favorite"
                value='풋살'
                disabled
                />
              </Userinfo_favorite>
              </UserInfoContents>
              <EditUserInfo>
                <div className="sendEditInfo"
                onClick={handleEditUserinfo}
                >Send
                </div>
              </EditUserInfo>
            </UserInfo>
          </MypageUserInfo>
          )}
          <MyCard>
            <ChoiceState>
            <div className="myMercenary">용병모집</div>
            |
            <div className="letsGame">경기제안</div>
            </ChoiceState>
            {changeCard === '용병모집' ? (
            <MyRecruitment>
              <MatchCard />
              <MatchCard />
            </MyRecruitment>
            ) : (
            <MyAttention>
              <MatchCard />
              <MatchCard />
            </MyAttention>
            )}
          </MyCard>
          <GoodbyeUser>
            <div className="PleaseDontgo">회원탈퇴</div>
          </GoodbyeUser>
        </MypageIn>
      </MypageContainer>
      <Footer />
    </>
  )
}

const MypageContainer = styled.div`
 width: 100%;
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
  border-top: 1px solid black ;
  border-bottom: 1px solid black ;
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
  border-bottom: 1px solid #DDDDDD ;
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
  border-bottom: 1px solid #DDDDDD ;
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
  border-bottom: 1px solid #DDDDDD ;
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
        outline:none;
    }
  }
`

const Userinfo_homeground = styled.div`
display: flex;
width: 70%;
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #DDDDDD ;
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
`

const MyCard = styled.section`
  display: flex;
  flex-direction: column;
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
    font-size: .9rem;
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