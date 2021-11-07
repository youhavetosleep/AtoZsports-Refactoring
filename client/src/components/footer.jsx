import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <>
      <Footerbar>
        <Github href="https://github.com/codestates/AtoZsports">
          A to Z Sports Repository
        </Github>
        <Copyright>© Copyright 2021 AtoZ Sports All Rights Reserved</Copyright>
        <Team>
          <Href href="https://github.com/steel-hyuk">
            <div>김은혁 (BE) |</div>
          </Href>
          <Href href="https://github.com/jsjsjskjs">
            <div>김재식 (BE) |</div>
          </Href>
          <Href href="https://github.com/shinseungmin-kor">
            <div>신승민 (FE) |</div>
          </Href>
          <Href href="https://github.com/youhavetosleep">
            <div>진정수 (FE)</div>
          </Href>
        </Team>
      </Footerbar>
    </>
  )
}

const Footerbar = styled.div`
position: fixed;
  background-color: #fafafa;
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #747474;
`

const Github = styled.a`
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(15%, -50%);
  text-decoration: none;
  color: #747474;
  :hover {
    color: #353535;
  }
`

const Team = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-5%, -50%);
`

const Href = styled.a`
  padding: 3px;
  text-decoration: none;
  color: #747474;
  :hover {
    color: #353535;
  }
`

const Copyright = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Footer
