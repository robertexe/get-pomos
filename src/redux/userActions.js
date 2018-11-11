import firebase, {provider, authRef} from '../firebase.js'
import { snapshotFunc } from './taskActions'

export const persistAuth = user => dispatch =>  {
		authRef
		.onAuthStateChanged((user) => {
			console.log(user)
			user = user.providerData[0]
	    if (user) {
	      dispatch({type: 'PERSIST_AUTH', payload: user})
				let userRef = firebase.database().ref(`tasks/${user.uid}`)
				dispatch(snapshotFunc(userRef))
	    }
	  });
}

export const login = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(resp => dispatch(setUser(resp.user.providerData)))
    .catch(error => console.log(error));
};

export const setUser = user => dispatch => {
	user = user[0]
	console.log(this.user)
		firebase.database()
			.ref('users/' + user.uid)
			.set({ ...user })
			return dispatch({type: 'SIGN_IN', payload: user})
}

export const rewardPomo = () => {
	return {type: 'REWARD', payload: 1}
}


export const logout = () => dispatch => {
	authRef
		.signOut()
		.then(()=> dispatch({type: 'SIGN_OUT', payload: false}))
}
