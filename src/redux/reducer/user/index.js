import {combineReducers} from "redux";
import userTodo from "./UserReducer";


const userReducer = combineReducers({
    userTodo
})

export default userReducer