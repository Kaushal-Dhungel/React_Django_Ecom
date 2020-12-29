import React, { useEffect} from 'react';
import {NavLink,Link} from "react-router-dom";
import CartImg from '../imgs/cart.png'

import {connect} from 'react-redux';

import {fetchDataNav} from '../redux_ecom/Reducer'

const Navbar = ({total_items,isAuthenticated,token,fetchDataNav}) => {

  useEffect( () => {
    
    if(isAuthenticated !== 'false')
    fetchDataNav(token);

  })

return(
    <>
<div className="container-fluid">
    <div className="col10">
    <nav className="navbar navbar-expand-lg navbar navbar-light ">
  <Link className="navbar-brand" to="/cartitems">
    <img src={CartImg} alt="cart_img" srcSet=""/>
    <p> <sup>{total_items}</sup></p>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item ">
        <NavLink className="nav-link" activeClassName= "active_nav" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
    
      <li className="nav-item ">
        <NavLink className="nav-link" activeClassName= "active_nav" to="/shop">Shop</NavLink>
      </li>

      {
        isAuthenticated ? 

        <li className="nav-item ">
        <NavLink className="nav-link" activeClassName= "active_nav" to="/logout">Logout</NavLink>
        </li>
      :
        <li className="nav-item ">
        <NavLink className="nav-link" activeClassName= "active_nav" to="/register">Register</NavLink>
        </li>
      }
      
    </ul>

  </div>
</nav>
    </div>
</div>
    </>
)
}

const mapStateToProps = (state) => {
    return {
        total_items: state.Reducer.total_items,
        change : state.Reducer.change,
        isAuthenticated : state.AuthReducer.token !== null,
        token : state.AuthReducer.token
    }
}

const mapDispatchToProps =(dispatch) => {
  return {
    fetchDataNav : (token)=> dispatch(fetchDataNav(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Navbar);
