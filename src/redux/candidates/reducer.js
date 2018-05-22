const initialState = {
  allCandidatesData: [],
  deleteId: '',
  positionId: '',
  toggleDialog: false
}

const Candidates = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_CANDIDATES':
      return {
        ...state,
        allCandidatesData: action.data
      }
    case 'UPDATE_DELETE_ID':
      return {
        ...state,
        deleteId: action.data.deleteId,
        positionId: action.data.positionId
      }
    case 'UPDATE_TOGGLE_DIALOG':
      return {
        ...state,
        toggleDialog: action.data
      }
    default:
      return state
  }
}

export default Candidates