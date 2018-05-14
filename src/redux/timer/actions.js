import moment from 'moment'

export const DECREASE = 'DECREASE'
export const UPDATE_TIME = 'UPDATE_TIME'

export const decreaseTime = () => (dispatch, getState) => {
  let timeNow = getState().Time.time
  dispatch({
    type: DECREASE,
    data: timeNow - 1000
  })
}

export const updateTimeFromApi = (startTime) => (dispatch, getState) => {
  const now = moment(new Date()).format("HH:mm:ss")
  const then = moment(startTime).format("HH:mm:ss")

  const differentTime = moment
    .utc(moment(now, "HH:mm:ss")
      .diff(moment(then, "HH:mm:ss")))
    .format("HH:mm:ss")

    const hour = moment(differentTime).format("HH")
    const minute = moment(differentTime).format("mm")
  // const hour = ((parseInt(moment(differentTime).format("H")) * 60) * 60) * 1000
  // const minute = (parseInt(moment(differentTime).format("m")) * 60) * 1000
  // const currentMinute = moment(new Date()).format("m")
  // const currentHour = moment(new Date()).format("H")
  // const minute = currentMinute - moment(startTime).format("m")
  // const hour = currentHour - moment(startTime).format("H") 
  console.log('hour = ', hour)
  console.log('minute = ', minute)
}