import React, { useEffect, useState } from 'react';

import {Link} from "react-router-dom";
import axios from 'axios';

import Up from '../imgs/up.png'
import Down from '../imgs/down.png'



import {connect} from 'react-redux';
import {fetchDataNav} from '../redux_ecom/Reducer'


const CartItems = ({total_items,total_amount,token,isAuthenticated,fetchDataNav}) => {

    const [items,setItems] = useState([])
    const [response,setResponse] = useState();


    useEffect( () => {
      const fetchData = async () => {
          try {
              const res = await axios.get('https://reactshopee.herokuapp.com/cartitems/',{
                headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Token ${token}`
                }
            });
              setItems(res.data);
              setResponse('')

          } catch (error) {
          }
      }

    if(isAuthenticated !== 'false' )
      fetchData(); 

    },[response,token,isAuthenticated]) 
    

    const update_cart = (e)=> {

      const action = e.target.dataset.action;
      const id = e.target.dataset.product;
      // const auth = e.target.dataset.auth
      
          console.log(e.target.dataset.action)
          const config = {
              headers: {
                  'Content-Type' : 'application/json',
                  Authorization : `Token ${token}`

              }
          };
          const sendData = async () => {
            let abc = ''
              try {
                  const res = await axios.post('https://reactshopee.herokuapp.com/cartitems/',{action,id},config);
                  abc = res.data;
                  console.log(abc)
                  fetchDataNav(token)
            
              } catch (error) {
                  abc = 'error'
              }

              setResponse(abc);
          }
        
          sendData();  

    };
    
    return (
      
      <div className="container">
        <div className="row">
  {   isAuthenticated ?
          items.length === 0 ? 
      <div className="container info">
     <h3> Your Cart is empty. Click below to go to the shop. </h3> 
     <Link className="btn btn-outline-success" to={'/shop'}>Shop</Link>

    </div>
          
          :
          <div className="col-lg-12">
              <div className="box-element">
  
                  <Link  className="btn btn-outline-dark" to="/shop">&#x2190; Continue Shopping</Link>
  
                  <br/>
                  <br/>
                  <table className="table">
            <tbody>
                      <tr>
                          <th><h5>Items: <strong> {total_items} </strong></h5></th>
                          <th><h5>Total:<strong> ${total_amount}</strong></h5></th>
                          <th>
                              <Link  style={{float:"right", margin:"5px"}} className="btn btn-success" to="/checkout">Checkout</Link>
                          </th>
                      </tr>
            </tbody>
  
                  </table>
  
              </div>
  
              <br/>
              <div className="box-element">
                  <div className="cart-row">
                      <div style={{flex:'2'}}></div>
                      <div style={{flex:'2'}}><strong>Item</strong></div>
                      <div style={{flex:'1'}}><strong>Price</strong></div>
                      <div style={{flex:'1'}}><strong>Quantity</strong></div>
                      <div style={{flex:'1'}}><strong>Total</strong></div>
                  </div>
  
        {
          items.map((item,index)=> {
            return (
              <div key = {index} className="cart-row">
              <div style={{flex:'2'}}><img className="row-image" src={item.get_item_img} alt = ".."/></div>
              <div style={{flex:'2'}}><p>{item.get_item_name}</p></div>
              <div style={{flex:'1'}}><p>${item.get_item_price}</p></div>
              <div style={{flex:'1'}}>
                <p className="quantity">{item.quantity}</p>
                <div className="quantity">
                  <img data-product = {item.product} data-action = 'add' data-auth = {isAuthenticated}
                  className="chg-quantity update-cart" 
                  src={Up} alt = ".."

                  onClick = {update_cart}/>
              
                  <img data-product = {item.product} data-action = 'remove' data-auth = {isAuthenticated}
                  className="chg-quantity update-cart" 
                  src={Down} alt = ".." 
                  onClick = {update_cart}/>

                </div>
              </div>
              <div style={{flex:'1'}}><p>${item.get_total}</p></div>
            </div>
            )
          })
        }
  
              </div>
          </div>
    : <div className="container info">
     <h3> Please do register before using this feature. Click below to register. </h3> 
     <Link className="btn btn-outline-success" to={'/register'}>Register</Link>

    </div>
}
      </div>
  
      </div>
    )
  }
 
const mapStateToProps = (state) => {
    return {
        total_items: state.Reducer.total_items,
        total_amount : state.Reducer.total_amount,
        token : state.AuthReducer.token,
        isAuthenticated : state.AuthReducer.token !== null

    }
}

const mapDispatchToProps =(dispatch) => {
  return {
        fetchDataNav : (token)=> dispatch(fetchDataNav(token)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (CartItems);