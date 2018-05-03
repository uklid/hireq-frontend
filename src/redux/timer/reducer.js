const Time = (state = { time: 0 }, action) => {
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