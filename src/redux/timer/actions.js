import moment from 'moment'

const INCREASE = 'INCREASE'

export const decreaseTime = () => (dispatch, getState) => {
  let timeNow = getState().Time.time
  dispatch({
    type: INCREASE,
    data: timeNow - 1000
  })
}