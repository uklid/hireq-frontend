import moment from 'moment'

const Time = (state = { time: moment("2", "hms").format("HH:mm:ss") }, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        ...state,
        time: action.data
      }
    default:
      return state
  }
}

export default Time