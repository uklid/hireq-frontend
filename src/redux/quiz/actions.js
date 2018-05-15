

export const updateCurrentTest = (currentTest) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_CURRENT_QUIZ',
    data: currentTest
  })
}

export const updateCog = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_COG',
    data: data
  })
}

export const updatePer = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_PER',
    data: data
  })
}

export const updateSS = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_SS',
    data: data
  })
}

export const updateWP = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_WP',
    data: data
  })
}