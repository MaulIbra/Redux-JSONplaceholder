import React, {Component} from 'react';
import {Navbar,Nav,Container} from "react-bootstrap";
import logo from '../assets/logo.png'
import {Link, withRouter} from "react-router-dom";

class HeaderComponent extends Component {

    render() {
        return (

            <Navbar className="bg-white shadow-sm p-3">
                <Container>
                <Navbar.Brand className="mr-5">
                    <img
                        src={logo}
                        width="60"
                        height="60"
                        alt=""
                        className="d-inline-block p-2"
                    />
                    Maulana
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/" className={this.props.history.location.pathname === '/' ? "navigation-text-active" : "navigation-text"}>Home</Link>
                    <Link to="/user" className={this.props.history.location.pathname === '/user' ? "navigation-text-active" : "navigation-text"}>User</Link>
                </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default withRouter(HeaderComponent);