import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../image/subLogo.png'
import GlobalStyle from '../globalStyle/globalStyle'
import styled from 'styled-components'
import LoginModal from '../modal/loginModal'

const Navbar = () => {

  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>
          <Link to="/entrance">
            <LogoImage src={logo} />
          </Link>
        </Logo>
        <Menu>
          <Link to="/matchlist" className="nav_matchlist">
            Match
          </Link>
          <Link to="/map" className="nav_map">
            Map
          </Link>
          <span className="nav_login" onClick={()=> setLoginOpen(true)}>Login</span>
          <Link to="/signup" className="nav_signup">
            Signup
          </Link>
        </Menu>
        {loginOpen ? <LoginModal setLoginOpen ={setLoginOpen}/> : null}
      </Nav>
    </>
  )
}

const Nav = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  transition: 0.3s;
`

const Menu = styled.div`
  margin-top: 20px;
  margin-right: 80px;
  font-size: 14px;
  text-decoration: none;
`

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 2px;
`

export default Navbar
