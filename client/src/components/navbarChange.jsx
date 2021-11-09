import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import logo from '../image/subLogo.png'
import { logoutUser } from '../_actions/user_action'

const NavbarChange = ({ isLogin, setIsLogin }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const hadleLogout = () => {
    if (isLogin) {
      dispatch(logoutUser()).then((res) => {
        console.log(res)
        setIsLogin(false)
      })
    }
  }

  return (
    <>
      <Nav>
        <Logo>
          <Link to="/">
            <LogoImage src={logo} />
          </Link>
        </Logo>
        <Menu>
          <Link
            to="/futsal"
            className="nav_home"
            style={{ textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link
            to="/matchlist"
            className="nav_matchlist"
            style={{ textDecoration: 'none' }}
          >
            Match
          </Link>
          <Link
            to="/map"
            onClick={() => {
              window.location.reload()
            }}
            className="nav_map"
            style={{ textDecoration: 'none' }}
          >
            Map
          </Link>
          <Link
            to="/mypage"
            onClick={() => {
              history.push('/mypage')
              window.location.reload()
            }}
            className="nav_mypage"
            style={{ textDecoration: 'none' }}
          >
            Mypage
          </Link>
          <Link
            to="/futsal"
            className="nav_logout"
            style={{ textDecoration: 'none' }}
            onClick={hadleLogout}
          >
            Logout
          </Link>
        </Menu>
      </Nav>
    </>
  )
}

const Nav = styled.div`
  background-color: #fafafa;
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
  left: 48%;
`

const Menu = styled.div`
  position: absolute;
  top: 50%;
  right: 21vw;
  font-size: 1rem;
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
  .nav_mypage {
    margin-left: 30%;
    color: #353535;
    :hover {
      color: #840909;
    }
  }
  .nav_logout {
    margin-left: 30%;
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

export default NavbarChange
