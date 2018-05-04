import moment from 'moment'

const INCREASE = 'INCREASE'

export const increaseTime = () => (dispatch, getState) => {
  let timeNow = getState().Time.time
  dispatch({
    type: INCREASE,
    data: moment(timeNow, "ms").format("HH:mm:ss") - moment().second(1)
  })
}
