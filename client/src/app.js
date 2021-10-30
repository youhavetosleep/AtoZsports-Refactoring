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
  let userInfo = store.getState().user

  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (userInfo.loginSuccess !== undefined) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/entrance" component={Entrance} />
          <Route exact path="/futsal">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Futsal />
          </Route>
          <Route exact path="/map">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <MapSearch />
          </Route>
          <Route exact path="/review">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Review />
          </Route>
          <Route exact path="/matchlist">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <MatchList />
          </Route>
          <Route exact path="/post">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Post />
          </Route>
          <Route exact path="/write">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Write />
          </Route>
          <Route exact path="/mypage">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Mypage />
          </Route>
          <Route exact path="/signup">
            {isLogin ? <NavbarChange /> : <Navbar />}
            <Signup />
          </Route>
          <Route exact path="/premierleague">
            {isLogin ? <NavbarChange /> : <Navbar />}
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
