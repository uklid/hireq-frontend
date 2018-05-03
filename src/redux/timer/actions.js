const INCREASE = 'INCREASE'

export const increaseTime = () => (dispatch, getState) => {
  let timeNow = getState().Time.time
    dispatch({
      type: INCREASE,
      data: timeNow + 1
    })
}
