import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from './cmps/Header/Header'
import { Footer } from './cmps/Footer/Footer'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/SignUp/SignUp'
import { Main } from './pages/Main/Main'
import { Edit } from './pages/Edit/Edit'
import { Details } from './pages/Details/Details'
import  Cart  from './pages/Cart/Cart'
import { Profile } from './pages/Profile/Profile'
import './App.scss';

function App() {
  return (
    <div className="App">

      <Router>
        <Header></Header>
        <div className="app-container">
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={SignUp} path="/SignUp" />
            <Route component={Main} path="/shop/:type" />
            <Route component={Main} path="/shop" />
            <Route component={Edit} path="/item/edit/:id" />
            <Route component={Edit} path="/item/edit" />
            <Route component={Details} path="/item/:id" />
            <Route component={Profile} path="/profile" />
            <Route component={Cart} path="/Cart" />

            {/* Best way to send props to a route: */}
            {/* <Route render={ (props) => <About { ...props } someProp="popo" /> } path="/about" /> */}
            <Route component={Home} exact path="/" />
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
