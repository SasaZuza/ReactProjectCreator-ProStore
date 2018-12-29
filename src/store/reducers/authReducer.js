const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {

    // Inspecting of what type is action in 'authActions.js' component 'dispatch' method
    switch(action.type) {

        // If there is error while loging return state and authError
        case 'LOGIN_ERROR' :
            console.log('login error'); 
            return {
                ...state,
                authError: 'Login failed'
            }
        
        // If there is no error while loging return state and authError will be null
        case 'LOGIN_SUCCES' :
            console.log('login succes');
            return {
                ...state,
                authError: null
            }
        
        // Case when user successfuly signs out from app
        case 'SIGNOUT_SUCCES' :
            console.log('signout success');
            return state;
        
        // Case when user successfuly signs up to app
        case 'SIGNUP_SUCCESS' :
            console.log('signup succes');
            return {
                ...state,
                authError:null
            }
        
        case 'SIGNUP_ERROR' :
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }

        // If none of those occurs return only state
        default: 
            return state;
    }
   
}

export default authReducer