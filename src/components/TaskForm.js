import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTask } from '../redux/taskActions'
//css -- material
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import theme from '../themefile.js'
//css -- semantic
import { Button } from 'semantic-ui-react';


const styles = theme => ({
	textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,

  }
})

class TaskForm extends Component {

	state = {
		taskHeadline: '',
		multiline: 'controlled'
	}

	handleChange = (e) => this.setState({[e.target.name]: e.target.value})

	handleSubmit = (e) => {
		e.preventDefault()
		const task = {
			taskHeadline: this.state.taskHeadline,
			userId: this.props.user.info.uid
		}
		this.props.addTask(task)
		this.setState({
			taskHeadline: '',
		})
	}

	render(){
		console.log(theme)
		const { classes } = this.props
		return(
			<form onSubmit={this.handleSubmit} autoComplete="off">
				<TextField
				 type="text"
				 label="Todo"
				 name="taskHeadline"
				 onChange={(e) => this.handleChange(e)}
				 value={this.state.taskHeadline}
				 className={classes.textField}
				 margin="normal"
			 />
				<Button type="submit" circular className="btns" icon="add" />
		</form>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ addTask }, dispatch)
}

const mapStateToProps = state => {
	return state
}

TaskForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskForm));
