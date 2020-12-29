import React from 'react';
import './App.css';
import {Navbar,Home, Shop,PostDetail,Footer,CartItems,Checkout,NewLogout,Registration} from './components';
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from './store/actions/auth'
import { useEffect } from 'react';

const App = ({onTryAutoSignup}) =>{

  useEffect (()=> onTryAutoSignup())

  return (

    <>
    {/* {console.log("isAuthenticated" + isAuthenticated)} */}
    <BrowserRouter >
    <Navbar />
      <Switch>
      <Route exact path = '/' component = {Home}/>
        <Route exact path = '/shop' component = {Shop}/>
        <Route exact path = '/register' component = {Registration}/>
        <Route exact path = '/logout' component = {NewLogout}/>
        <Route exact path = '/cartitems' component = {CartItems}/>
        <Route exact path = '/checkout' component = {Checkout}/>
        <Route exact path = '/detail/:id' component = {PostDetail}/>
        <Redirect to  ="/" />
      </Switch>
    </BrowserRouter>
   <Footer />

   </ >
  );
}



const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default connect(null,mapDispatchToProps) (App);
