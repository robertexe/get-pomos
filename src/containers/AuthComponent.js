import React, { PureComponent } from 'react'
import LoginScreen from '../components/loginScreen'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout, persistAuth } from '../redux/userActions'
//containers
import TaskContainer from './TaskContainer'
import ClockContainer from './ClockContainer'
import TitleBar from './TitleBar'

//css





class AuthComponent extends PureComponent {

	componentDidMount() {
		this.props.persistAuth(this.props.user.info)
	}

	render() {
		return (
			<div>
			<LoginScreen />
			<TitleBar />
				<div className="container">
					<ClockContainer />
					<TaskContainer />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({login, logout, persistAuth}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);

// <LoginScreen />
// <Dimmer.Dimmable as={Segment} blurring dimmed={!this.props.user.loggedIn} >
// <TitleBar />
// 	<div className="container">
// 		<ClockContainer />
// 		<TaskContainer />
// 	</div>
// 	<Dimmer page={false}  />
// </Dimmer.Dimmable>
// </div>
