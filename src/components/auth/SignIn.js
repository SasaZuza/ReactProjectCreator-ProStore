import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }
    
    // Functions for handeling events (onClick and onSubmit)

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    // [e.target.id] - gets the events id (password or email)
    // e.target.value - targets the value that is entered
    
    handleSumbit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }
    // Outputs what ever is typed as email or password and making connection to Firebase
    // It checks is there account wht that credentials (email & password) 

  render() {

    // Destructuring to check is there an error at login andd to display it inside return statement bellow and auth
    const { authError, auth } = this.props;

    // If user is loged in redirect to 'home page' and if it's not return code bellow
    if (auth.uid) return <Redirect to='/'/>

    return (

      <div className="container">

        <form onSubmit={this.handleSumbit} className="white">
            <h5 className="grey-text text-darken-3">SIGN IN</h5>

            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <button className="btn red lighten-1 z-depth-0">SIGN IN</button>
                <div className="red-text center">
                    {/* If there is error return it if not return null */}
                    { authError ? <p>{authError}</p> : null }
                </div>
            </div>

        </form>

      </div>

    )
  }
}

// Function that allows to see the outh Error
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
// auth: state.firebase.auth - takes data from auth reducers

// Making connection to 'authActions.js' component to take credentials from it
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignIn)
