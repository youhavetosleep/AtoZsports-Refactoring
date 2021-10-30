import React, { useState,useEffect } from 'react'
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

function App() {
  

  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/entrance" component={Entrance} />
          <Route exact path="/futsal">
            { isLogin ? <NavbarChange 
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            /> : <Navbar /> }
            <Futsal />
          </Route>
          <Route exact path="/map">
          { isLogin ? <NavbarChange 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Map />
          </Route>
          <Route exact path="/review">
          { isLogin ? <NavbarChange
          isLogin={isLogin} 
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Review />
          </Route>
          <Route exact path="/matchlist">
          { isLogin ? <NavbarChange
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <MatchList />
          </Route>
          <Route exact path="/post">
          { isLogin ? <NavbarChange 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Post />
          </Route>
          <Route exact path="/write">
          { isLogin ? <NavbarChange
          isLogin={isLogin} 
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Write />
          </Route>
          <Route exact path="/mypage">
          { isLogin ? <NavbarChange 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Mypage />
          </Route>
          <Route exact path="/signup">
          { isLogin ? <NavbarChange 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
            <Signup />
          </Route>
          <Route exact path="/premierleague">
          { isLogin ? <NavbarChange
          isLogin={isLogin} 
          setIsLogin={setIsLogin}
          /> : <Navbar /> }
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
