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
      const classes = cn('itemNavLink', {
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
      <div className="headerGrid bgHeader">
        <Navbar className="navBar">
          <Navbar.Brand href="#home" className="brand">
            <img
              src={logo}
              width="133"
              height="45"
              className=""
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse className="containerNavLinks">
            <Nav className="flexNavLinks">
              {this.renderLinkNav()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Form className="navForm">
          <h1 className="">I'm looking for..</h1>  
          <Form.Control type="search" className="searchInput" size="lg" placeholder="Enter a Job Description" />
          <Button className="buttonSearch" variant="info" type="submit" size="lg">
            <FontAwesome
              className='super-crazy-colors'
              name='search'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />{' '}
              Search
          </Button>
          <div className="navCheckboxs">
          <div className="checkboxs">
            <Form.Check inline type='checkbox' className='checkbox1' label="Full Time" />
            <Form.Check inline type='checkbox' className='checkbox2' label="Part Time / Casual / Freelance" />
          </div>
           <Form.Group controlId="formGridState" className="navDropChose">
              <Form.Control size="sm" as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
          </div>
          
          
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NavBar);
