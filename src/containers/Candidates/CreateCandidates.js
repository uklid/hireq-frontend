import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Input, Button, message, Form, Select } from 'antd'
import { LoadingSuccess, Loading } from '../../redux/loading/actions'
import { updateAllCandidates } from '../../redux/candidates/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'

const WhiteWrapper = styled.div`
    background-color: #fff;

    .create-group {
      margin: 10px;
    }
`

class CreateCandidates extends React.Component {
  state = {
    name: '',
    email: '',
    validEmail: '',
    validName: '',
  }
  onTextChange = (stateName) => (event) => {
    this.setState({
      [stateName]: event.target.value
    })
    // Add validation
    const inputName = stateName === 'email' ? 'validEmail' : 'validName'
    if (this.state[stateName] === '') {
      this.setState({
        [inputName]: 'error'
      })
    } else {
      this.setState({
        [inputName]: ''
      })
    }
  }
  addCandidate = async () => {
    const { email, name } = this.state
    try {
      this.props.Loading()
      const test = await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          const positionId = this.props.addPositionId
          // const positionId = '-LD0mn77k5QHqPo6YLdz'
          const addCandidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates/`
          const resultAfterCreate = await Axios.post(addCandidateURL, { name, email }, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          const candidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates`
          const resultCandidate = await Axios.get(candidateURL, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          this.props.updateAllCandidates(resultCandidate.data)
          this.setState({
            email: '',
            name: '',
          })
          this.props.LoadingSuccess()
          message.success('Create candidate !', 10)
        } else {
          message.error
          this.props.LoadingSuccess()
          console.log("ไม่มี")
        }
      })
    } catch (err) {
      this.props.LoadingSuccess()
      console.log(err)
    }
  }

  render() {
    return (
      <WhiteWrapper>
        {/* <h3>CREATE CANDIDATES</h3> */}
        <Form>
          <div className="create-group">
            <div>NAME</div>
            <Form.Item
              validateStatus={this.state.validName}
              help={this.state.validName === 'error' && 'Please enter your name.'}
            >
              <Input
                type="text"
                onChange={this.onTextChange('name')}
                placeholder="Enter candidate name"
                defaultValue={this.state.name}
                value={this.state.name}
              />
            </Form.Item>
          </div>
          <div className="create-group">
            <div>EMAIL</div>
            <Form.Item
              validateStatus={this.state.validEmail}
              help={this.state.validEmail === 'error' && 'Please enter your email.'}
            >
              <Input
                type="email"
                onChange={this.onTextChange('email')}
                placeholder="Enter candidate Email"
                defaultValue={this.state.email}
                value={this.state.email}
              />
            </Form.Item>
          </div>
          <div className="create-group">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Job"
              optionFilterProp="children"
            >
              <Select.Option value="jack">Dev</Select.Option>
              <Select.Option value="lucy">Programmer</Select.Option>
              <Select.Option value="tom">Coder</Select.Option>
            </Select>
          </div>
          <Button
            style={{ marginTop: 20 }}
            onClick={this.addCandidate}
            style={{ color: '#fff', backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
          >
            ADD Candidate
          </Button>
        </Form>
      </WhiteWrapper>
    )
  }
}

export default connect(null, {
  Loading,
  LoadingSuccess,
  updateAllCandidates
})(CreateCandidates)