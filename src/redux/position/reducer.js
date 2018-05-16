const initialState = {
  prepareCreate: {},
  searchPosition: '',
  positionData: []
}

const Positions = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSITIONS_DATA':
      return {
        ...state,
        positionData: [...action.data]
      }
    case 'SEARCH_POSITION':
      return {
        ...state,
        searchPosition: action.data
      }
    case 'PREPRARE_CREATE':
      return {
        ...state,
        prepareCreate: action.data
      }
    default:
      return state
  }
}

export default Positions