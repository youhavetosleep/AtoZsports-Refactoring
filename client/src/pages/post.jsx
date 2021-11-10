/*global kakao */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { BsStar, BsStarFill } from 'react-icons/bs'
import instance from '../api'
import {
  getPostData,
  deletePostData,
  changeStatusData
} from '../_actions/post_action'
import PostChat from '../components/postChat'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

const Post = ({ isLogin, setIsLogin, userInfo, setEditPost }) => {
  // 로그인 안한 유저가 post로 들어올 경우 에러 방지
  let token = ''
  if (userInfo.loginSuccess) {
    token = userInfo.loginSuccess.accessToken
  }

  const history = useHistory()
  const dispatch = useDispatch()
  const postId = history.location.pathname.split('=')[1]
  const [postData, setPostData] = useState('')
  const [status, setStatus] = useState()

  const getPostInfo = () => {
    dispatch(getPostData(postId, token)).then((res) => {
      setPostData(res.payload.postsData)
      setStatus(res.payload.postsData.status)

      // 지도 표시를 위한 코드 (시작)
      let container = document.getElementById('map')
      let options = {
        center: new kakao.maps.LatLng(
          res.payload.postsData.longitude,
          res.payload.postsData.latitude
        ),
        level: 5
      }
      //map
      let map = new kakao.maps.Map(container, options)
      let markerPosition = new kakao.maps.LatLng(
        res.payload.postsData.longitude,
        res.payload.postsData.latitude
      )
      // marker 생성
      let marker = new kakao.maps.Marker({
        position: markerPosition,
        title: res.payload.postsData.addressName
      })
      marker.setMap(map)
      // 지도 표시를 위한 코드 (끝)
    })
  }

  //즐겨찾기 추가
  const addFavorite = async () => {
    await instance
      .post(
        `users/favorite/${postId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      )
      .then((res) => window.location.reload())
      .catch((err) => console.log(err))
  }

  //즐겨찾기 삭제
  const deleteFavorite = async () => {
    await instance
      .delete(`users/favorite/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err))
  }

  // 게시글 수정 (작성페이지로 이동)
  const editContent = () => {
    setEditPost(true)
    history.push(`/write`)
  }

  // 게시글 삭제 버튼
  const deleteContent = () => {
    Swal.fire({
      title: '게시글 삭제를 원하시나요?',
      showCancelButton: true,
      confirmButtonText: 'yes',
      confirmButtonColor: '#8F2929'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제되었습니다!',
          confirmButtonColor: '#242017',
          confirmButtonText: '확인'
        })
        dispatch(deletePostData(postId, token)).then(history.push('/futsal'))
      }
    })
  }

  // post 페이지 들어왔을 때 post 정보를 뿌려주기 위한 useEffect
  // status 변경시 다시 데이터를 불러온다.
  useEffect(() => {
    getPostInfo()
  }, [])

  // 모집완료 상태를 바꾸기 위한 useEffect
  // 페이지 들어올 때마다 요청을 서버에 보내기 때문에 비효율적이다.
  // 모집완료 버튼을 눌럿을 때 요청을 보내려고 했지만 status의 상태업데이트가 한 발짝 늦어 일단 이 방법을 사용한다.
  useEffect(() => {
    dispatch(changeStatusData(postId, token, status))
  }, [status])

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <TitleWrapper>
        <TitleText>경기 정보</TitleText>
      </TitleWrapper>
      <FormContainer>
        <FormWrapper>
          <MapWrap className="miniMap" id="map"></MapWrap>
          <Main>
            <FavorteMark className="favorite">
              {postData.isMyFavorite ? (
                <BsStarFill className="add" onClick={deleteFavorite} />
              ) : (
                <BsStar className="delete" onClick={addFavorite} />
              )}
            </FavorteMark>
            <Place>{postData.placeName}</Place>
            <MainEl>{postData.addressName}</MainEl>
            <MainEl>{postData.phone}</MainEl>
            {status === '모집완료' ? (
              <Status className="fin">모집완료</Status>
            ) : (
              <Status>{status}</Status>
            )}
          </Main>
          <ContentWrap>
            <ContentTitle>게시자 정보</ContentTitle>
          </ContentWrap>
          <ContentWrap>
            <ContentName>제목</ContentName>
            <ContentEl>{postData.title}</ContentEl>
          </ContentWrap>
          <ContentWrap>
            <ContentName>닉네임</ContentName>
            <ContentEl>{postData.nickname}</ContentEl>
          </ContentWrap>
          <ContentWrap>
            <ContentName>요청종류</ContentName>
            {postData.division === 'member' ? (
              <ContentEl>용병</ContentEl>
            ) : (
              <ContentEl>매치</ContentEl>
            )}
          </ContentWrap>
          <ContentWrap>
            <ContentName>날짜</ContentName>
            <ContentEl>
              {postData && postData.startTime.slice(0, 10)}&nbsp;
              {postData && postData.startTime.slice(11, 16)}&nbsp;~&nbsp;
              {postData && postData.endTime.slice(11, 16)}
            </ContentEl>
          </ContentWrap>
          <ContentWrap className="content">
            <ContentName className="need">요청 사항</ContentName>
            <ContentEl className="text">{postData.content}</ContentEl>
          </ContentWrap>
          <ContentWrap>
            <ContentName>전화번호</ContentName>
            {postData.userPhone ? (
              <ContentEl>{postData.userPhone}</ContentEl>
            ) : (
              <ContentEl>채팅으로 게시자와 소통해보세요!</ContentEl>
            )}
          </ContentWrap>
          {postData.isMyPost ? (
            <BtnWrap>
              <ContentBtn onClick={() => setStatus('모집완료')}>
                모집완료
              </ContentBtn>
              <ContentBtn onClick={editContent}>수정</ContentBtn>
              <ContentBtn onClick={deleteContent}>삭제</ContentBtn>
            </BtnWrap>
          ) : null}
          <PostChating>
            <PostChat postId={postId} />
          </PostChating>
        </FormWrapper>
      </FormContainer>
      {/* <Footer /> */}
    </>
  )
}

