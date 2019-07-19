import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { GiDandelionFlower } from 'react-icons/gi'

const NavigationBar = (props) => (
  <Navbar expand="sm" variant="dark" bg="dark">
    <Navbar.Brand href="/"><GiDandelionFlower /> Parks Browser</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >
      <Nav className='mr-auto'>
        <Nav.Item><Nav.Link href="/parks">Parks</Nav.Link></Nav.Item>
        {localStorage.token ? <Nav.Item><Nav.Link href="/trips">Trips</Nav.Link></Nav.Item> : null}
        {localStorage.token ? <Nav.Item><Nav.Link href="/pictures">Pictures</Nav.Link></Nav.Item> : null}
      </Nav>
    </Navbar.Collapse>

    {localStorage.token ?
      <Nav className="ml-auto">
        <Nav.Item><Nav.Link name='profile' href="/profile">Profile</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link name='logout' onClick={props.handleLogout}>Logout</Nav.Link></Nav.Item>
        <span> - </span>
        <input type="text" placeholder="Search" aria-label="Search" onChange={e => props.searchChange(e)} />
      </Nav>
      :
      <Nav className="ml-auto">
        <Nav.Item><Nav.Link name='login' href="/login">Login</Nav.Link></Nav.Item>
        <span> - </span>
        <input type="text" placeholder="Search" aria-label="Search" onChange={e => props.searchChange(e)} />
      </Nav>
    }
  </Navbar>
)

export default NavigationBar