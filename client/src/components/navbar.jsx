import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import logo from '../image/subLogo.png'
import LoginModal from '../modal/loginModal'
import { logoutUser } from '../_actions/user_action'

const Navbar = ({ isLogin, setIsLogin }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [loginOpen, setLoginOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const handleNavClose = () => {
    setNavOpen(false)
  }
  const handleNavOpen = () => {
    setNavOpen(true)
  }

  const hadleLogout = () => {
    if (isLogin) {
      dispatch(logoutUser()).then((res) => {
        setIsLogin(false)

        window.location.replace('/futsal')
      })
    }
  }

  const clickLogo = () => {
    history.push('/')
  }

  return (
    <>
      <NavBarContainer>
        <NavbarIn>
          {navOpen ? (
            <div className="navHam">
              <ul className="navBtns">
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/futsal')
                    setNavOpen(false)
                  }}
                >
                  Home
                </li>
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/matchlist')
                    setNavOpen(false)
                  }}
                >
                  Match
                </li>
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/map')
                    setNavOpen(false)
                  }}
                >
                  Map
                </li>
                {!isLogin ? (
                  <li
                    className="navBtn"
                    onClick={() => {
                      setNavOpen(false)
                      setLoginOpen(true)
                    }}
                  >
                    Login
                  </li>
                ) : (
                  <li
                    className="navBtn"
                    onClick={() => {
                      window.location.replace('/mypage')
                      setNavOpen(false)
                    }}
                  >
                    Mypage
                  </li>
                )}
                {!isLogin ? (
                  <li
                    className="navBtn"
                    onClick={() => {
                      window.location.replace('/signup')
                      setNavOpen(false)
                    }}
                  >
                    Signup
                  </li>
                ) : (
                  <li
                    className="navBtn"
                    onClick={() => {
                      hadleLogout()
                      setNavOpen(false)
                      window.location.replace('/futsal')
                    }}
                  >
                    Logout
                  </li>
                )}

                {loginOpen ? <LoginModal setLoginOpen={setLoginOpen} /> : null}
              </ul>
              <span className="closeBtn" onClick={handleNavClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
          ) : (
            <div className="navTop">
              <ul className="navBtns">
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/futsal')
                    setNavOpen(false)
                  }}
                >
                  Home
                </li>
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/matchlist')
                    setNavOpen(false)
                  }}
                >
                  Match
                </li>
                <li
                  className="navBtn"
                  onClick={() => {
                    window.location.replace('/map')
                    setNavOpen(false)
                  }}
                >
                  Map
                </li>
                {!isLogin ? (
                  <li
                    className="navBtn"
                    onClick={() => {
                      setNavOpen(false)
                      setLoginOpen(true)
                    }}
                  >
                    Login
                  </li>
                ) : (
                  <li
                    className="navBtn"
                    onClick={() => {
                      window.location.replace('/mypage')
                      setNavOpen(false)
                    }}
                  >
                    Mypage
                  </li>
                )}
                {!isLogin ? (
                  <li
                    className="navBtn"
                    onClick={() => {
                      window.location.replace('/signup')
                      setNavOpen(false)
                    }}
                  >
                    Signup
                  </li>
                ) : (
                  <li
                    className="navBtn"
                    onClick={() => {
                      hadleLogout()
                      setNavOpen(false)
                    }}
                  >
                    Logout
                  </li>
                )}
                {loginOpen ? <LoginModal setLoginOpen={setLoginOpen} /> : null}
              </ul>
            </div>
          )}
          <NavLogo>
            <span className="moreOpt" onClick={handleNavOpen}>
              <i className="fas fa-bars"></i>
            </span>
            <img
              className="navLogoImg"
              src={logo}
              alt="logo"
              onClick={clickLogo}
            />
          </NavLogo>
        </NavbarIn>
      </NavBarContainer>
    </>
  )
}

const NavBarContainer = styled.section`
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  /* position: fixed; */
  top: 0;
  z-index: 10;
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
`

const NavbarIn = styled.div`
  width: 100%;
  max-width: Container;
  margin: 0 auto;

  .navBtns {
    position: absolute;
    list-style: none;
    color: rgb(53, 53, 53);
    display: flex;
    right: 0;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 5rem;
  }

  .navBtn {
    display: inline-block;
    width: auto;
    margin: 2em 2rem 0rem 0.8rem;
    text-align: right;
    background-color: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    white-space: nowrap;
    :hover {
      color: #890909;
    }
  }
  @media screen and (max-width: 767px) {
    .navBtns {
      all: unset;
      display: flex;
      flex-direction: column;
      padding: 2rem 3rem;
      row-gap: 1.5rem;
      text-align: center;
    }
    .navBtn {
      text-align: center;
      :hover {
        font-weight: bold;
        color: #890909;
      }
    }
    .navHam {
      all: unset;
      position: fixed;
      top: 0;
      left: 0;
      width: 19rem;
      height: 25rem;
      background-color: rgb(251, 251, 251);
      opacity: 0.95;
      /* border-right: 1px solid rgb(238, 238, 238); */
      box-shadow: 5px 0 15px rgba(83, 83, 83, 0.15);
      transition: 1.2s;
      border-radius: 15px;
      z-index: 10;
      display: flex;
      justify-content: center;
    }
    .navTop {
      position: fixed;
      top: 0;
      left: -100%;
      width: 19rem;
      height: 25rem;
      background-color: rgb(251, 251, 251);
      opacity: 0.95;
      box-shadow: 5px 0 15px rgba(83, 83, 83, 0.15);
      transition: 1.2s;
      border-radius: 15px;
      z-index: 10;
      display: flex;
      justify-content: center;
    }
    .closeBtn {
      all: unset;
      cursor: pointer;
      font-size: 1.2rem;
      color: #747474;
      position: absolute;
      top: 20px;
      right: 20px;
      transition: 0.3s;
    }
  }
`

const NavLogo = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  .moreOpt {
    display: none;
  }
  .navLogoImg {
    position: absolute;
    top: 0;
    height: 60px;
    transition: 0.3s;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    .moreOpt {
      text-align: center;
      all: unset;
      cursor: pointer;
      position: absolute;
      color: black;
      top: 1.45rem;
      left: 1.45rem;
      font-size: 1.3rem;
    }
  }
`

export default Navbar
