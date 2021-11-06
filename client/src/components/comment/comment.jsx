import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import store from '../../store/store'
import CommentList from './commentList'
import { getCommentData, addCommentData } from '../../_actions/ground_action'
import StarRating from '../../utils/starRating'

const Comment = ({ groundData, groundSelect }) => {
  const dispatch = useDispatch()
  const [write, setWrite] = useState('')
  const [content, setContent] = useState([])
  const [score, setScore] = useState(5)
  
  // 로그인된 유저의 데이터
  const userInfo = store.getState().user
  const token = userInfo.loginSuccess.accessToken
  const nickname = userInfo.loginSuccess.userData.nickname
  const userId = userInfo.loginSuccess.userData.id

  // 페이지네이션
  const [totalComment, setTotalComment] = useState(groundData.score.length)
  const [currentPage, setCurrentPage] = useState(1)

  // 글쓰기 버튼 누를 때마다 초기화를 하기 위해 
  // StarRating 파일에서 가져온 status
  const [clicked, setClicked] = useState([true, true, true, true, true])

  const sendStar = (star) => {
    setScore(star)
  }

  // 글쓰기 버튼
  const addComment = () => {
    setContent([])
    dispatch(addCommentData(groundSelect, token, score, userId, write)).then(
      (res) => {
        setTotalComment(res.payload.list.length)
        setClicked([true, true, true, true, true])
        // window.location.reload()
      }
    )
  }

  useEffect(() => {
    //글쓰기 버튼 수정하다 추가한 content 초기화
    setContent([])
    dispatch(getCommentData(groundSelect, currentPage)).then((res) => {
      setContent([...content, ...res.payload])
      setWrite('')
      setScore(5)
    })
  }, [currentPage, totalComment])

  // 페이지네이션
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalComment / 5); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNum) => {
    setContent([])
    setCurrentPage(pageNum)
  }

  return (
    <CommentWrap>
      <WriteWrap>
        <StarRating clicked={clicked} setClicked={setClicked} sendStar={sendStar} />
        <Input
          type="text"
          placeholder="댓글을 작성하세요"
          value={write}
          onChange={(e) => {
            setWrite(e.target.value)
          }}
        />
        <CommentBtn onClick={addComment}>글쓰기</CommentBtn>
      </WriteWrap>
      {content && content.length === 0 ? (
        <Alert>댓글을 작성해주세요!</Alert>
      ) : (
        content.map((el, idx) => {
          return (
            <CommentList
              setContent={setContent}
              setTotalComment={setTotalComment}
              token={token}
              nickname={nickname}
              groundId={groundSelect}
              list={el}
              key={idx}
            />
          )
        })
      )}
      <Pagination>
        {pageNumbers.map((num, idx) => (
          <li
            className="number"
            onClick={() => {
              paginate(num)
            }}
            key={idx}
          >
            {num}
          </li>
        ))}
      </Pagination>
    </CommentWrap>
  )
}

const CommentWrap = styled.div`
  border-top: 1px solid #747474;
`

const WriteWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #a0a0a0;
`

const Input = styled.input`
  width: 550px;
  height: 30px;
  border: solid 2px #d2d2d2;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  :focus {
    border: solid 2px #959595;
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
  }
`

const CommentBtn = styled.button`
  padding: 1px 2px;
  box-sizing: border-box;
  font-size: 18px;
  width: 100px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 2px #d2d2d2;
`

const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  .number {
    margin-right: 10px;
    margin-top: 15px;
    font-size: 20px;
    color: #b5b5b5;
    :hover {
      cursor: pointer;
      color: #020202;
    }
  }
`

const Alert = styled.h1`
  height: 500px;
  text-align: center;
  padding: 300px 150px;
  box-sizing: border-box;
  font-size: 30px;
`

export default Comment
