import firebase from '../firebase.js'


export const snapshotFunc = path => dispatch => {
	let newState = [];
	path.once('value', (snapshot) => {
		let tasks = snapshot.val()
		for (let k in tasks) {
			newState.push(tasks[k])
		}
		return dispatch({type: 'PERSIST_TASKS', payload: newState})
	})
}

export const addTask = task => dispatch => {
	const tasksRef = firebase.database().ref(`tasks/${task.userId}`);
	let newTaskRef  = tasksRef.push();
	let newKey = newTaskRef.key

	task['taskId'] = newKey
	console.log(newTaskRef)
	newTaskRef.set({
		...task
	})
	return dispatch(snapshotFunc(tasksRef))
}

export const removeTask = task => dispatch => {
	let userId = task.userId
	const tasksRef = firebase.database().ref(`/tasks/${userId}/${task.taskId}`);
	tasksRef.remove();
	console.log('here')
	return dispatch({type: 'REMOVE_TASK', payload: task})
}
