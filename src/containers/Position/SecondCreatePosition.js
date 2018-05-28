import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Input } from 'antd'
import Button from '../HireQComponent/Button'
import Tables from './components/Table'
import CriticalSoftSkills from './CriticalSoftSkills'
import moment from 'moment'
import WorkPreference from './WorkPreference'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
  preCreatePosition
} from '../../redux/position/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'

const SliderStyled = styled(Slider) `
  .ant-slider-handle {
	border: solid 2px #954590;
  }
  .ant-slider-track {
	background-color: #954590;
  }
`
const Span = styled.span`
	font-weight: 800;
	margin-right: 5px;
`

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;

		h4 {
			display: inline;
		}
`
const ButtonStyled = styled.button`
  color: white;
  border: 0px;
  height: 36px;
  width: 80px;
  cursor: pointer;
`
const ButtonContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
`
class SecondCreatePosition extends React.Component {
  state = {
    open: false,
  }
  componentWillMount = () => {
    if (Object.keys(this.props.prepareCreate).length === 0) {
      this.props.history.push('/dashboard/create-position')
    }
  }
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }
  createPosition = async () => {
    this.props.Loading()
    const { prepareCreate } = this.props
    const uid = localStorage.getItem('loginToken')
    const url = `${baseUrl}/users/${uid}/positions`
    const getIdToken = await firebase.auth().currentUser.getIdToken()
    const result = await Axios.post(url, { ...prepareCreate }, {
      headers: { Authorization: "Bearer " + getIdToken }
    })
    //change to position detail after create with idCode
    this.props.LoadingSuccess()
    this.props.history.push({
      pathname: '/dashboard/position-detail',
      state: {
        message: result.data.message,
        positionDetail: result.data.code
      }
    })
  }

  changeCogData = (value) => {
    const { prepareCreate } = this.props
    prepareCreate.info['COG'] = { min: value[0], max: value[1] }
    const newDataToUpdate = { ...prepareCreate }
    this.props.preCreatePosition(newDataToUpdate)
  }
  onTextAreaChange = (event) => {
    const { prepareCreate } = this.props
    const { value } = event.target
    prepareCreate.descriptions = value
    const updateData = { ...prepareCreate }
    this.props.preCreatePosition(updateData)
  }

  render() {
    const { prepareCreate } = this.props
    const defaultCogData = prepareCreate.info && [prepareCreate.info['COG']['min'], prepareCreate.info['COG']['max']]
    return (
      <LayoutContentWrapper>
        <Grid container spacing={24}>
          <Grid item sm={12} xs={12}>
            <Card>
              <p> <Span>Position Name: </Span> {prepareCreate.name} </p>
              <p> <Span>Category: </Span> {prepareCreate.category} </p>
              <p> <Span>Info: </Span>
                <Input.TextArea
                  onChange={this.onTextAreaChange}
                  defaultValue={prepareCreate.descriptions}
                  placeholder="position description."
                  autosize={{ minRows: 5, maxRows: 10 }}
                />
              </p>
            </Card>
            {/* <Card title="Candidate" >
						</Card> */}
          </Grid>
          <Grid item sm={8} xs={12}>
          </Grid>
        </Grid>
        <Grid style={{}} container spacing={24}>
          <Grid item sm={12} xs={12}>
            <Card>
              <h3 style={{ marginBottom: 30, cursor: 'pointer' }}>Setting Position Detail.</h3>
              <Grid container spacing={0}>
                <Grid item sm={12} xs={12}>
                  {/* <p>
											<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
											<span style={{ marginLeft:70}}>
												End Date: <DatePicker onChange={onChange} />
											</span>
										</p> */}
                  <Grid container style={{ marginTop: 30 }}>
                    <Grid item sm={2} xs={12}> Cognative Skill: </Grid>
                    <Grid item sm={4} xs={12}>
                      <SliderStyled range onChange={this.changeCogData} defaultValue={defaultCogData} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{ paddingTop: 60 }} container spaceing={24}>
                  <Grid item sm={6} xs={12}>
                    <CriticalSoftSkills
                      slideData={prepareCreate.info}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <WorkPreference
                      slideData={prepareCreate.info}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item>
                  <Button
                    type="primary"
                    // onClick={modalShow}
                    onClick={this.handleToggle}
                    style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
                  >
                    Create Position.
									</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        {/* Dialog modal from material ui */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Please confirm your create</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonContainer>
              <ButtonStyled style={{ backgroundColor: 'grey' }} onClick={this.handleToggle}>
                Disagree
							</ButtonStyled>
              <ButtonStyled style={{ backgroundColor: '#954590' }} onClick={this.createPosition}>
                Agree
							</ButtonStyled>
            </ButtonContainer>
            {/* <Button style={{ float: 'left', backgroundColor: '#fff' }} onClick={this.handleToggle}>
              Disagree
            </Button>
            <Button style={{ float: 'right' }} onClick={this.createPosition}>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
        {/* end dialog modal */}
      </LayoutContentWrapper>
    )
  }
}

const mapStateToProps = state => ({
  prepareCreate: state.Positions.prepareCreate,
})

export default connect(mapStateToProps,
  {
    Loading,
    LoadingSuccess,
    preCreatePosition
  })(SecondCreatePosition)