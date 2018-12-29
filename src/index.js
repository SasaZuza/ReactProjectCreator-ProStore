import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'

// Created Redux store and added root reducer into store
const store = createStore(rootReducer, 
    
    // compose is element that add some extra features to redux store
    // In this case it's connecting app to firebase and firestore
    compose(    
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    // We add those properties to use data from firebase to our App as a user data
    // userProfile: 'users' - define where user data is stored on database
    )
);
// applyMiddleware(thunk) are implemented as a second parameter of Redux store
// withExtraArgument({getFirebase, getFirestore}) - adds firebase and firestore to app


// This will make app behave better (after figuring that user is loged it will show link only for loged users and in reverce)
store.firebaseAuthIsReady.then( () => {
    // Wrapping up React app into Provider that allows using of Redux
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
