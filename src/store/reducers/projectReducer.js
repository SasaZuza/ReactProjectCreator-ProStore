// This is initial state for projects
const initState = {
    projects: [
    {id: '1', title: 'project 1', content: 'blah bla bla blah'},
    {id: '2', title: 'project 2', content: 'blah bla bla blah'},
    {id: '3', title: 'project 3', content: 'blah bla bla blah'}
    ]
}

// This reducer returns initial state from above
const projectReducer = (state = initState, action) => {
    
    // Inspecting of what type is action in 'projectActions.js' component 'dispatch' method
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('project created', action.project)
            // If it's of type as bellow we console log that content
            return state;

        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            // If error occur we console log that
            return state;

        default:
            return state;
    }    
}

export default projectReducer