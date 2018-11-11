import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sound from 'react-sound';

class SoundComponent extends Component {
  render() {
    return (
			<div>
			{this.props.timer.isPlaying ?
				<Sound
				 url='/sounds/ticker.mp3'
				 playStatus={Sound.status.PLAYING}
				 playFromPosition={0}
			 		/>
			:
			null
			}
			</div>
		);
  }
}

const mapStateToProps = state => state

//const mapDispatchToProps = dispatch => bindActionCreators({})

export default connect(mapStateToProps, null)(SoundComponent)


// onLoading={this.handleSongLoading}
// onPlaying={this.handleSongPlaying}
// onFinishedPlaying={this.handleSongFinishedPlaying}
