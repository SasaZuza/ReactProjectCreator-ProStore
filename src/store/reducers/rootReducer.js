import authReducer from './authReducer'
import projectReducer from './projectReducer'
// This allows combining more reducers into one root reducer:
import { combineReducers } from 'redux'
// Makes sinc data with database and our state:
import { firestoreReducer } from 'redux-firestore';
// Allows connecting auth from firebase to this APP (sign in/out - login/out):
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});
// This is how root reducer is created, combine reducers function is called and imports other reducers
// It returns data stored in other partial reducers snd also funcionality from firebase and firestore


export default rootReducer