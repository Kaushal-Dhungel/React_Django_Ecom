import React from 'react';

import axios from 'axios';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


export const Headings = ({title})=> {
  return (
      <div className="head">
      <h2 className = "headings">{title}</h2>
      </div>
  )
} 


export const Footer = () => {
  return (
    <div className="footer">
      <hr/>
      © 2020 Copyright: Shopee
    </div>
  )
} 

const LogOut = ({onAuthLogOut}) => {

  let history = useHistory()
  return (
    <div className="logout">
      <h2>click here to log out</h2>
      <br/>
      <br/>
      <button onClick = {()=> {onAuthLogOut()
                        history.push('/')
      }}> Log out</button>
    </div>
  )
}
const mapDispatchToProps =(dispatch) => {
  return {
      onAuthLogOut: () => dispatch(actions.logout()),
  }
}

export const NewLogout = connect(null,mapDispatchToProps) (LogOut)

export const update_cart = (e)=> {
  const action = e.target.dataset.action;
  const id = e.target.dataset.product;
  console.log(e.dataset)
  const config = {
      headers: {
          'Content-Type' : 'application/json'
      }
  };
  const sendData = async () => {
      try {
          const res = await axios.post('http://reactshopee.herokuapp.com/cartitems/',{action,id},config);
          console.log(res.data)
      } catch (error) {
          console.log(error)

      }
  }

sendData();

};

