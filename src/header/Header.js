import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {LinkContainer, IndexLinkContainer} from '../react-router-bootstrap-v4'
import st33v from '../st33v.png'
import './header.css'

const Header = () => (
    <Navbar inverse collapseOnSelect className="Header">
        <Navbar.Header>
            <Navbar.Brand>
                <h1>
                    <NavLink to="/">
                        <img src={st33v} className="Header-logo" alt="rim"/>
                        Steve's Opinionated Starter
                    </NavLink>
                </h1>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <IndexLinkContainer to="/">
                    <NavItem>Home</NavItem>
                </IndexLinkContainer>
                <NavDropdown title="People" id="p-dropdown">
                    <LinkContainer to="/people">
                        <MenuItem>People Search</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/edit">
                        <MenuItem>Edit Form</MenuItem>
                    </LinkContainer>
                </NavDropdown>

                <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                </LinkContainer>

                <LinkContainer to="/contact">
                    <NavItem>Contact</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export {Header}
