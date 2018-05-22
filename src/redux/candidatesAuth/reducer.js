import { baseUrl } from "../../libs/url/baseUrl"

const initialState = {
  candidateId: '-L3y6bEU1lxPOpxeoQw-',
  apiURL: `${baseUrl}`
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