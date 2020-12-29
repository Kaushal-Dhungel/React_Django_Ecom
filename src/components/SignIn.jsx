import React, { useState, useEffect } from "react";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Default } from "react-spinners-css";
import {Redirect} from 'react-router-dom';


function Signup({ onAuthSignup,setError }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("username");
    const email = form.get("email");
    const password1 = form.get("password1");
    const password2 = form.get("password2");

    if(password1 !== password2){
      setError("Your password1 and password2 didn't match.")
      return
    }

    if(password1.length < 8) {
      setError("Your password must be 8 characters long.")
      return
    }
    
    onAuthSignup(name, email, password1, password2);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="contact_form" action="#">
          <input
            name="username"
            className="form_input"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            name="email"
            className="form_input"
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <input
            name="password1"
            className="form_input"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <input
            name="password2"
            className="form_input"
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
          />
          <button className="contact_button">Signup</button>
        </form>
      </div>
    </>
  );
}

function Login({ onAuthLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("username");
    const password = form.get("password");

    onAuthLogin(name, password);
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="contact_form" action="#">
          <input
            name="username"
            className="form_input"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            name="password"
            className="form_input"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <button className="contact_button">Sign In</button>
        </form>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogin: (username, password) =>
      dispatch(actions.authLogin(username, password)),
    onAuthSignup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    
    setError : (errormsg) => dispatch(actions.authFail(errormsg))
  };
};
const NewSignup = connect(null, mapDispatchToProps)(Signup);
const NewLogin = connect(null, mapDispatchToProps)(Login);

const Register = ({
  errormsg,
  isAuthenticated,
  isLoading,
  clearError,
}) => {
  const [whichRender, setWhichRender] = useState("signup");

  useEffect(() => {
    clearError();
  }, [clearError]);


  return (
      <>
    {
    isAuthenticated ?
    <Redirect to = '/' />
    :
    <>
      <div className="container mt-3">
        <div className="categories_profile">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-outline-dark active">
              <input
                type="radio"
                name="options"
                checked
                onClick={() => {
                  setWhichRender("signup");
                  clearError();
                }}
                readOnly
              />{" "}
              Signup
            </label>
            <label className="btn btn-outline-dark">
              <input
                type="radio"
                name="options"
                onClick={() => {
                  setWhichRender("login");
                  clearError();
                }}
                readOnly
              />{" "}
              Login
            </label>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading_loading">
          <Default color="rgb(230, 43, 83)" size={200} />
        </div>
      ) : (
        <>
          <div className="register_messages ">
            {errormsg !== null ? (
              <p>{errormsg}</p>
            ) : (
              <>
                <p>
                  {" "}
                  Registration Successful. Start Shopping.{" "}
                </p>
                <Link to="/shop" className="btn btn-primary">
                  Visit Profile{" "}
                </Link>
              </>
            )}
          </div>

          <div className="register_area container">
            {whichRender === "signup" ? <NewSignup /> : <NewLogin />}
          </div>
        </>
      )}
    </>
}
</>
  );
};

const mapStateToPropsRegister = (state) => {
  return {
    errormsg: state.AuthReducer.error,
    isAuthenticated: state.AuthReducer.token !== null,
    isLoading: state.AuthReducer.loading,
  };
};

const mapDispatchToPropsRegister = (dispatch) => {
    return {
      clearError: () => dispatch(actions.removeError()),
    };
  };

const Registration = connect(
  mapStateToPropsRegister,
  mapDispatchToPropsRegister
)(Register);
export default Registration;
