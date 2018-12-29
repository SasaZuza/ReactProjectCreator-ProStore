export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
        // make async call to database (will do that later)

        // Gets connection to firestore database
        const firestore = getFirestore();

        // Gets connection to firebase profile info
        const profile = getState().firebase.profile;

        // Geting author id from firebase
        const authorId = getState().firebase.auth.uid;
        
        // Connects to database collection and add new data to it
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            // After call to database we use dispatch method to create project
            dispatch({type:'CREATE_PROJECT', project});
        }).catch((err) => {
            // If some error occurs
            dispatch({type:'CREATE_PROJECT_ERROR', err});
        })
        
    }
};