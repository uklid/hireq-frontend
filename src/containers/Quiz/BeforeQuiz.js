import React from 'react'
import styled from 'styled-components'
import Button from '../../components/uielements/button'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'

const BeforeQuizWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(${require('../../image/signin-image.jpg')}) no-repeat;
  background-size: cover;
`

const WhiteWrapper = styled.div`
  width: 400px;
  height: 250px;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 767px) {
    width: 90%;
    height: 375px;
  }
`

const BeforeQuizBlock = styled.div`
  @media only screen and (max-width: 767px) {
    width: 85%;
  }
`

//candidate ID
const candidateId = '-L3y6bEU1lxPOpxeoQw-'
const apiURL = 'https://us-central1-hireq-api.cloudfunctions.net'

class BeforeQuiz extends React.Component {
  state = {
    startedTime: null
  }
  componentWillMount = async () => {
    //  Start Loading
    this.props.Loading()
    const url = `${apiURL}/candidates/${candidateId}/test`
    const requestResult = await Axios.get(url)
    const startedTime = requestResult.data.startedTime ? requestResult.data.startedTime : null
    this.setState({ startedTime })
    //oading SUccess
    this.props.LoadingSuccess()
  }
  getStartedQuiz = () => {
    this.props.history.push('/quiz')
  }
  render() {
    // console.log("Props =",this.props)
    const { errorMessage } = this.props
    return (
      <BeforeQuizWrapper>
        <WhiteWrapper>
          <BeforeQuizBlock>
            <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Mister. Doreme Fazonla</h1>
            <Button
              style={{
                width: '100%', backgroundColor: '#954590', color: '#fff'
              }}
              onClick={this.getStartedQuiz}
            >
              {this.state.startedTime !== null ? 'continue doing quiz' : 'start doing quiz'}
            </Button>
          </BeforeQuizBlock>
        </WhiteWrapper>
      </BeforeQuizWrapper>
    )
  }
}

export default connect(null, { Loading, LoadingSuccess })(BeforeQuiz)