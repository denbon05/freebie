import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import cn from 'classnames';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions/index.js';
import '../css/style.css';
import logo from '../images/logo.png';

const mapStateToProps = (state) => {
  const { linksNavState: { linksById, allIds }, formJobState } = state;
  const links = allIds.map((id) => linksById[id]);
  return { links, formJobState };
};

const actionCreators = {
  clickOnNavLink: actions.clickOnNavLink,
  onNavForm: actions.onNavForm,
  onChangeSearchJob: actions.onChangeSearchJob,
  clickCheckbox: actions.clickCheckbox,
  choosingCoutnry: actions.choosingCoutnry,
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

  handleJobSubmit = (e) => {
    e.preventDefault();
    const { onNavForm } = this.props;
    onNavForm();
  }

  handlerSearch = ({ target: { value } }) => {
    const { onChangeSearchJob } = this.props;
    onChangeSearchJob({ value });
  }

  checkboxHandler = ({ target: { id } }) => {
    const { clickCheckbox } = this.props;
    clickCheckbox({ id });
  }

  handlerSelect = ({ target: { value } }) => {
    const { choosingCoutnry } = this.props;
    choosingCoutnry({ value });
  }

  render() {
    const { buttonSearch } = this.props.formJobState;
    const disabledButton = buttonSearch === 'disabled';

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

        <Form encType="text/plain" /*action=""*/ onSubmit={(e) => this.handleJobSubmit(e)} className="navForm">
          <h1 className="h1Searching">I'm looking for..</h1>  
          <Form.Control
            onChange={(e) => this.handlerSearch(e)}
            type="search"
            className="searchInput"
            size="lg"
            placeholder="Enter a Job Description"
          />
          <Button disabled={disabledButton} className="buttonSearch" variant="info" type="submit" size="lg">
            <FontAwesome
              className='super-crazy-colors'
              name='search'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />{' '}
              Search
          </Button>
          <div className="navCheckboxs">
            <div className="checkboxs">
              <Form.Group controlId="checkbox1">
                <Form.Check onChange={(e) => this.checkboxHandler(e)} inline type='checkbox' className='checkbox1' label="Full Time" />
              </Form.Group>
              <Form.Group controlId="checkbox2" className="checkboxs">
                <Form.Check onChange={(e) => this.checkboxHandler(e)} inline type='checkbox' className='checkbox2' label="Part Time / Casual / Freelance" />
              </Form.Group>
            </div>
            <Form.Group controlId="formGridState" className="navDropChose">
                <Form.Control onChange={(e) => this.handlerSelect(e)} size="sm" as="select" defaultValue="Choose...">
                  <option value="chose">Choose...</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="PHP">PHP</option>
                  <option value="Python">Python</option>
                  <option value="Ruby">Ruby</option>
                </Form.Control>
              </Form.Group>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NavBar);
