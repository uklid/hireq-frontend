export const updateAllCandidates = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_ALL_CANDIDATES',
    data: data
  })
}

export const updateDeleteId = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_DELETE_ID',
    data: data
  })
}

export const toggleDialog = (data) => (dispatch,getState) => {
  const toggleStatus = getState().Candidates.toggleDialog
  // console.log("toggleStatus" , toggleStatus)
  dispatch({
    type: 'UPDATE_TOGGLE_DIALOG',
    data: !toggleStatus
  })
}