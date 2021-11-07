import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../image/subLogo.png'
import LoginModal from '../modal/loginModal'

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <>
      <Nav>
        <Logo>
          <Link to="/" >
            <LogoImage src={logo} />
          </Link>
        </Logo>
        <Menu>
        <Link to="/futsal" className="nav_home" style={{textDecoration: 'none'}}>
            Home
          </Link>
          <Link to="/matchlist" className="nav_matchlist" style={{textDecoration: 'none'}}>
            Match
          </Link>
          <Link to="/map" className="nav_map" style={{textDecoration: 'none'}}>
            Map
          </Link>
          <span className="nav_login" onClick={() => setLoginOpen(true)}>
            Login
          </span>
          <Link to="/signup" className="nav_signup" style={{textDecoration: 'none'}}>
            Signup
          </Link>
        </Menu>
        {loginOpen ? <LoginModal setLoginOpen={setLoginOpen} /> : null}
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
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  
`

// const Menu = styled.div`
//   margin-top: 20px;
//   margin-right: 80px;
//   font-size: 14px;
//   text-decoration: none;
// `

const Menu = styled.div`
  position: absolute;
  top: 50%;
  right: 20vw;
  font-size: 1rem;
  z-index: 2;
  .nav_home {
    color: #353535;
    :hover {
      color: #840909;
    }
  }
  .nav_matchlist {
    margin-left: 30%;
    color: #353535;
    :hover {
      color: #840909;
    }
  }
  .nav_map {
    margin-left: 30%;
    color: #353535;
    :hover {
      color: #840909;
    }
  }
  .nav_login {
    margin-left: 30%;
    color: #353535;
    :hover {
      color: #840909;
      cursor: pointer;
    }
  }
  .nav_signup {
    margin-left: 30%;
    color: #353535;
    :hover {
      color: #840909;
    }
  }
`

const Logo = styled.div`
  position: absolute;
  top: 0%;
  left: 48%;
`

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 2px;
`

export default Navbar
