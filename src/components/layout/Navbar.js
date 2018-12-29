import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SingedInLinks'
import SignedOutLinks from './SingedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {

    // Destructuring to grab 'auth' from 'mapStateToProp' and assign it to props
    const { auth, profile } = props;
    
    // If user is loged return signed in links if not return signed out links
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks/>;

    return (
        <nav className="nav-wraper grey darken-2">
            <div className="container">
                <Link to='/' className="brand-logo left "> <i className="logo-text">Pro-Store </i> </Link>
                {/* Outputing links const with properies as bellow */}
                {links}
            </div>
        </nav>
    )
}

// Connect navbar to auth properties from firebase
const mapStateToProps = (state) => { 
    console.log(state);   
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
// profile: state.firebase.profile - make acces to profile information


export default connect(mapStateToProps) (Navbar)