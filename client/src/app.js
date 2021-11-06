import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import GlobalStyle from './globalStyle/globalStyle'
import store from './store/store'
import Auth from './auth/auth'
import Google from './auth/google'
import Kakao from './auth/kakao'
import Entrance from './pages/entrance'
import Futsal from './pages/futsal'
import Main from './pages/main'
import MatchList from './pages/matchList'
import Mypage from './pages/mypage'
import Post from './pages/post'
import PremierLeague from './pages/premierLeague'
import Review from './pages/review'
import Signup from './pages/signup'
import Write from './pages/write'
import Navbar from './components/navbar'
import NavbarChange from './components/navbarChange'
import MapSearch from './components/map/mapSearch'
import Top from './components/Top'
import ScrollToTop from './components/scrollTop'
import EditWrite from './components/editWrite'

function App() {
  // 로그인 정보 저장
  let userInfo = store.getState()
  console.log(userInfo)

  const [isLogin, setIsLogin] = useState(false)
  // 지역선택 드롭박스를 위한 상태
  const [region1, setRegion1] = useState('')
  const [region2, setRegion2] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)

  const [editPost, setEditPost] = useState(false)
  // console.log(editPost)

  // 스크롤 이벤트
  // useEffect(() => {
  //   window.addEventListener('scroll', scrollPositionHandler)
  //   return () => {
  //     window.removeEventListener('scroll', scrollPositionHandler)
  //   }
  // },[])

  

  // // 스크롤 시 위치를 상태값에 저장하는 코드.
  // const scrollPositionHandler = () => {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  // }

  // // element가 스크린 아래쪽에 있는지 확인하는 코드
  // const isElementUnderBottom = (elem, triggerDiff) => {
  //   const { top } = elem.getBoundingClientRect()
  //   const { innerHeight } = window
  //   return top > innerHeight + (triggerDiff || 0)
  // }

  // 스크롤 이벤트 발생시 활성화되는 함수
  // const handleScroll = () => {
  //   const elems = document.querySelectorAll('.scroll')
  //   elems.forEach((elem) => {
  //     if (isElementUnderBottom(elem, -30)) {
  //       elem.style.opacity = '0'
  //       elem.style.transform = 'translateY(40px)'
  //     } else {
  //       elem.style.opacity = '1'
  //       elem.style.transform = 'translateY(0px)'
  //     }
  //   })
  // }
  // window.addEventListener('scroll', handleScroll)

  useEffect(() => {
    if (userInfo.loginSuccess !== undefined) {
      setIsLogin(true)
      setRegion1(userInfo.loginSuccess.userData.homeground.split(' ')[0])
      setRegion2(userInfo.loginSuccess.userData.homeground.split(' ')[1])
    } else {
      setIsLogin(false)
    }
  },[])

  const handleRegion1 = (e) => {
    setRegion1(e.target.value)
  }
  const handleRegion2 = (e) => {
    setRegion2(e.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        {scrollPosition > 60 ? <Top /> : null}
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/entrance" component={Entrance} />
          <Route exact path="/futsal">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Futsal 
            handleRegion1={handleRegion1}
            handleRegion2={handleRegion2}
            region1={region1}
            region2={region2}
            />
          </Route>
          <Route exact path="/map">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <MapSearch />
          </Route>
          <Route exact path="/review">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Review
              userInfo={userInfo}
              handleRegion1={handleRegion1}
              handleRegion2={handleRegion2}
              region1={region1}
              region2={region2}
            />
          </Route>
          <Route exact path="/matchlist">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <MatchList
              handleRegion1={handleRegion1}
              handleRegion2={handleRegion2}
              region1={region1}
              region2={region2}
              setEditPost={setEditPost}
            />
          </Route>
          <Route exact path="/post/:id">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Post 
            userInfo={userInfo} 
            setEditPost={setEditPost}
            />
          </Route>
          <Route exact path="/write">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            { !editPost ? <Write /> : <EditWrite /> }
          </Route>
          <Route exact path="/mypage">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Mypage 
            userInfo={userInfo}
            handleRegion1={handleRegion1}
            handleRegion2={handleRegion2}
            region1={region1}
            region2={region2}
            />
          </Route>
          <Route exact path="/signup">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Signup
              handleRegion1={handleRegion1}
              handleRegion2={handleRegion2}
              region1={region1}
              region2={region2}
            />
          </Route>
          <Route exact path="/premierleague">
            {isLogin ? (
              <NavbarChange 
              isLogin={isLogin} 
              etIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <PremierLeague />
          </Route>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/google" component={Google} />
          <Route exact path="/kakao" component={Kakao} />
        </Switch>
      </Router>
    </>
  )
}

export default App
