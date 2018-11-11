import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { login } from '../redux/userActions'
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class LoginScreen extends Component {

  render() {
    return (
		<div>
        <Modal dimmer={true} open={!this.props.user.loggedIn}>
          <Modal.Header>Welcome to getPOMOS</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='images/pomodoro.png' />
            <Modal.Description>
              <p>In order to use getPOMOS, you must be logged-in to a Google Account.</p>
              <p>Would you like to login?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' content="Nope" onClick={this.toggleVisibility}/>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yeah, sure!"
              onClick={() => this.props.login()}
            />
          </Modal.Actions>
        </Modal>


      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
