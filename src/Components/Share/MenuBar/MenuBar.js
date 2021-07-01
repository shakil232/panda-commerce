import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './MenuBar.css'
import Logo from '../../../images/logo/logo.png'
import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <Navbar className="bg-success fixed-top" expand="lg">
            <Navbar.Brand to="#"><img className="logo ms-2" src={Logo} alt=""/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mx-2 " style={{ maxHeight: '100px' }}  >

                    <Link className=" mx-3 nav"  to="home">Home </Link>
                    <Link className=" mx-3 nav"  to="about">About </Link>
                    <Link className=" mx-3 nav"  to="contact" >Contact </Link>
                    
                </Nav>
                    <Link to="/login" className=" mx-3 log-Btn "> Login </Link>
                    
            </Navbar.Collapse>
        </Navbar>

    );
};

export default MenuBar;