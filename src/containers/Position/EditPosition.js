import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Button } from 'antd'
import Tables from './components/Table'
import CandidatesTable from '../Candidates/components/Table'
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
	preCreatePosition,
	updatePreEditData
} from '../../redux/position/actions'
import { updateAllCandidates } from '../../redux/candidates/actions'
import Axios from 'axios'
import firebase from 'firebase'
import CreateCandidates from '../Candidates/CreateCandidates'
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

const candidatesColumn = [{
	title: 'Name',
	dataIndex: 'name',
	key: 'name',
}, {
	title: 'Email',
	dataIndex: 'email',
	key: 'email',
}, {
	title: 'ACTIONS',
	dataIndex: 'buttonAction',
	key: 'buttonAction'
}]

const onChange = (date, dateString) => {
	console.log("date =", date)
	console.log("data String =", dateString)
}

class EditPosition extends React.Component {
	state = {
		open: false,
		openModalCandidate: false,
	}
	componentWillReceiveProps = (props) => {
		if (!props.location.state.positionId) {
			props.history.push('/dashboard')
		}
	}
	componentDidMount = async () => {
		try {
			this.props.Loading()
			const test = await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					// console.log("มี data =",data)
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					// console.log("get Id Token = ", getIdToken)
					const positionId = this.props.location.state.positionId
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${positionId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.preCreatePosition({ ...result.data, positionId: positionId })
					// Start Candidate
					const candidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates`
					const resultCandidate = await Axios.get(candidateURL, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(resultCandidate.data)
					// End candidate
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
		if (Object.keys(this.props.prepareCreate).length === 0) {
			this.props.history.push('/dashboard')
		}
	}
	handleToggle = (name) => {
		console.log(name)
		this.setState({
			[name]: !this.state[name]
		})
	}
	createPosition = async () => {
		this.props.Loading()
		const { prepareCreate } = this.props
		const uid = localStorage.getItem('loginToken')
		const updateId = prepareCreate.positionId
		const url = `${baseUrl}/users/${uid}/positions/${updateId}`
		const getIdToken = await firebase.auth().currentUser.getIdToken()
		// Put Edit
		const result = await Axios.put(url, { ...prepareCreate }, {
			headers: { Authorization: "Bearer " + getIdToken }
		})
		console.log("After Create = ", result)
		//change to position detail after create with idCode
		this.props.history.push({
			pathname: '/dashboard/position-detail',
			state: {
				message: result.data.message,
				positionDetail: updateId
			}
		})
		this.props.LoadingSuccess()
	}

	changeCogData = (value) => {
		const { prepareCreate } = this.props
		// console.log('dataCOGG',prepareCreate.info['COG']['min'])
		prepareCreate.info['COG'] = { min: value[0], max: value[1] }
		const newDataToUpdate = { ...prepareCreate }
		this.props.preCreatePosition(newDataToUpdate)
	}
	newObjectCandidate = () => {
		// ฟังชั่นนี้ รีกรุ๊บของ array ใหม่ ให้มี candidateId เข้าไปด้วย
		return Object.values(this.props.allCandidatesData).map((data, index) => {
			return {
				...data,
				candidateId: Object.keys(this.props.allCandidatesData)[index]
			}
		})
	}
	render() {
		const { prepareCreate, allCandidatesData } = this.props
		const defaultCogData = prepareCreate.info && [prepareCreate.info['COG']['min'], prepareCreate.info['COG']['max']]
		console.log("prep = ", prepareCreate)
		return (
			<LayoutContentWrapper>
				<Grid container spacing={24}>
					<Grid item sm={4} xs={12}>
						<Card>
							<p> <Span>Position Name: </Span> {prepareCreate.name} </p>
							<p> <Span>Category: </Span> {prepareCreate.category} </p>
							<p> <Span>Info: </Span> {prepareCreate.descriptions} </p>
						</Card>
						{/* <Card title="Candidate" >
						</Card> */}
					</Grid>
					<Grid item sm={8} xs={12}>
						<CandidatesTable
							dataSource={Object.values(this.newObjectCandidate())}
							columns={candidatesColumn}
							rowPerPage={10}
							ellipsis={10}
						/>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 10 }} container spacing={24}>
					<Grid item sm={12} xs={12}>
						<Card>
							<h3 style={{ marginBottom: 30, cursor: 'pointer' }}>Edit Position {prepareCreate.name}.</h3>
							<Grid container spacing={0}>
								<Grid item sm={12} xs={12}>
									{/* <p>
											<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
											<span style={{ marginLeft:70}}>
												End Date: <DatePicker onChange={onChange} />
											</span>
										</p> */}
									<Grid container style={{ marginTop: 30 }}>
										<Grid
											item sm={2}
											xs={12}
											style={{ display: 'flex', alignItems: 'center' }}
										> Cognative Skill: </Grid>
										<Grid item sm={4} xs={12}>
											<SliderStyled range onChange={this.changeCogData} defaultValue={defaultCogData} />
										</Grid>
									</Grid>
								</Grid>
								<Grid style={{ paddingTop: 60 }} container spacing={24}>
									<Grid item sm={6} xs={12}>
										<CriticalSoftSkills
											slideData={prepareCreate && prepareCreate.info}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<WorkPreference
											slideData={prepareCreate && prepareCreate.info}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid container spacing={0}>
								<Grid item>
									<Button
										type="primary"
										// onClick={modalShow}
										onClick={() => this.handleToggle('open')}
										style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
									>
										Save Edit Position.
									</Button>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
				<Grid container spacing={0}>
					<Grid item>
						<Button
							type="primary"
							// onClick={modalShow}
							onClick={() => this.handleToggle('openModalCandidate')}
							style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
						>
							Add new Candidate.
						</Button>
					</Grid>
				</Grid>
				{/* Dialog modal from material ui */}
				<Dialog
					open={this.state.open}
					onClose={() => this.handleToggle('open')}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Please confirm your edit</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">

						</DialogContentText>
					</DialogContent>
					<DialogActions>
						{/* <Button style={{ float: 'left' }} onClick={() => this.handleToggle('open')}>
							Disagree
            </Button>
						<Button style={{ float: 'right' }} onClick={this.createPosition}>
							Agree
            </Button> */}
						<ButtonContainer>
							<ButtonStyled style={{ backgroundColor: 'grey' }} onClick={() => this.handleToggle('open')}>
								Disagree
            </ButtonStyled>
							<ButtonStyled style={{ backgroundColor: '#954590' }} onClick={this.createPosition}>
								Agree
            </ButtonStyled>
						</ButtonContainer>
					</DialogActions>
				</Dialog>
				{/* end dialog modal */}
				{/* Dialog modal from material ui */}
				<Dialog
					open={this.state.openModalCandidate}
					onClose={() => this.handleToggle('openModalCandidate')}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
				>
					<DialogTitle id="alert-dialog-title">Add your candidate profile.</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<CreateCandidates
								addPositionId={prepareCreate.positionId}
							/>
						</DialogContentText>
					</DialogContent>
					{/* <DialogActions>
						<Button style={{ float: 'left' }} onClick={() => this.handleToggle('openModalCandidate')}>
							Disagree
            </Button> */}
					{/* <Button style={{ float: 'right' }} onClick={this.addNewCandidate}>
							Agree
            </Button> */}
					{/* </DialogActions> */}
				</Dialog>
				{/* end dialog modal */}
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = state => ({
	prepareCreate: state.Positions.prepareCreate,
	allCandidatesData: state.Candidates.allCandidatesData,
	// prepareEditData: state.Positions.prepareEditData
})

export default connect(mapStateToProps,
	{
		Loading,
		LoadingSuccess,
		preCreatePosition,
		updatePreEditData,
		updateAllCandidates
	})(EditPosition)

// import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
// import Grid from 'material-ui/Grid'
// import Card from '../../components/uielements/card'
// import styled from 'styled-components'
// import { Table, DatePicker, Slider, Button } from 'antd'
// import Tables from './components/Table'
// import CriticalSoftSkills from './CriticalSoftSkills'
// import moment from 'moment'
// import WorkPreference from './WorkPreference'
// import Dialog, {
// 	DialogActions,
// 	DialogContent,
// 	DialogContentText,
// 	DialogTitle,
// } from 'material-ui/Dialog'
// import { Loading, LoadingSuccess } from '../../redux/loading/actions'
// import {
// 	updatePreEditData
// } from '../../redux/position/actions'
// import Axios from 'axios'
// import firebase from 'firebase'

// const SliderStyled = styled(Slider) `
//   .ant-slider-handle {
// 	border: solid 2px #954590;
//   }
//   .ant-slider-track {
// 	background-color: #954590;
//   }
// `
// const Span = styled.span`
// 	font-weight: 800;
// 	margin-right: 5px;
// `

// const WhiteWrapper = styled.div`
// 		background-color: #fff;
// 		padding: 20px;

// 		h4 {
// 			display: inline;
// 		}
// `

// const onChange = (date, dateString) => {
// 	console.log("date =", date)
// 	console.log("data String =", dateString)
// }

// class EditPosition extends React.Component {
// 	state = {
// 		open: false,
// 	}
// 	componentWillMount = async () => {
// 		try {
// 			this.props.Loading()
// 			// if(!this.props.location.state.positionId) {
// 			// 	this.props.history.push('/dashboard')
// 			// }
// 			// const test = await firebase.auth().onAuthStateChanged(async (data) => {
// 			// 	if (data) {
// 			// 		// console.log("มี data =",data)
// 			// 		const getIdToken = await firebase.auth().currentUser.getIdToken()
// 			// 		console.log("get Id Token = ", getIdToken)
// 			// 		const positionId = this.props.location.state.positionId
// 			// 		const uid = localStorage.getItem('loginToken')
// 			// 		const url = `${baseUrl}/users/${uid}/positions/${positionId}`
// 			// 		const result = await Axios.get(url, {
// 			// 			headers: { Authorization: "Bearer " + getIdToken }
// 			// 		})
// 			// 		this.props.updatePreEditData(result.data)
// 			// 		this.props.LoadingSuccess()
// 			// 	} else {
// 			// 		this.props.LoadingSuccess()
// 			// 		console.log("ไม่มี")
// 			// 	}
// 			// })
// 		} catch (err) {
// 			this.props.LoadingSuccess()
// 			console.log(err)
// 		}
// 		// if (Object.keys(this.props.prepareEditData).length === 0) {
// 		//   this.props.history.push('/dashboard/create-position')
// 		// }
// 	}
// 	handleToggle = () => {
// 		this.setState({
// 			open: !this.state.open
// 		})
// 	}
// 	clickToEdit = async () => {
// 		this.props.Loading()
// 		const { prepareEditData } = this.props
// 		const uid = localStorage.getItem('loginToken')
// 		const url = `https://us-central1-hireq-api.cloudfunctions.net/users/${uid}/positions`
// 		const getIdToken = await firebase.auth().currentUser.getIdToken()
// 		const result = await Axios.put(url, { ...prepareEditData }, {
// 			headers: { Authorization: "Bearer " + getIdToken }
// 		})
// 		console.log("After Edit = ", result)
// 		//change to position detail after create with idCode
// 		this.props.LoadingSuccess()
// 		this.props.history.push({
// 			pathname: '/dashboard/position-detail',
// 			state: {
// 				message: result.data.message,
// 				positionDetail: result.data.code
// 			}
// 		})
// 	}

// 	render() {
// 		const { prepareEditData } = this.props
// 		if(Object.keys(prepareEditData).length === 0) {
// 			this.props.history.push('/dashboard')
// 		}
// 		return (
// 			<LayoutContentWrapper>
// 				<Grid container spacing={24}>
// 					<Grid item sm={4} xs={12}>
// 						<Card>
// 							<p> <Span>Position Name: </Span> {prepareEditData.name} </p>
// 							<p> <Span>Category: </Span> {prepareEditData.category} </p>
// 							<p> <Span>Info: </Span> {prepareEditData.descriptions} </p>
// 						</Card>
// 						{/* <Card title="Candidate" >
// 						</Card> */}
// 					</Grid>
// 					<Grid item sm={8} xs={12}>
// 					</Grid>
// 				</Grid>
// 				<Grid style={{ marginTop: 10 }} container spacing={24}>
// 					<Grid item sm={12} xs={12}>
// 						<Card>
// 							<h3 style={{ marginBottom: 30, cursor: 'pointer' }}>Setting Position Detail.</h3>
// 							<Grid container spacing={0}>
// 								<Grid item sm={12} xs={12}>
// 									{/* <p>
// 											<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
// 											<span style={{ marginLeft:70}}>
// 												End Date: <DatePicker onChange={onChange} />
// 											</span>
// 										</p>
// 										<Grid container style={{ marginTop: 30 }}>
// 											<Grid item sm={2} xs={12}> Cognative Skill: </Grid>
// 											<Grid item sm={4} xs={12}><SliderStyled range defaultValue={[30, 50]} /></Grid>
// 										</Grid> */}
// 								</Grid>
// 								<Grid style={{ paddingTop: 60 }} container spaceing={24}>
// 									<Grid item sm={6} xs={12}>
// 										<CriticalSoftSkills
// 											slideData={prepareEditData.info}
// 										/>
// 									</Grid>
// 									<Grid item sm={6} xs={12}>
// 										<WorkPreference
// 											slideData={prepareEditData.info}
// 										/>
// 									</Grid>
// 								</Grid>
// 							</Grid>
// 							<Grid container spacing={0}>
// 								<Grid item>
// 									<Button
// 										type="primary"
// 										// onClick={modalShow}
// 										onClick={this.handleToggle}
// 										style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
// 									>
// 										Edit Position.
// 									</Button>
// 								</Grid>
// 							</Grid>
// 						</Card>
// 					</Grid>
// 				</Grid>
// 				{/* Dialog modal from material ui */}
// 				<Dialog
// 					open={this.state.open}
// 					onClose={this.handleClose}
// 					aria-labelledby="alert-dialog-title"
// 					aria-describedby="alert-dialog-description"
// 				>
// 					<DialogTitle id="alert-dialog-title">Please confirm your Edit</DialogTitle>
// 					<DialogContent>
// 						<DialogContentText id="alert-dialog-description">

// 						</DialogContentText>
// 					</DialogContent>
// 					<DialogActions>
// 						<Button style={{ float: 'left' }} onClick={this.handleToggle}>
// 							Disagree
//             </Button>
// 						<Button style={{ float: 'right' }} onClick={this.clickToEdit}>
// 							Agree
//             </Button>
// 					</DialogActions>
// 				</Dialog>
// 				{/* end dialog modal */}
// 			</LayoutContentWrapper>
// 		)
// 	}
// }

// const mapStateToProps = state => ({
// 	prepareEditData: state.Positions.prepareEditData,
// })

// export default connect(mapStateToProps,
// 	{
// 		Loading,
// 		LoadingSuccess,
// 		updatePreEditData
// 	})(withRouter(EditPosition))