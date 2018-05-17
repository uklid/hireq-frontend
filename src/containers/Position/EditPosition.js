import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Button } from 'antd'
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
	updatePreEditData
} from '../../redux/position/actions'
import Axios from 'axios'
import firebase from 'firebase'

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

const onChange = (date, dateString) => {
	console.log("date =", date)
	console.log("data String =", dateString)
}

class EditPosition extends React.Component {
	state = {
		open: false,
	}
	componentWillMount = async () => {
		try {
			this.props.Loading()
			if(!this.props.location.state.positionId) {
				this.props.history.push('/dashboard')
			}
			const test = await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					// console.log("มี data =",data)
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					console.log("get Id Token = ", getIdToken)
					const positionId = this.props.location.state.positionId
					const uid = localStorage.getItem('loginToken')
					const url = `https://us-central1-hireq-api.cloudfunctions.net/users/${uid}/positions/${positionId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updatePreEditData(result.data)
					this.props.LoadingSuccess()
				} else {
					this.props.LoadingSuccess()
					console.log("ไม่มี")
				}
			})
		} catch (err) {
			this.props.LoadingSuccess()
			console.log(err)
		}
		// if (Object.keys(this.props.prepareEditData).length === 0) {
		//   this.props.history.push('/dashboard/create-position')
		// }
	}
	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	}
	editPosition = async () => {
		this.props.Loading()
		const { prepareEditData } = this.props
		const uid = localStorage.getItem('loginToken')
		const url = `https://us-central1-hireq-api.cloudfunctions.net/users/${uid}/positions`
		const getIdToken = await firebase.auth().currentUser.getIdToken()
		const result = await Axios.put(url, { ...prepareEditData }, {
			headers: { Authorization: "Bearer " + getIdToken }
		})
		console.log("After Edit = ", result)
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

	render() {
		const { prepareEditData } = this.props
		return (
			<LayoutContentWrapper>
				<Grid container spacing={24}>
					<Grid item sm={4} xs={12}>
						<Card>
							<p> <Span>Position Name: </Span> {prepareEditData.name} </p>
							<p> <Span>Category: </Span> {prepareEditData.category} </p>
							<p> <Span>Info: </Span> {prepareEditData.descriptions} </p>
						</Card>
						{/* <Card title="Candidate" >
						</Card> */}
					</Grid>
					<Grid item sm={8} xs={12}>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 10 }} container spacing={24}>
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
										</p>
										<Grid container style={{ marginTop: 30 }}>
											<Grid item sm={2} xs={12}> Cognative Skill: </Grid>
											<Grid item sm={4} xs={12}><SliderStyled range defaultValue={[30, 50]} /></Grid>
										</Grid> */}
								</Grid>
								<Grid style={{ paddingTop: 60 }} container spaceing={24}>
									<Grid item sm={6} xs={12}>
										<CriticalSoftSkills
											slideData={prepareEditData.info}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<WorkPreference
											slideData={prepareEditData.info}
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
										Edit Position.
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
					<DialogTitle id="alert-dialog-title">Please confirm your Edit</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">

						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button style={{ float: 'left' }} onClick={this.handleToggle}>
							Disagree
            </Button>
						<Button style={{ float: 'right' }} onClick={this.editPosition}>
							Agree
            </Button>
					</DialogActions>
				</Dialog>
				{/* end dialog modal */}
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = state => ({
	prepareEditData: state.Positions.prepareEditData,
})

export default connect(mapStateToProps,
	{
		Loading,
		LoadingSuccess,
		updatePreEditData
	})(EditPosition)