import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faEdit,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

class UserList extends Component {

    render() {
        const {showDetail,deleteData,editeData} = this.props
        const listUser = this.props.users.map((value)=> {
           return(
               <tr className="d-flex">
                    <td className="col-3 border-top-0 border-right">{value.username}</td>
                    <td className="col-3 border-top-0 border-left-0 border-right">{value.email}</td>
                    <td className="col-3 border-top-0 border-left-0 border-right">{value.name}</td>
                   <td className="col-3 border-top-0 border-left-0 border-right">
                       <Button className="bg-success m-1 border-0" onClick={()=>editeData(value)}><FontAwesomeIcon icon={faEdit} /></Button>
                       <Button className="bg-danger m-1 border-0" onClick={()=>deleteData(value.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                       <Button className="bg-primary m-1 border-0" onClick={()=>showDetail(value)}><FontAwesomeIcon icon={faInfoCircle} /></Button>
                   </td>
               </tr>
           )
        })
        return (
            <Table striped hover size="sm">
                <thead>
                <tr className="d-flex">
                    <th className="col-3 border-bottom-0 border-right">Username</th>
                    <th className="col-3 border-bottom-0 border-left-0 border-right">Email</th>
                    <th className="col-3 border-bottom-0 border-left-0 border-right">Name</th>
                    <th className="col-3 border-bottom-0
                     border-left-0 border-right">Action</th>
                </tr>
                </thead>
                <tbody>
                {listUser}
                </tbody>
            </Table>
        );
    }
}


const mapStateToProps = (state)=>{
    return{
        users : state.userReducer.userTodo.users
    }
}

export default connect(mapStateToProps,null)(UserList);