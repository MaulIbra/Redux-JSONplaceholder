import React, {Component} from 'react';
import MenuList from "./UserList";
import UserForm from "./UserForm";
import { Container} from "react-bootstrap";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import {showAlert} from "../../component/AlertComponent";
import {withRouter} from "react-router-dom";
import {deleteUser, getUsers, postUser, updateUser} from "./UserService";

class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail : false,
            formType : "",
            editedData : {}
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = ()=>{
        getUsers().then((result)=>{
            this.props.setUsers(result)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something Error',
            })
        })
    }


    createData = (user)=>{
        postUser(user).then((response)=>{
            if (response.status===201){
                showAlert('success','Successfull Insert User')
                this.setState({
                    ...this.state,
                    editedData : {},
                    showDetail : !this.state.showDetail,
                })
                this.props.addUser(response.data)
            }
        }).catch((error)=>{
            showAlert('error','Error Insert data')
            this.setState({
                ...this.state,
                showDetail : !this.state.showDetail
            })
        })
    }

    updateData = (id,user)=>{
        updateUser(id,user).then((response)=>{
            if (response.status === 200){
                showAlert('success','Successfull Update Menu')
                this.setState({
                    ...this.state,
                    editedData : {},
                    showDetail : !this.state.showDetail
                })
                this.props.updtUser(user,id)
            }
        }).catch((error)=>{
            showAlert('error','Error Edited data')
            this.setState({
                ...this.state,
                showDetail : !this.state.showDetail
            })
        })
    }

    deleteData = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                deleteUser(id).then((result)=>{
                    if (result.status === 200){
                        this.props.delUser(id)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                }).catch((error)=>{
                    Swal.fire(
                            'Error!',
                            'Error Deleted File',
                            'error'
                        )
                })
                console.log()
            }
        })
    }


    showModals = (formType,value)=>{
        if (formType === "Create"){
            value = {}
        }
        this.setState({
            ...this.state,
            showDetail : !this.state.showDetail,
            editedData : value,
            formType : formType
        })
    }

    hideDetail = ()=>{
        this.setState({
            ...this.state,
            editedData : {},
            showDetail : !this.state.showDetail
        })
    }

    render() {
        return (
            <Container className="p-5">
                <div className="container-label border-bottom">
                    List User
                </div>
                <div className="table-bordered container-table">
                    <UserForm
                        formType={this.state.formType}
                        editedData={this.state.editedData}
                        create={(menu)=>this.createData(menu)}
                        update={(menuId,menu)=>this.updateData(menuId,menu)}
                        show={this.state.showDetail}
                        hide={this.hideDetail}
                    />
                    <div className="container-action">
                        <Button
                            variant="outline-primary"
                            onClick={()=>this.showModals("Create")}>
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>Add User
                        </Button>
                    </div>
                    <div className="container-list">
                        <MenuList
                            editeData={(value)=>this.showModals("Edit",value)}
                            deleteData={(id)=>this.deleteData(id)}
                            showDetail = {(value)=>{this.showModals("Detail",value)}}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}


const mapStateToProps = (state) =>{
    return{
        users : state.userReducer.userTodo.users
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setUsers : (val) => dispatch(
            {
                type : 'SET_USERS',
                payload : val
            }
        ),
        delUser : (val) => dispatch(
            {
                type : 'DELETE_USER',
                payload : val
            }
        ),
        addUser : (val) => dispatch(
            {
                type : 'ADD_USER',
                payload : val
            }
        ),
        updtUser : (val,id) => dispatch(
            {
                type : 'UPDATE_USER',
                payload : val,
                id : id
            }
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserContainer));