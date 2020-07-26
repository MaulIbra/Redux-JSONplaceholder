import React, {Component} from 'react';
import {Button, Form, Modal,Col} from "react-bootstrap";
import {connect} from "react-redux";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            username: "",
            email: "",
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            lat: "",
            lng: "",
            phone: "",
            website: "",
            companyName: "",
            catchPhrase: "",
            bs: ""
        }
    }

    handleChangeInput = (event) =>{
        const name = event.target.name
        this.setState({...this.state, [name] : event.target.value})
    }

    validationForm = ()=>{
        return (this.state.name !== "" && this.state.username !== "" && this.state.email !== "" && this.state.street !== "" && this.state.suite !== "" && this.state.city !== ""&& this.state.zipcode !== "" && this.state.lat !== "" && this.state.lng !== "" && this.state.phone !== "" && this.state.website !== "" && this.state.companyName !== "" && this.state.catchPhrase !== "" && this.state.bs !== "")
    }

    handleSubmit = (type,id)=>{
        let user = {
            id: new Date().getTime().toString() + Math.floor(Math.random()*1000000),
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            address: {
                street: this.state.street,
                suite: this.state.suite,
                city: this.state.city,
                zipcode: this.state.zipcode,
                geo: {
                    lat: this.state.lat ,
                    lng: this.state.lng
                }
            },
            phone: this.state.phone,
            website: this.state.website,
            company: {
                name: this.state.companyName,
                catchPhrase: this.state.catchPhrase,
                bs: this.state.bs
            }
        }
        if (type === "Create"){
            this.props.create(user)
        }else{
            this.props.update(id,user)
        }
    }

    reset = () => {
        this.setState({
            ...this.state,
            name : "",
            username: "",
            email: "",
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            lat: "",
            lng: "",
            phone: "",
            website: "",
            companyName: "",
            catchPhrase: "",
            bs: ""
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.editedData !== this.props.editedData) && Object.keys(this.props.editedData).length!==0){
            this.setState({
                ...this.state,
                name : this.props.editedData.name,
                username: this.props.editedData.username,
                email: this.props.editedData.email,
                street: this.props.editedData.address.street,
                suite: this.props.editedData.address.suite,
                city: this.props.editedData.address.city,
                zipcode: this.props.editedData.address.zipcode,
                lat: this.props.editedData.address.geo.lat,
                lng: this.props.editedData.address.geo.lng,
                phone: this.props.editedData.phone,
                website: this.props.editedData.website,
                companyName: this.props.editedData.company.name,
                catchPhrase: this.props.editedData.company.catchPhrase,
                bs: this.props.editedData.company.bs
            })
        }else if ((Object.keys(prevProps.editedData).length !== 0) && Object.keys(this.props.editedData).length===0){
            this.reset()
        }
    }

    render() {
        const {formType,show,hide,editedData} = this.props
        let disable,methodClick
        if (formType === "Edit"){
            disable = false
            methodClick = ()=>this.handleSubmit("Add",editedData.id)
        }else if (formType === "Create"){
            disable = false
            methodClick = ()=>this.handleSubmit("Create")
        }else{
            disable = true
        }
        return (
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{formType} Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Name" name="name" value={this.state.name} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Username" name="username" value={this.state.username} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Email" name="email" value={this.state.email} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Street" name="street" value={this.state.street} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="City" name="city" value={this.state.city} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Suite</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Suite" name="suite" value={this.state.suite} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Zip Code" name="zipcode" value={this.state.zipcode} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Latitude" name="lat" value={this.state.lat} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Longitude" name="lng" value={this.state.lng} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="phone" name="phone" value={this.state.phone} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Website</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Website" name="website" value={this.state.website} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Company Name" name="companyName" value={this.state.companyName} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Catch Phrase</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Catch Phrase" name="catchPhrase" value={this.state.catchPhrase} onChange={this.handleChangeInput}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Bs</Form.Label>
                                <Form.Control type="text" disabled={disable} placeholder="Bs" name="bs" value={this.state.bs} onChange={this.handleChangeInput}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {formType === "Detail" ? "" : <Button  variant="success" disabled={!this.validationForm()} onClick={methodClick}>{formType}</Button>}
                    <Button variant="primary" onClick={hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        users : state.userReducer.userTodo.users
    }
}

export default connect(mapStateToProps,null)(UserForm);