const FormContainer = styled.div`
  background-color: #fafafa;
  height: 130vh;
  position: relative;
`

const FormWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 800px;
  width: 700px;
  box-sizing: border-box;
  border-radius: 5px;
  .content {
    height: 70px;
    padding: 30px 30px;
    border-bottom: none;
    @media screen and (max-width: 767px) {
      padding: 30px 20px;
    }
  }

  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
  }
`

const TitleWrapper = styled.div`
  height: 100px;
  position: relative;
  @media screen and (max-width: 767px) {
    height: 60px;
  }
`

const MapWrap = styled.div`
  width: 100%;
  height: 250px;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 200px;
  }
`

const TitleText = styled.h1`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`

const Main = styled.div`
  text-align: center;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  /* border : 1px solid #c4c4c4; */
  padding-bottom: 20px;
  .favorite {
    text-align: left;
  }
  .fin {
    border: none;
    color: #ffffff;
    background-color: #840909;
  }
  .add {
    color: #840909;
  }
`

const FavorteMark = styled.div`
  height: 40px;
  margin-left: 10px;
  padding-top: 10px;
  font-size: 23px;
  color: #929292;
  .delete {
  }
  @media screen and (max-width: 767px) {
    margin-top: 0;
    font-size: 17px;
    margin-left: 5px;
  }
`

const Place = styled.h1`
  font-size: 22px;
  margin-bottom: 15px;
`

const MainEl = styled.p`
  margin: 10px;
  font-size: 17px;
  color: #505050;
`

const Status = styled.button`
  border: 1px solid #3e3e3e;
  color: #3e3e3e;
  padding: 5px 15px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
`

const ContentWrap = styled.div`
  padding: 20px 30px;
  margin: 0px 0px 0px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  display: flex;
  @media screen and (max-width: 767px) {
    position: relative;
    padding: 20px 20px;
  }
`

const ContentTitle = styled.h1`
  font-size: 20px;
`

const ContentName = styled.p`
  font-size: 15px;
  width: 30%;
  line-height: 20px;
  @media screen and (max-width: 767px) {
    width: 22%;
  }
`

const ContentEl = styled.p`
  width: 70%;
  line-height: 20px;
  @media screen and (max-width: 767px) {
    width: 78%;
  }
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ContentBtn = styled.button`
  width: 70px;
  border: 1px solid #727272;
  color: #727272;
  border-radius: 10px;
  margin-right: 15px;
  margin-top: 10px;
  padding: 2px 5px;
  box-sizing: border-box;
  background-color: white;
  :hover {
    cursor: pointer;
    color: #ffffff;
    border: none;
    background-color: #840909;
  }
`

const PostChating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0px 0px 0px;
`

export default Post
