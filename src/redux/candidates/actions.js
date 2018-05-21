export const updateAllCandidates = (data) => (dispatch , action) => {
  dispatch({
    type: 'UPDATE_ALL_CANDIDATES',
    data: data
  })
} 