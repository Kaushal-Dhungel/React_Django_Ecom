import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {updateCart} from '../redux_ecom/Reducer'
import Summer from '../imgs/summer.jpg';

const PostDetail = (props) => {
    const [item,setItem] = useState({})
    const [comment, setComment] = useState([])
    const inputClear = useRef();

    const {token,isAuthenticated,updateCart} = props
    // const { isAuthenticated } = props
    // const { updateCart } = props

    const slug = props.match.params.id 
    
    useEffect( () => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`https://reactshopee.herokuapp.com/products/${slug}/`);
                console.log(res.data)
                setItem(res.data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchItem();
    },[slug]);

    useEffect( () => {
        // const slug = props.match.params.id 
        const fetchComment = async () => {
            try {
                const res = await axios.get(`https://reactshopee.herokuapp.com/comment/`,{
                    params: {
                      id : item.id
                    }
                  });
                console.log('comment')
                console.log(res.data)
                setComment(res.data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchComment();
    },[item]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("auth",isAuthenticated)
        if(isAuthenticated === true)
        {   
        const form = new FormData(e.target);
        const commentText = form.get("comment");
        const product = item.id
        const data = {
            product,
            commentText,

        }

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Token ${token}`
        }
        }

        axios.post('https://reactshopee.herokuapp.com/comment/', data,config)

        .then (response => {console.log("done")
                console.log(response.data)
                const newData = [...comment,response.data]
                console.log(newData)
                setComment(newData)
                }
        )
        
        .catch(error => console.log(error))
      }

    else
      alert("You need to register before performing this action")

      inputClear.current.value = '';
}

    return(

        <>
        <div className="container">

        <div className="post_detail">
            <div className="post_img">
                {/* <img src={item.imageURL} alt="detail_img" srcSet=""/> */}
                <img src={Summer} alt="detail_img" srcSet=""/>

            </div>
            <div className="post_desc">
                <h3> {item.name} </h3>
                <p> <strong> ${item.price} </strong></p>
                <button data-product = {item.id} data-action = "add" data-token = {token} data-auth = {isAuthenticated}
                className="btn btn-outline-secondary add-btn update-cart" onClick = { updateCart}>Add to cart</button>
                <h4>Product Detail</h4>
                <p>{item.desc}
                </p>
            </div>
        </div>
        </div>

        <div className="container">
        
        {
            isAuthenticated ? 
            <form  onSubmit={handleSubmit}>
            <div className="comment">
                <textarea ref = {inputClear} name = 'comment' placeholder ='Enter a comment..' rows="4" cols="35" required /> <br/>
                <input id="form-button" className="btn btn-success btn-block" type="submit" value="Comment"/>
            </div>
            </form>
            :
            <h4 style = {{textAlign:"center", color:"rebeccapurple"}}> Please Register to Comment</h4>
        }

        <br/> <br/>
{        
    comment.map((item,index) => {
        return (
            <div key = {index} className="comment_section">
            <h6> {item.get_person_name}  </h6>
            <p> {item.commentText} </p>
            <p> {`${new Date(item.comment_added).getFullYear()}-
            ${new Date(item.comment_added).getMonth()}-
            ${new Date(item.comment_added).getDate()}, 
            ${new Date(item.comment_added).getHours()}:
            ${new Date(item.comment_added).getMinutes()}:
            ${new Date(item.comment_added).getSeconds()}s
            `} 
            </p>
            <hr/>
        </div>
        )
    })        
}
        </div>

        </>
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

  export default connect (mapStateToProps,mapDispatchToProps) (PostDetail)