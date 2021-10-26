import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../image/subLogo.png'
import GlobalStyle from '../globalStyle/globalStyle'
import styled from "styled-components"

 
const Navbar = () => {
  return (
    <>
    <GlobalStyle />
      <Nav>
        <Logo>
          <Link to='/entrance'>
            <LogoImage src={logo}/>
          </Link>
        </Logo>
        <Menu>
          <Link to='/matchlist' className='nav_matchlist' style={{ textDecoration: 'none' }}>Match</Link>
          <Link to='/map' className='nav_map' style={{ textDecoration: 'none' }}>Map</Link>
          <span className='nav_login'>Login</span>
          <Link to='/signup' className='nav_signup' style={{ textDecoration: 'none' }}>Signup</Link>
        </Menu>
      </Nav>
    </>
  )
}

const Nav = styled.div`
  background-color: #FAFAFA;
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  position: absolute;
  top: 0%;
  left: 49%;
`

const Menu = styled.div`
position: absolute;
top: 50%;
right: 20%;
font-size: .9vw;
.nav_matchlist {
  margin-left: 40%;
  color: #353535;
  :hover {
  color: #840909;
}
}
.nav_map {
  margin-left: 40%;
  color: #353535;
  :hover {
  color: #840909;
}
}
.nav_login {
  margin-left: 40%;
  color: #353535;
  :hover {
  color: #840909;
}
}
.nav_signup {
  margin-left: 40%;
  color: #353535;
  :hover {
  color: #840909;
}
}

`


const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 2px;
`

export default Navbar
