import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actions from '../actions/index.js';
import line from '../images/shape.png';
import '../css/style.css';

const mapStateToProps = ({ buttonFindMore }) => ({ buttonFindMore });

const actionCreators = {
  clickFindMore: actions.clickFindMore,
};

class Main extends React.Component {

  render() {
    console.log(this.props);

    return (
      <div className="mainContainerFlex">
        <h5>We’re leaders in</h5>
        <h2>Creative Digital Recruitment</h2>
        <img src={line} alt="blue line" />
        <p>
          Based in Surry Hills, the creative hub of Sydney we are surrounded
          by creativity and that reflects on the type of jobs we recruit for.
        </p>
        <Button size="lg" variant="outline-primary">FIND OUT MORE ABOUT US!</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Main);
