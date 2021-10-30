import React from 'react'
import styled from 'styled-components'
import instance from '../api/index'

const PremierLeague = () => {


const testBtn = () => {
  instance.get('/users', {}, {
    headers : {
      withCredentials : true,
      'Content-Type' : 'application/json',
    }
  }).then(res => {
    console.log(res.userData)
  })
}

  return <button onClick={testBtn}>premierLeague</button>
}


export default PremierLeague
