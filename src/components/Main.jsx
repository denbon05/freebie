import React from 'react';
import { connect } from 'react-redux';
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
        <h4>We’re leaders in</h4>
        <h2>Creative Digital Recruitment</h2>
        <img src={line} alt="blue line" />
        <p>
          Based in Surry Hills, the creative hub of Sydney we are surrounded
          by creativity and that reflects on the type of jobs we recruit for.
        </p>
        <a
          href="#"
          className="aButtonFindMore"
        >
          FIND OUT MORE ABOUT US!
        </a>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Main);
