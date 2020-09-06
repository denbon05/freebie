import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';
import '../css/NavBar.css';
import logo from '../images/logo.png';

const mapStateToProps = (state) => {
  const { linksNavState: { linksById, allIds } } = state;
  const links = allIds.map((id) => linksById[id]);
  return { links };
};

const actionCreators = {
  clickOnNavLink: actions.clickOnNavLink,
};

class NavBar extends React.Component {
  renderLinkNav() {
    const { links, clickOnNavLink } = this.props;
    return links.map(({ state, id, text }) => {
      const classes = cn({
        activeNavLink: state === 'active',
        disabled: state === 'active',
      });
      return (
        <Nav.Link
          onClick={() => clickOnNavLink({ id })}
          className={classes}
          key={id}
          href={`#${id}`}
        >
          {text}
        </Nav.Link>
      );
    });
  }

  render() {

    return (
      <div className="bgHeader">
        <Navbar>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="133"
              height="45"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {this.renderLinkNav()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div id="allSearchForm">
          <div className="containerForm">
            <h1 id="hSearchForm">I'm looking for..</h1>
            <Form id="searchForm">
              <Form.Control type="search" placeholder="Enter a Job Description" />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button id="buttonSearch" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NavBar);
