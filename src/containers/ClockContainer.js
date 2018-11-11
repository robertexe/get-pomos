import React, { PureComponent } from 'react';
import CircularProgress from '../components/CircularProgress'
import { connect } from 'react-redux'
import { setSessionTime, togglePlay } from '../redux/timerActions'
import { rewardPomo } from '../redux/userActions'
import { bindActionCreators } from 'redux'
import Paper from '@material-ui/core/Paper';
import SoundComponent from '../components/SoundComponent'
import Sound from 'react-sound';
import { Button  } from 'semantic-ui-react'
import 'react-circular-progressbar/dist/styles.css'




class ClockContainer extends PureComponent {

	state = {
		time: 1500,
		session: this.props.timer.session,
		timerId: null,
		percent: null
	}

	setSessionTime = (session) => {
		switch (session) {
			case 'focus':
			this.stopTimer()
			return this.setState({
				time: 1500,
				session: 'focus',
				timerId: null
			})
			case 'break':
			this.stopTimer()
			return this.setState({
				time: 300,
				session: 'break',
				timerId: null
			})
			default:
		}
	}


	startTimer = () => {
		if(!this.props.timer.isPlaying){
			this.props.togglePlay()
			this.setState({
    		...this.state,
				timerId: setInterval(this.decrementTime, 1000)
    	});
		}
	}


	decrementTime = () => {
		this.setState({
			time: this.state.time-1
		})
	}

	stopTimer = () => {
		if(this.state.timerId !== null && this.props.timer.isPlaying){
			this.props.togglePlay()
			this.setState({ timerId: clearInterval(this.state.timerId) });
		}
	}


	sessionButtonSwitch = () => {
		switch (this.state.session) {
			case 'focus':
				return (
					(<Button className="btns" icon="coffee" onClick={() => this.setSessionTime('break')}/>)
				)
			case 'break':
				return (
					(<Button className="btns" icon="hourglass start" onClick={() => this.setSessionTime('focus')}/>)
				)
			default:
		}
	}

	timerButtonSwitch = () => {
		switch (this.props.timer.isPlaying) {
			case true:
				return (
					(<Button className="btns" icon="pause" onClick={() => this.stopTimer()} />)
				)
			case false:
				return (
					(<Button className="btns" icon="play" onClick={() => this.startTimer()} />)
				)
			default:
		}
	}

	toHHMMSS = (time) => {
		let sec_num = parseInt(time, 10);
		let hours   = Math.floor(sec_num / 3600);
		let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		let seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}

		return minutes+':'+seconds;
	}

	setMaxtime = () => {
		switch (this.state.session) {
			case 'focus':
				return this.setPercent(this.getPercent(1500))
			case 'break':
				return this.setPercent(this.getPercent(300))
			default:
		}
  }

	getPercent = (mtime) => {
		let percent = 100 - ((mtime - this.state.time) / mtime * 100);
		return percent
	}

	setPercent = (element) => {
		this.setState({
			percent: element
		})
	}

	ticking = (element) => {
	 this.myRef = React.createRef();
	 if(element > 0)
	  return (
	   <audio  src='/sounds/ding.mp3' autoPlay/>
	  )
	}

	handleSound = () => {
		if(this.props.isPlaying === true){
			return (<Sound
			 url='/sounds/ticker.mp3'
			 playStatus={Sound.status.PLAYING}
			 playFromPosition={0}
				/>)
		} else if(this.state.time === 0){
			return (<Sound
			 url='/sounds/ding.mp3'
			 playStatus={Sound.status.PLAYING}
			 playFromPosition={0}
			 onFinishedPlaying={this.finishedPlaying}
				/>)
		}
	}

	finishedPlaying = () => {
		this.setSessionTime(this.state.session)
		this.props.rewardPomo()
	}

	handleStop = () => {
		if(this.state.time === 0){
			this.stopTimer()
		}
	}





	render(){
		return (
			<Paper zdepth={2} className="pomodoro-progress-bar panel">
        <CircularProgress
          percentage={this.state.percent}
          text={this.toHHMMSS(this.state.time)}
        />
			{this.setMaxtime()}
			<div className="buttonHolder">
				{this.timerButtonSwitch()}
				{this.sessionButtonSwitch()}
			</div>
			{this.handleSound()}
			{this.handleStop()}
      </Paper>
		)
	}
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ setSessionTime, togglePlay, rewardPomo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClockContainer)
