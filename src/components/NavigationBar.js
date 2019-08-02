import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { GiDandelionFlower } from "react-icons/gi";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

const NavigationBar = props => {
  const [redirect, setRedirect] = useState(false);

  const searchChange = e => {
    if (!(props.location.pathname === "/parks" || props.location.pathname === "/")) {
      setRedirect(true);
    }
    props.searchChange(e.target.value);
  };
  const handleFilter = e => {
    if (!(props.location.pathname === "/parks" || props.location.pathname === "/")) {
      setRedirect(true);
    }
    props.handleFilter(e.target.name);
    setRedirect(false);
  };
  return (
    <Navbar expand="sm" variant="dark" bg="dark">
      {redirect && <Redirect to="/parks" />}
      <Navbar.Brand href="/">
        <GiDandelionFlower /> Parks Browser
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="mt-1">
            <Nav.Link href="/map">Map</Nav.Link>
          </Nav.Item>
          <React.Fragment>
            <Dropdown className="ml-2 mt-1" title="National Parks">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Filter: {props.filter}{" "}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item name="National Park" onClick={e => handleFilter(e)}>
                  National Parks
                </Dropdown.Item>
                <Dropdown.Item name="National Monument" onClick={e => handleFilter(e)}>
                  National Monuments
                </Dropdown.Item>
                <Dropdown.Item name="Preserve" onClick={e => handleFilter(e)}>
                  National Preserves
                </Dropdown.Item>
                <Dropdown.Item name="National Historic Site" onClick={e => handleFilter(e)}>
                  Historic Sites
                </Dropdown.Item>
                <Dropdown.Item name="National Historical Park" onClick={e => handleFilter(e)}>
                  Historic Parks
                </Dropdown.Item>
                <Dropdown.Item name="Others" onClick={e => handleFilter(e)}>
                  Others
                </Dropdown.Item>
                <Dropdown.Item name="All" onClick={e => handleFilter(e)}>
                  All Parks
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form inline>
              <FormControl
                className="ml-2 mt-1"
                type="text"
                placeholder="Search..."
                aria-label="Search"
                onChange={searchChange}
              />
            </Form>
          </React.Fragment>
        </Nav>
      </Navbar.Collapse>
      <Nav className="ml-auto">
        {props.user ? (
          <React.Fragment>
            <Nav.Item>
              <Nav.Link href="/trips">Trips</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link name="profile" href="/profile">
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link name="logout" onClick={props.handleLogout}>
                Logout
              </Nav.Link>
            </Nav.Item>
          </React.Fragment>
        ) : (
          <Nav.Item>
            <Nav.Link name="login" href="/login">
              Login
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

let mapStateToProps = state =>
  state.user.loggedUser
    ? { user: state.user.loggedUser.id, filter: state.park.filter }
    : { filter: state.park.filter };
let mapDispatchToProps = dispatch => ({
  searchChange: value => dispatch({ type: "CHANGE_SEARCH", value })
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavigationBar)
);
