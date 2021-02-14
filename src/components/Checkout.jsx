import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import axios from 'axios';

import {connect} from 'react-redux';

import { useHistory } from "react-router-dom";
import {fetchDataNav} from '../redux_ecom/Reducer'
import swal from 'sweetalert'


export const Checkout = ({total_items,total_amount,token,fetchDataNav}) => {

    const [items,setItems] = useState([])

    const history = useHistory()

    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://reactshopee.herokuapp.com/cartitems/',{
                    headers: {
                            "Content-Type" : "application/json",
                            Authorization : `Token ${token}`
                    }
                });
                console.log(res.data)
                setItems(res.data);
  
            } catch (error) {
                console.log(error)
            }
        }
  
        fetchData();
    },[token]);
 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const address = form.get("address");
        const city = form.get("city");
        const state = form.get("state");
        const zipcode = form.get("zipcode");


        const data = {
            address,
            city,
            state,
            zipcode
        }

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Token ${token}`
        }
        }

        axios.post('https://reactshopee.herokuapp.com/shipping/', data,config)

        .then (response => {console.log("done")
                swal("Done", "Transaction Successful", "success");
                fetchDataNav(token);
                history.push('/')
                }
        )
        
        .catch(error => console.log("haha"))
      }
    
    return (
      <div className="container">
        <div className="row">
      <div className="col-lg-6">
          <div className="box-element" id="form-wrapper">
              <form id="form" onSubmit={handleSubmit}>
                  {/* <div id="user-info">
                      <div className="form-field">
                          <input required className="form-control" type="text" name="name" placeholder="Name.."/>
                      </div>
                      <div className="form-field">
                          <input required className="form-control" type="email" name="email" placeholder="Email.."/>
                      </div>
                  </div> */}
                  
                  <div id="shipping-info">
                      <hr/>
                      <p>Shipping Information:</p>
                      <hr/>
                      <div className="form-field">
                          <input className="form-control" type="text" name="address" placeholder="Address.." autoComplete = 'off'/>
                      </div>
                      <div className="form-field">
                          <input className="form-control" type="text" name="city" placeholder="City.." autoComplete = 'off'/>
                      </div>
                      <div className="form-field">
                          <input className="form-control" type="text" name="state" placeholder="State.." autoComplete = 'off'/>
                      </div>
                      <div className="form-field">
                          <input className="form-control" type="text" name="zipcode" placeholder="Zip code.." autoComplete = 'off'/>
                      </div>
                      {/* <div className="form-field">
                          <input className="form-control" type="text" name="country" placeholder="Country.." autoComplete = 'off'/>
                      </div> */}
                  </div>
  
                  <hr/>
                  <input id="form-button" className="btn btn-success btn-block" type="submit" value="Continue"/>
              </form>
          </div>
  
          <br/>
          <div className="box-element hidden" id="payment-info">
              <small>Paypal Options</small>
              <button id = 'make-payment'>Make Payment </button>
          </div>
          
      </div>
  
      <div className="col-lg-6">
          <div className="box-element">
              <Link  className="btn btn-outline-dark" to="/cartitems">&#x2190; Back to Cart</Link>
              <hr/>
              <h3>Order Summary</h3>
              <hr/>
              
              {
                items.map((item,index) => {
                  return(
                    
                    <div key= {index} className="cart-row">
                      <div style={{flex:"2"}}><img className="row-image" src={item.get_item_img} alt = ".."/></div>
                      <div style={{flex:"2"}}><p>{item.get_item_name}</p></div>
                      <div style={{flex:"1"}}><p>${item.get_item_price}</p></div>
                      <div style={{flex:"1"}}><p>{item.quantity}</p></div>
                    </div>
                   
                  )
                })
              }
              <h5>Items: {total_items}  </h5>
              <h5>Total:   $ {total_amount}</h5>
          </div>
      </div>
  </div>
  </div>
  
    )
  }
  
const mapStateToProps = (state) => {
    return {
        total_items: state.Reducer.total_items,
        total_amount : state.Reducer.total_amount,
        token : state.AuthReducer.token
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
      fetchDataNav : (token)=> dispatch(fetchDataNav(token))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (Checkout);