import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {  removeTask } from '../redux/taskActions';
// css -- semantic
import { Accordion, Icon } from 'semantic-ui-react'


class ActiveTasks extends Component {

  state = { activeIndex: 0 }

	renderTasks = () => {
		if(this.props.tasks !== null){
			return this.props.tasks.map( (task, idx) => {
				return (
					(<Accordion key={idx} fluid styled>
						<Accordion.Content className="task-title" active={true} index={idx} onClick={this.handleClick}>
            <Icon className="remove-task" name="window close" color='red' onClick={() => this.props.removeTask(task)}/>
							{task.taskHeadline}
						</Accordion.Content>
					</Accordion>)
				)
			})
		}
	}

  render() {
    return (
			<div>{this.renderTasks()}</div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
 	return bindActionCreators({ removeTask }, dispatch)
 }


export default connect(mapStateToProps, mapDispatchToProps)(ActiveTasks)
