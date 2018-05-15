

export const updateCurrentTest = (currentTest) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_CURRENT_QUIZ',
    data: currentTest
  })
}