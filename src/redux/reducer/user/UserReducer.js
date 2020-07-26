const initialState = {
    users  : [],
}

const userTodo = (state = initialState, action)=> {
    switch (action.type) {
        case 'SET_USERS' :
            return {...state,users : action.payload};
        case 'ADD_USER':
            return {
                ...state,
                users : [...state.users,action.payload]
            }
        case 'DELETE_USER' :
            return {
                users:[
                    ...state.users.filter(user => user.id !== action.payload)
                ]
            }
        case 'UPDATE_USER':
            return {
                users: [
                    ...state.users.filter(user => user.id !== action.id),action.payload
                ]
            }
        default:
            return state
    }
}

export default userTodo