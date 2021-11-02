import React, { useState, useRef,useEffect } from 'react'
import styled from 'styled-components'
import instance from '../../api/index'
const Comment = () => {
  const [content, setContent] = useState('')
  const _content = useRef()

  const getComment = async () => {
    await instance.get(`/futsal/ground/1/review?offset=1&limit=1`, {
      headers : {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) =>console.log(res))
    .catch(err => console.log(err))
  }
  useEffect(() => {
   getComment()
  },[])
  return <h1>return</h1>
}

export default Comment;