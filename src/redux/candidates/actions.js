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

export const toggleDialog = (data) => (dispatch, getState) => {
  const toggleStatus = getState().Candidates.toggleDialog
  // console.log("toggleStatus" , toggleStatus)
  dispatch({
    type: 'UPDATE_TOGGLE_DIALOG',
    data: !toggleStatus
  })
}

export const updateCandidateCheckId = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_CANDIDATE_CHECK_ID',
    data: data
  })
}

export const updateUncheckCandidateId = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_UNCHECK_ID',
    data: data
  })
}

export const updateAllChecked = () => (dispatch, getState) => {
  const checked = getState().Candidates.allChecked
  console.log("checked: ", checked)
  dispatch({
    type: 'UPDATE_ALL_CHECKED',
    data: !checked
  })
}