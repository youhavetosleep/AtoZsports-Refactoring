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

const Post = ({ userInfo, setEditPost }) => {
  const token = userInfo.loginSuccess.accessToken
  const history = useHistory()
  const dispatch = useDispatch()
  const postId = history.location.pathname.split('=')[1]
  const [postData, setPostData] = useState('')
  const [status, setStatus] = useState('')

  const getPostInfo = async () => {
    dispatch(getPostData(postId, token)).then((res) => {
      setPostData(res.payload.postsData)
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

  // status 상태 바꾸는 버튼
  const changeStatus = () => {
    setStatus('모집완료')
    dispatch(changeStatusData(postId, token, status))
  }

  // post 페이지 들어왔을 때 post 정보를 뿌려주기 위한 useEffect
  // status 변경시 다시 데이터를 불러온다.
  useEffect(() => {
    getPostInfo()
  }, [status])

  return (
    <>
      <TitleWrapper>
        <TitleText>경기 정보</TitleText>
      </TitleWrapper>
      <FormContainer>
        <FormWrapper>
          <div id="map" style={{ width: '100%', height: '200px' }}></div>
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
            {postData.status === '모집완료' ? (
              <Status className="fin">모집완료</Status>
            ) : (
              <Status>{postData.status}</Status>
            )}
          </Main>
          <ContentWrap>
            <ContentTitle>게시자 정보</ContentTitle>
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
            <ContentName>요청 사항</ContentName>
            <ContentEl>{postData.content}</ContentEl>
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
              <ContentBtn onClick={changeStatus}>모집완료</ContentBtn>
              <ContentBtn onClick={editContent}>수정</ContentBtn>
              <ContentBtn onClick={deleteContent}>삭제</ContentBtn>
            </BtnWrap>
          ) : null}
        </FormWrapper>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  background-color: #ffffff;
  height: 1000px;
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
  }
`

const TitleWrapper = styled.div`
  height: 100px;
  position: relative;
  background-color: white;
`

const TitleText = styled.h1`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 50px;
  font-weight: bold;
`

const Main = styled.div`
  text-align: center;
  border: 1px solid #c4c4c4;
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
  margin-top: 10px;
  color: #929292;
  .delete {
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
  box-sizing: border-box;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  display: flex;
`

const ContentTitle = styled.h1`
  font-size: 20px;
`

const ContentName = styled.p`
  font-size: 15px;
  width: 100px;
`

const ContentEl = styled.p``

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ContentBtn = styled.button`
  width: 70px;
  border: 1px solid #d1d1d1;
  color: #d1d1d1;
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

export default Post
