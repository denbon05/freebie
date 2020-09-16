import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';
import '../css/style.css';

const mapStateToProps = (state) => {
  const { linksNavState: { linksById, allIds } } = state;
  const links = allIds.map((id) => linksById[id]);
  return { links };
};

const actionCreators = {
  clickFindMore: actions.clickFindMore,
};

class Main extends React.Component {
  
}

export default connect(mapStateToProps, actionCreators)(Main);
