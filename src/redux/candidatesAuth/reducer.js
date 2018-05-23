import { baseUrl } from "../../libs/url/baseUrl"

const initialState = {
  // candidateId: '-LD68ZFVrU4H3wekPyKD',
  // candidateId: '-LDBss4rIaXDKwTjM6dL',
  // candidateId: '-LD66yXhLO8kOd-9_Uk6',
  // candidateId: '-LD0xbwbVc39eW2_tlv9',
  candidateId: '-LDACX6O5A5LHoPzKi37',
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