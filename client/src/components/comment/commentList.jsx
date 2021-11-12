import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import {
  updateCommentData,
  deleteCommentData,
  selectGroundData
} from '../../_actions/ground_action'
import { STAR } from '../../utils/data'
import StarRating from '../../utils/starRating'

const CommentList = ({
  setContent,
  setTotalComment,
  setCommentData,
  groundId,
  list,
  token,
  nickname
}) => {
  const [content1, setContent1] = useState(list.comment)
  const [score, setScore] = useState(list.score)
  const [editMode, setEditMode] = useState('normal')

  // starRating.jsx에 필요한 status
  const [clicked, setClicked] = useState([true, true, true, true, true])

  const _content1 = useRef()

  const dispatch = useDispatch()

  // 댓글 수정
  const editComment = () => {
    setEditMode('edit')
  }
  // 댓글 수정시 별점 변경
  const sendStar = (star) => {
    setScore(star)
  }

  const updateComment = () => {
    dispatch(updateCommentData(groundId, list.id, token, content1, score)).then(
      (res) => {
        dispatch(selectGroundData(groundId)).then((res) =>
          setCommentData(res.payload.score)
        )
        setEditMode('normal')
      }
    )
  }

  const deleteComment = () => {
    Swal.fire({
      title: '댓글 삭제를 원하시나요?',
      showCancelButton: true,
      confirmButtonText: 'yes',
      confirmButtonColor: '#8F2929'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCommentData(groundId, list.id, token)).then((res) => {
          setContent([])
          setTotalComment(res.payload.data.length)
          setCommentData(res.payload.data)
        })
      }
    })
  }

  return (
    <ElWrap>
      <Line1>
        {editMode === 'normal' ? (
          <Score>
            {STAR.map((el, idx) => {
              if (el.star === score) {
                return el.name
              }
            })}
          </Score>
        ) : (
          <StarRating
            clicked={clicked}
            setClicked={setClicked}
            sendStar={sendStar}
          />
        )}

        <Info>
          <p className="nick">{list.nickname}</p>
          <p className="date">{list.createdAt.substring(0, 10)}</p>
        </Info>
      </Line1>
      <Line2>
        {content1 && editMode === 'normal' ? (
          <>
            <Comment>{content1}</Comment>
            {nickname === list.nickname ? (
              <BtnWrap>
                <Edit onClick={editComment}>수정</Edit>
                <Delete onClick={deleteComment}>삭제</Delete>
              </BtnWrap>
            ) : null}
          </>
        ) : (
          <InputWrap>
            <Input
              type="text"
              value={content1}
              ref={_content1}
              onChange={(e) => {
                setContent1(e.target.value)
              }}
            />
            <EditBtn onClick={updateComment}>수정완료</EditBtn>
          </InputWrap>
        )}
      </Line2>
    </ElWrap>
  )
}

const ElWrap = styled.div`
  height: 90px;
  border-bottom: 1px solid #a0a0a0;
  padding: 15px 20px;
  box-sizing: border-box;
`

const Line1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Score = styled.div`
  width: 100px;
  height: 20px;
  color: #fcc419;
`

const Info = styled.div`
  font-size: 20px;
  display: flex;
  .date {
    color: #676767;
    margin-left: 20px;
  }
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`

const Line2 = styled.div`
  display: flex;
  justify-content: space-between;
`

const Comment = styled.p`
  font-size: 20px;
  @media screen and (max-width: 767px) {
    font-size: 15px;
    width: 74%;
    margin-top: 3px;
  }
`

const BtnWrap = styled.div`
  display: flex;
  margin-right: 5px;
  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
`

const Edit = styled.button`
  font-size: 15px;
  margin-right: 10px;
  border: none;
  background-color: #ffffff;
  border-bottom: 1px solid #9a9a9a;
  color: #9a9a9a;
  @media screen and (max-width: 767px) {
    padding : 1px 2px;
    font-size: 13px;
    margin-right: 5px;
    width: 35px;
    :hover {
      color : #fcc419;
      border-bottom : 1px solid #fcc419;
    }
  }
`

const Delete = styled.button`
  font-size: 15px;
  border: none;
  background-color: #ffffff;
  border-bottom: 1px solid #9a9a9a;
  color: #9a9a9a;
  @media screen and (max-width: 767px) {
    padding : 1px 3px;
    font-size: 13px;
    :hover {
      color : #fcc419;
      border-bottom : 1px solid #fcc419;
    }
  }
`

const Input = styled.input`
  width: 450px;
  height: 25px;
  border: none;
  border-bottom: solid 1px #d2d2d2;
  padding: 2px 5px;
  font-size: 17px;
  box-sizing: border-box;
  :focus {
    border-bottom: solid 1px #840909;
    outline: none;
  }
  @media screen and (max-width: 767px) {
    width: 70%;
    font-size: 14px;
  }
`

const EditBtn = styled.button`
  font-size: 15px;
  margin-left: 35px;
  border: none;
  background-color: #ffffff;
  border-bottom: 1px solid #9a9a9a;
  color : #9a9a9a;
  @media screen and (max-width: 767px) { 
    font-size: 14px;
    margin-left : 10px;
  }
`

const InputWrap = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
    justify-content: space-between;
  }
`

export default CommentList
