import React, { PureComponent } from 'react';
import TaskForm from '../components/TaskForm';
import ActiveTasks from '../components/ActiveTasks'

import { bindActionCreators } from 'redux';
import {  removeTask } from '../redux/taskActions';
import { connect } from 'react-redux';

import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';

class TaskContainer extends PureComponent {

	createUUID = () => {
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
}

	render(){
		const { palette } = this.props.theme;
    const { primary, secondary } = palette
		return (
			<Paper zdepth={2}  className="activity-box panel">
				<TaskForm />
				<ActiveTasks />
			</Paper>

		)
	}
}

const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ removeTask }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(TaskContainer))
