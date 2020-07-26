import axios from 'axios'

const getUsers = async function() {
    let response = await axios.get(
        '/users/',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getUsersById = async function(id){
    let response = await axios.get(
        '/users/'+id,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return response.data
}

const postUser = async function(user){
    let response = await axios.post('/users',
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return response
}

const updateUser = async function(id,user){
    let response = await axios.put('/users/'+id,
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return response
}

const deleteUser = async function(id){
    let response = await axios.delete(
        '/users/'+id,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
    return response
}

export {getUsers,getUsersById,postUser,updateUser,deleteUser}