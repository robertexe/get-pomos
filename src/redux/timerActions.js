export const setSessionTime = (session) => {
	let time;
	switch (session) {
		case 'focus':
			time = 1500;
			return {
				type: 'SET_TIME',
				payload: time,
				payload2: session
			}
		case 'break':
			time = 300;
			return {
				type: 'SET_TIME',
				payload: time,
				payload2: session
			}
			default:
				return session
	}
}

export const togglePlay = () => dispatch => dispatch({type: 'TOGGLE_PLAY'})
