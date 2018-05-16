import axios from 'axios'
import firebase from 'firebase'
import { push } from 'react-router-redux'

// const actions = {
//   CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
//   LOGIN_REQUEST: 'LOGIN_REQUEST',
//   LOGOUT: 'LOGOUT',
//   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//   LOGIN_ERROR: 'LOGIN_ERROR',
//   checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
//   login: () => ({
//     type: actions.LOGIN_REQUEST
//   }),
//   logout: () => ({
//     type: actions.LOGOUT
//   })
// };
// export default actions;

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

const fakeApiCall = true

export const LoginCheck = () => async dispatch => {
  try {
    const req = await firebase.auth().signInWithEmailAndPassword('test@hireq.io', 'hireq01')
    const getIdToken = await firebase.auth().currentUser.getIdToken()
    console.log("getIdToken = " , getIdToken)
    console.log("firebase req = ", req)
    await localStorage.setItem('loginToken', req.uid)
    await localStorage.setItem('headerToken', getIdToken)

    await dispatch({
      type: LOGIN_SUCCESS,
      authToken: req.uid,
      headerToken: getIdToken
    })
    await dispatch(push('/dashboard'))
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: 'LOGIN_FAIL',
      data: err.message
    })
  }

}

export const AuthCheck = async (dispatch, getState) => {

}

export const SignOut = () => async dispatch => {

  await localStorage.removeItem('loginToken')
  dispatch({
    type: LOGOUT,
  })
}