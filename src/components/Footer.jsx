import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import mailIcon from '../images/mail-solid.png';
import * as actions from '../actions/index.js';
import '../css/style.css';

const mapStateToProps = (state) => {
  const props = {
    mailText: state.mailField.mailText,
    subscribeOn: state.mailField.subscribeOn,
  };
  return props;
};

const actionCreators = {
  fillMail: actions.fillMail,
  subscribe: actions.subscribe,
};

class Footer extends React.Component {
  handleSubscribrMail = (e) => {
    e.preventDefault();
    const { subscribe } = this.props;
    subscribe();
  }

  handlerMailChange = ({ target: { value } }) => {
    const { fillMail } = this.props;
    fillMail({ value });
  }

  render() {console.log(this.props)
    const { subscribeOn } = this.props;

    return (
      <div className="footerContainer">
        <h6 className="footerHeader">Subscribe to our Job Seeker Mailing List</h6>
        <Form encType="application/x-www-form-urlencoded" onSubmit={(e) => this.handleSubscribrMail(e)} className="footerForm">
          <Form.Control
            spellCheck="false"
            required
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="email"
            onChange={(e) => this.handlerMailChange(e)}
            type="email"
            className="mailInput"
            size="lg"
            placeholder="Enter Your Email Address"
          />
          <button disabled={subscribeOn} className="mailButton">
            <img alt="mail" className="mailIcon" src={mailIcon} />
          </button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Footer);
