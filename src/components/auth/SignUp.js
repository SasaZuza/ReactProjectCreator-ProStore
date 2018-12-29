import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
        this.props.signUp(this.state)
    }
    // Outputs what ever is typed as email or password

  render() {

    // Destructuring to get 'auth' from mapStateToProps
    const { auth, authError } = this.props;

    // If user is loged in redirect to 'home page' and if it's not return code bellow
    if (auth.uid) return <Redirect to='/'/>

    return (

      <div className="container">

        <form onSubmit={this.handleSumbit} className="white">
            <h5 className="grey-text text-darken-3">SIGN UP</h5>

            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <button className="btn red lighten-1 z-depth-0">SIGN UP</button>
                <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null }
                </div>
            </div>

        </form>

      </div>

    )
  }
}


// Function that allows to redirect to home when user is trying to go to this page and he is logedin
const mapStateToProps = (state) => {
    return {       
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
// auth: state.firebase.auth - takes data from auth reducers


// Function taht connects to 'authActions.js' and take signUp const to create new user to App
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (SignUp)
