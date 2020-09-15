import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import cn from 'classnames';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions/index.js';
import '../css/NavBar.css';
// import '../css/custom.css';
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
      <div className="bgHeader container">
        <Navbar className="row">
          <Navbar.Brand href="#home" className="col-4">
            <img
              src={logo}
              width="133"
              height="45"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav" className="col-8">
            <Nav>
              {this.renderLinkNav()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div id="allSearchForm">
          <div className="containerForm container">            
            <Form id="searchForm" className="row">
              <h1 id="hSearchForm" className="col-8">I'm looking for..</h1>  
              <Form.Control type="search" id="searchInput" size="lg" placeholder="Enter a Job Description" />
              <Button variant="info" id="buttonSearch" type="submit">
                <FontAwesome
                  className='super-crazy-colors'
                  name='search'
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />{' '}
                  Search
              </Button>
              <div key={`inline-checkbox`} className="mb-3">
                <Form.Check inline type='checkbox' className='inlineCheckbox1' label="Full Time" />
                <Form.Check inline type='checkbox' className='inlineCheckbox2' label="Part Time / Casual / Freelance" />
                <Form.Group controlId="formGridState">
                <Form.Control size="sm" as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
              </div>
              
              
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NavBar);
