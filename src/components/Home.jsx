import React, { useEffect, useState } from 'react';
import {Link } from "react-router-dom";
import LandingImg from '../imgs/shop.png'
import { Headings } from './Components';
import axios from 'axios';

import { connect } from 'react-redux';

import {updateCart} from '../redux_ecom/Reducer'

const Landing = ({classname,img}) => {
    return(
        <>
        <div className="container">
        <div className={classname}>
            <div className="text">
                <h2>
                    Shop With Us
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing. <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <Link className="btn btn-outline-primary" to={'/shop'}>Get Started</Link>
            </div>
            <div className="l_img">
                <img src={img} alt="landing_img" />
            </div>
        </div>
        </div>
        </>
    )
}


export const Items = ({token,isAuthenticated,updateCart}) => {
    const[items,setItems] = useState([]);

    useEffect( ()=> {

        const fetchItems = async () => {
            try {
                const res = await axios.get('https://reactshopee.herokuapp.com/products/');
                console.log(res.data)
                setItems(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchItems();
    }, [token] );



    return(
    <div className="container">


    <div className="row">  
    {
        items === undefined? <h4> Loading </h4>:
        items.slice(0,6).map( (item,index)=> {
            return(
                <div key = {index} className="col-lg-4">
                    {
                        item.images.length === 0? null :
                        <img className = "thumbnail" src={item.images[0].image} alt="..." srcSet="" />

                    }

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
        token : state.AuthReducer.token,
        isAuthenticated : state.AuthReducer.token !== null

    }
  }


const mapDispatchToProps =(dispatch) => {
    return {
      updateCart : (e)=> dispatch(updateCart(e))
    }
  }


const ConnectItems = connect(mapStateToProps,mapDispatchToProps) (Items)


const Testi = () => {

    const [reco, setReco] = useState([])
    useEffect( ()=> {

        const fetchItems = async () => {

            try {
                const res = await axios.get('https://reactshopee.herokuapp.com/recom/');
                // console.log(res.data)
                setReco(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchItems();
    }, [] );


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"> 
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active " data-interval="4000"> 
                        <div className="row">
                    { 
                        reco.slice(0,3).map((item,index) => {
                            return(
                                <div className="col-md-4" key = {index}>
                                <div className="single-box">
                                    <div className="img-area">
                                        {/* <img src={item.recoImageURL} alt="testi_img"/> */}
                                        <img src='https://reactshopee.herokuapp.com/media/summer2.jpg' alt="testi_img"/>

                                    </div>

                                    <div className="img-text">
                                        <h2>{item.recoName}</h2>
                                        <p> {item.recoPost} </p>
                                        <p> {item.recoText} </p>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                          
                    }

                    </div>
                </div>

                        <div className="carousel-item" data-interval="4000"> 
                        <div className="row">
                        { 
                        reco.slice(3,6).map((item,index) => {
                            return(
                                <div className="col-md-4" key = {index}>
                                <div className="single-box">
                                    <div className="img-area">
                                        <img src={item.recoImageURL} alt="testi_img"/>
                                    </div>

                                    <div className="img-text">
                                        <h2>{item.recoName}</h2>
                                        <p> {item.recoPost} </p>
                                        <p> {item.recoText} </p>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                          
                    }
                        </div>
                        </div>

                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export const Home = () => {
    return(
        <>
        <Landing classname = "landing"
        img = {LandingImg}
        />

        <Headings title = "Our Items" />
        <ConnectItems />
        
        <Headings title = "What People Are Saying" />
        <Testi />
        </>
    )
}