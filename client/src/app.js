import React from 'react'
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

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/entrance" component={Entrance} />
          <Route exact path="/futsal" component={Futsal} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/review" component={Review} />
          <Route exact path="/matchlist" component={MatchList} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/write" component={Write} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/premierleague" component={PremierLeague} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/google" component={Google} />
          <Route exact path="/kakao" component={Kakao} />
        </Switch>
      </Router>
    </>
  )
}

export default App
