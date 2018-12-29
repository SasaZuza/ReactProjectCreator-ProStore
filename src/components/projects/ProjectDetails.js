import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

function ProjectDetails(props) {
    
    // For destructuring save 'project' and 'auth' to const
    const {project, auth} = props;

    // If user is not loged in redirect to 'signin' page and if it is return code bellow
    if (!auth.uid) return <Redirect to='/signin'/>

    // If project exists return this data and if not return some string in <p> tag
    if (project) {
        return (
        <div className="container section project-details">
        <div className="card z-depth-0">
            <div className="card-content">
            <img className="image-props" src={ project.imageURL }  />
                <span className="card-title"> {project.title} </span>
                <p>{ project.content }</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div>Posted by {project.authorFirstName} {project.authorLastName} </div>
                <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
        </div>
    </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project....</p>
            </div>
        )
    }

}


// Function that is activated with 'connect' option
const mapStateToProps = (state, ownProps) => {
    
    // We store id of ProjectDetails in this const
    const id = ownProps.match.params.id;
    // Path to the projects in database
    const projects = state.firestore.data.projects;
    // If we have projects return it by project id if not return null
    const project = projects ? projects[id] : null
    
    return {
        project: project,
        auth: state.firebase.auth
    }
}
// auth: state.firebase.auth - takes data from auth reducers


// Make connection to collection of database
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
) (ProjectDetails)
