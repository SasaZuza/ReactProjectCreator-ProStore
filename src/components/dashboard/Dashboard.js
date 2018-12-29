import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {
    render() {

        // console.log(this.props);
        const { projects, auth, notifications } = this.props;

        // If user is not loged in redirect to 'signin' page and if it is return code bellow
        if (!auth.uid) return <Redirect to='/signin'/>
        
        return (
            <div className="dashboard container">
                <div className="row">

                    {/* Lists all projects */}
                    <div className="col s12 m7">
                        <ProjectList projects={projects}/>
                    </div>

                    {/* Lists all notifications */}
                    <div className="col s12 m4 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {    
    return {
        projects: state.firestore.ordered.projects, 
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}
// function that take data from rootReducer and projectReducer
// projects: state.firestore.ordered.projects - takes data from firestore projects database
// auth: state.firebase.auth - takes data from auth reducers
// otifications: state.firestore.ordered.notifications - takes data from notifications collections


// Make connection to collections of database - in this case it's projects and notifications
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt','desc'] },
      { collection: 'notifications', limit: 3, orderBy: ['time','desc'] }  // Limiting to show only last 3 notifications 
    ])
  )(Dashboard)