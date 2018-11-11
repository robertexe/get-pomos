import { combineReducers } from 'redux'

const userState = {
	info: {},
	loggedIn: false,
	pomoCount: 0
}

const taskState = []

const timerState = {
	time: 1500,
	isPlaying: false,
	session: 'focus',
	baseTime: 0
}

const tickerState = {
	ticking: false
}


export const taskReducer = (state = taskState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
    return [...state, action.payload]
    case 'REMOVE_TASK':
    let filteredArr = state.filter( task => task.taskId !== action.payload.taskId)
    return filteredArr
		case 'PERSIST_TASKS':
		return action.payload
		default:
			return state
	}
}

export const userReducer = (state = userState, action) => {

	switch (action.type) {
		case 'SIGN_IN':
		return {
			...state,
			info: action.payload,
			loggedIn: true,
		}
		case 'PERSIST_AUTH':
		return {
			...state,
			info: action.payload,
			loggedIn: true
		}
		case 'SIGN_OUT':
		return {
				info: {},
				loggedIn: false,
				pomoCount: 0
			}
		case 'REWARD':
		return {
			...state,
			pomoCount: state.pomoCount + action.payload
		}
		default:
			return state
	}
}

export const timerReducer = (state = timerState, action) => {

	switch (action.type) {
		case 'SET_TIME':
		return {
				...state,
				time: action.payload,
				session: action.payload2
		}
		case 'TOGGLE_PLAY':
		return {
				...state,
				time: state.time,
				isPlaying: !state.isPlaying,
				session: state.session
		}
    default:
      return state
  }
}

export const tickerReducer = (state = tickerState, action) => {
	switch (action.type) {
		case 'TOGGLE_TICK':
		return {
			ticker: action.payload
		}
		default:
			return state
	}
}

export const rootReducer = combineReducers({
	tasks : taskReducer,
	user : userReducer,
	timer : timerReducer,
	ticker: tickerReducer
})
