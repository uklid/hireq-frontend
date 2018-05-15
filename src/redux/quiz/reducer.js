const initialState = {
  currentQuiz: '',
  quizPath: 1
}

const Quiz =  (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_QUIZ':
      return {
        ...state,
        currentQuiz: action.data
      }
    default:
      return state
  }
}

export default Quiz