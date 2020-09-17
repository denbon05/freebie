import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import mailIcon from '../images/mail-solid.png';
import * as actions from '../actions/index.js';
import '../css/style.css';

const mapStateToProps = ({ mailField: { mailText } }) => ({ mailText });

const actionCreators = {
  fillMail: actions.fillMail,
  subscribe: actions.subscribe,
};

class Footer extends React.Component {
  handleSubscribrMail = (e) => {
    e.preventDefault();
    const { subscribe } = this.props;
    
  }

  handlerMailChange = ({ target: { value } }) => {
    const { fillMail } = this.props;

  }

  render() {
    console.log(this.props);

    return (
      <div className="footerContainer">
        <h6 className="footerHeader">Subscribe to our Job Seeker Mailing List</h6>
        <Form encType="application/x-www-form-urlencoded" onSubmit={(e) => this.handleSubscribrMail(e)} className="footerForm">
          <Form.Control
            onChange={(e) => this.handlerMailChange(e)}
            type="search"
            className="mailInput"
            size="lg"
            placeholder="Enter Your Email Address"
          />
          <a className="mailButton" href="#"><img className="mailIcon" src={mailIcon}></img></a>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Footer);
