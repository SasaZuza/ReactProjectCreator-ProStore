import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
import config from '../../config/fbConfig'



class CreateProject extends Component {

    state = {
        title: '',
        content: '',
        image: '',
        imageURL: '',        
    }
    
    // Functions for handeling events (onClick and onSubmit):

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    // [e.target.id] - gets the events id (title or content)
    // e.target.value - targets the value that is entered
    
    handleSumbit = (e) => {
        e.preventDefault();        
        this.props.createProject(this.state)
        this.props.history.push('/');
    }
    // Outputs what ever is typed as email or password
    // After submiting new project user is redirected to home page

    
    // Function that handels the importing image for project:

    handleUploadSuccess = filename => {
        this.setState({
            image: filename,            
        })
        firebase.storage().ref('projectIMG').child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }))
    }


  render() {

    // Destructuring to get 'auth' from mapStateToProps
    const { auth } = this.props;

    // If user is not loged in redirect to 'signin' page and if it is return code bellow
    if (!auth.uid) return <Redirect to='/signin'/>

    return (

      <div className="container">

        <form onSubmit={this.handleSumbit} className="create-form">
            <h5 className="grey-text text-darken-3">Create New Project</h5>
            <br/> 

            {/* Importing image into project */}
            <div className="image-container">    
                {this.state.image && <img className="image-props" src={this.state.imageURL}/>}
                <br/>
                <FileUploader
                    accept="image/*"
                    name='image'
                    storageRef={firebase.storage().ref('projectIMG')}                    
                    onUploadSuccess={this.handleUploadSuccess}
                />
            </div>

            <div className="input-field">
                <label htmlFor="title">Project Title</label>
                <input type="text" id="title" onChange={this.handleChange}/>
            </div>

            <div className="input-field">
                <label htmlFor="content">Project Content</label>
                <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            </div>

            <div className="input-field">
                <button className="btn red lighten-1 z-depth-0">Create</button>
            </div>

        </form>

      </div>

    )
  }
}

const mapStateToProps = (state) => {    
    return {        
        auth: state.firebase.auth
    }
}
// function that take data from rootReducer and projectReducer
// auth: state.firebase.auth - takes data from auth reducers


// This function will be called when we use dispatch
// It will cretae new project, make asinc call and carry on with dispatch as regular
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateProject)
// calling connect inside this component
