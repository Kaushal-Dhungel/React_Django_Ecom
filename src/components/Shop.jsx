import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';

import {updateCart} from '../redux_ecom/Reducer'

const Category = () => {
    const [cat, setCat] = useState('all');
    const[items,setItems] = useState([]);


    useEffect( ()=> {
        const fetchItems = async () => {
            let url = `http://reactshopee.herokuapp.com/shop/${cat}/`; 

            if(cat === 'all')
                   url =  'http://reactshopee.herokuapp.com/products/';

            try {
                const res = await axios.get(url);  
                console.log(res.data)
                setItems(res.data);
  
            } catch (error) {
                console.log(error);
            }
        }
        fetchItems();
    }, [cat] );
  
    const categories = (e) => {
        setCat(e.target.dataset.action)
    }

    const changefn = () => {
        console.log("hello")
    }

    return(
        <>
        <div className="categories">
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-outline-dark active">
            <input type="radio" name="options" id="all" checked data-action = "all" onClick = {categories} onChange = {changefn} /> All 
        </label>
        <label className="btn btn-outline-dark">
            <input type="radio" name="options" id="summer" data-action = "summer" onClick = {categories} onChange = {changefn} /> Summer
        </label>
        <label className="btn btn-outline-dark">
            <input type="radio" name="options" id="winter" data-action = "winter" onClick = {categories} onChange = {changefn} /> Winter
        </label>
        </div>
        </div>
        

        <ConnectShopItems items = {items} />
        </>
    )
}



export const ShopItems = ({items,isAuthenticated,token,updateCart}) => {
  
    return(
    <div className="container">
  
  
    <div className="row">
        {
        items.map( (item,index)=> {
            return(
                <div key = {index} className="col-lg-4">
                    
                    <img className = "thumbnail" src={item.imageURL} alt="myImg" srcSet="" />
                    <div className="box-element product">
                        <h6><strong> {item.name} </strong></h6>
                        <hr />
                        <button data-product = {item.id} data-action = "add" data-token = {token} data-auth = {isAuthenticated}
                        className="btn btn-outline-secondary add-btn update-cart" onClick = {updateCart}>Add to cart</button>
                        <Link className="btn btn-outline-success" to={`detail/${item.slug}/`}>View</Link>
                        <h4 style={{display: "inlineBlock" ,float:"right"}}>${item.price}</h4>
                    </div>
                </div>
            )
        })
        
        }
  
  </div>
  
  </div>
  )
  }

const mapStateToProps =(state) => {
return {
    isAuthenticated : state.AuthReducer.token !== null,
    token : state.AuthReducer.token,

}
}

  
const mapDispatchToProps =(dispatch) => {
    return {
        updateCart : (e)=> dispatch(updateCart(e))
    }
}


const ConnectShopItems = connect(mapStateToProps,mapDispatchToProps) (ShopItems)

export const Shop = () => {
    return(
        <>
        
        <Category />

        </>
    )
}