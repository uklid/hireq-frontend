export default (state = [], action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        data: [...state, action.data]
      }
    default:
      return state
  }
}