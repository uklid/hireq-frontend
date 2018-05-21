const initialState = {
  allCandidatesData: []
}

const Candidates = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_CANDIDATES':
      return {
        ...state,
        allCandidatesData: action.data
      }
    // case 'UPDATE_POSITIONS_DATA':
    //   return {
    //     ...state,
    //     positionData: [...action.data]
    //   }
    // case 'SEARCH_POSITION':
    //   return {
    //     ...state,
    //     searchPosition: action.data
    //   }
    // case 'PREPRARE_CREATE':
    //   return {
    //     ...state,
    //     prepareCreate: action.data
    //   }
    // case 'UPDATE_POSITION_DETAIL':
    //   return {
    //     ...state,
    //     positionDetail: action.data
    //   }
    // case 'UPDATE_PRE_EDIT_DATA':
    //   return {
    //     ...state,
    //     prepareEditData: action.data
    //   }
    default:
      return state
  }
}

export default Candidates