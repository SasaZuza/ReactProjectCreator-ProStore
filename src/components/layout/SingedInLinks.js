import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    
    return (
        <ul className="right">
            <li> <NavLink to='/create'> NEW PROJECT </NavLink> </li>

            {/* When someone clicks the log out it will call function for signing out */}
            <li> <a onClick={props.signOut}> LOG OUT </a> </li>

            <li> <NavLink to='/' className='btn btn-floating red lighten-1'> 
                {props.profile.initials}
            </NavLink> </li>
        </ul>
    )
}

// Making connection to 'authReducer.js' to dispatch signout option 
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps) (SignedInLinks)