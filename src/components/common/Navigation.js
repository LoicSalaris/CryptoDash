import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css'

class Navigation extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Heuritech CryptoDash</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/list">
                            <NavItem>List</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/settings">
                            <NavItem>Settings</NavItem>
                        </LinkContainer>
                        <img src="https://www3.heuritech.com/wp-content/uploads/2018/12/logo-heuritech-v2-ia-for-fashion.png" alt="Heuritech" class="logo"/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;