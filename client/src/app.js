import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyle from './globalStyle/globalStyle'
import Entrance from './pages/entrance'
import Futsal from './pages/futsal'
import Main from './pages/main'
import Map from './pages/map'
import MatchList from './pages/matchList'
import Mypage from './pages/mypage'
import Post from './pages/post'
import PremierLeague from './pages/premierLeague'
import Review from './pages/review'
import Signup from './pages/signup'
import Write from './pages/write'
import Auth from './auth/auth'
import Google from './auth/google'
import Kakao from './auth/kakao'
import Navbar from './components/navbar'
import Footer from './components/footer'
import NavbarChange from './components/navbarChange'
import store from './store/store'
import MapSearch from './components/map/mapSearch'

function App() {
  // 지역선택 드롭박스를 위한 상태
  const [region1, setRegion1] = useState('세종')
  const [region2, setRegion2] = useState('전동면')

  // 로그인 정보 저장
  let userInfo = store.getState().user
  console.log(userInfo)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (userInfo.loginSuccess !== undefined) {

      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

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
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/entrance" component={Entrance} />
          <Route exact path="/futsal">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Futsal />
          </Route>
          <Route exact path="/map">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <MapSearch />
          </Route>
          <Route exact path="/review">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Review />
          </Route>
          <Route exact path="/matchlist">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <MatchList
              handleRegion1={handleRegion1}
              handleRegion2={handleRegion2}
              region1={region1}
              region2={region2}
            />
          </Route>
          <Route exact path="/post">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Post />
          </Route>
          <Route exact path="/write">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Write />
          </Route>
          <Route exact path="/mypage">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navbar />
            )}
            <Mypage />
          </Route>
          <Route exact path="/signup">
            {isLogin ? (
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
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
              <NavbarChange isLogin={isLogin} setIsLogin={setIsLogin} />
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
