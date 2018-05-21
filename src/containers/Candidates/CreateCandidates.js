import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Input, Button } from 'antd'
import { LoadingSuccess, Loading } from '../../redux/loading/actions'
import Axios from 'axios'
import firebase from 'firebase'

const WhiteWrapper = styled.div`
		background-color: #fff;
    padding: 20px;
    margin: 20px;
`

class CreateCandidates extends React.Component {
  state = {
    name: '',
    email: ''
  }
  onTextChange = (stateName) => (event) => {
    this.setState({
      [stateName]: event.target.value
    })
  }

  addCandidate = async () => {
    const { email, name } = this.state
    try {
      this.props.Loading()
      const test = await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          const positionId = '-LD0mn77k5QHqPo6YLdz'
          const addCandidateURL = `https://us-central1-hireq-api.cloudfunctions.net/users/${uid}/positions/${positionId}/candidates/`
          const resultAfterCreate = await Axios.post(addCandidateURL, { name, email }, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          console.log('After create candidate: ', resultAfterCreate)
          this.setState({
            email: '',
            name: '',
          })
          this.props.LoadingSuccess()
        } else {
          this.props.LoadingSuccess()
          console.log("ไม่มี")
        }
      })
      // console.log(test)

    } catch (err) {
      this.props.LoadingSuccess()
      console.log(err)
    }
  }

  render() {
    return (
      <WhiteWrapper>
        <h3>CREATE CANDIDATES</h3>
        <form>
          <div>
            <div>NAME</div>
            <Input type="text" onChange={this.onTextChange('name')} placeholder="Enter candidate name " defaultValue={this.state.name} />
          </div>
          <div>
            <div>EMAIL</div>
            <Input type="email" onChange={this.onTextChange('email')} placeholder="Enter candidate Email" defaultValue={this.state.email} />
          </div>
          <Button style={{ marginTop: 20 }} onClick={this.addCandidate}>ADD Candidate </Button>
        </form>
      </WhiteWrapper>
    )
  }
}

export default connect(null, {
  Loading,
  LoadingSuccess
})(CreateCandidates)