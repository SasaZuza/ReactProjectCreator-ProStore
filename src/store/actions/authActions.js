
export const signIn = (credentials) => {

    // getFirebase will make connection when signing in to Firestore
    return (dispatch, getState, { getFirebase }) => {

        // Const that will make connection to firebase when signing in
        const firebase = getFirebase();

        // Enrering firebase email and password will connect also user to this app like that
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( () => {
            dispatch({ type: 'LOGIN_SUCCES' });
        }).catch( (err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
        // After entering email and password it will create call to firebase and make login or output an error 
    }
}


export const signOut = () => {

    // getFirebase will make connection when signing out from Firestore
    return (dispatch, getState, { getFirebase }) => { 

        // Const that will make connection to firebase when signing out
        const firebase = getFirebase();

        // Dispatching a action
        firebase.auth().signOut().then( () => {
            dispatch({ type: 'SIGNOUT_SUCCES' });
        });

    }
}


export const signUp = (newUser) => {
    // getFirebase will make connection when signing up to Firestore
    // It will use that account and create new document to store users info
    return (dispatch, getState, { getFirebase, getFirestore }) => {

         // Const that will make connection to firebase and firestore when signing up
         const firebase = getFirebase();
         const firestore = getFirestore();

         //Method that comunicate with firebase and create new user
         firebase.auth().createUserWithEmailAndPassword(
             newUser.email,
             newUser.password
         ).then( (resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
            // Creates new collection 'users' and get 'id' from user that is created above
            // With set method we store some properties for every user in that new document
         }).then( () => {
            // When we create user and file in database we dispatch this bellow 
            dispatch({ type: 'SIGNUP_SUCCESS' })
         }).catch( (err) =>{
            // If error occurs we dispatch this 
            dispatch({ type: 'SIGNUP_ERROR', err })
         })
    }
}