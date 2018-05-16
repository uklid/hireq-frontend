const initialState = {
  candidateId: '-L3y6bEU1lxPOpxeoQw-',
  apiURL: 'https://us-central1-hireq-api.cloudfunctions.net'
}

const CandidateAuth = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CANDIDATE_ID':
      return {
        ...state,
        candidateId: action.data
      }
    default:
      return state
  }
}

export default CandidateAuth