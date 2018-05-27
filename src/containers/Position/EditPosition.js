import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Input, Checkbox } from 'antd'
import Button from '../HireQComponent/Button'
import Tables from './components/Table'
import CandidatesTable from '../Candidates/components/Table'
import CriticalSoftSkills from './CriticalSoftSkills'
import moment from 'moment'
import WorkPreference from './WorkPreference'
import Ionicon from 'react-ionicons'
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
import { updateAllCandidates, updateAllChecked } from '../../redux/candidates/actions'
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

const ButtonWrapper = styled.div`
		position: absolute;
		right: 37px;
		top: 30px;

		button {
			margin: 0px 10px 0px 10px;
			background-color: #954590;
			border-color: #954590;
		}
		@media only screen and (max-width: 768px) {
			display: none;
		}
`

const InputWrapper = styled.div`
    position: relative;
    // width: 80%;

    .floating-icon {
        position: absolute;
    }
    .floating-textfield {
        margin-top: 0px;
        padding-left: 40px;
        width: 100%;
    }
`

class EditPosition extends React.Component {
	state = {
		open: false,
		openModalCandidate: false,
		defaultAllCandidatesData: [],
		allCandidate: []
	}
	componentWillReceiveProps = (props) => {
		if (!props.location.state.positionId) {
			props.history.push('/dashboard')
		}
	}
	componentWillMount = async () => {
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
					this.setState({
						allCandidate: resultCandidate.data,
						defaultAllCandidatesData: resultCandidate.data
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
	onCheckAllChange = async (event) => {
		const allCheckBox = document.getElementsByClassName("ant-checkbox")
		console.log("Checked all Event: " , event.target)
		if (event.target.checked === true) {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.add("ant-checkbox-checked")
				console.log("Children: ", allCheckBox[i].children)
				if (allCheckBox[i].children[0].checked === false) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					await allCheckBox[i].children[0].click()
				}
			}
		} else {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.remove("ant-checkbox-checked")
				if (allCheckBox[i].children[0].checked === true) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					await allCheckBox[i].children[0].click()
				}
			}
		}
		// this.props.updateAllChecked()
	}
	candidatesColumn = [
		{
			title: <Checkbox onChange={this.onCheckAllChange}>Check all</Checkbox>,
			dataIndex: 'checkbox',
			key: 'checkbox'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'ACTIONS',
			dataIndex: 'buttonAction',
			key: 'buttonAction'
		}
	]
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
		// this.componentDidMount()
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
		const { defaultAllCandidatesData } = this.state
		return Object.values(this.props.allCandidatesData).map((data, index) => {
			return {
				...data,
				candidateId: Object.keys(this.props.allCandidatesData)[index]
			}
		})
	}
	onTextAreaChange = (event) => {
		const { prepareCreate } = this.props
		const { value } = event.target
		prepareCreate.descriptions = value
		const updateData = { ...prepareCreate }
		this.props.preCreatePosition(updateData)
	}
	searchPoisition = (event) => {
		const filter = event.target.value.toUpperCase()
		const { defaultAllCandidatesData } = this.state
		// console.log("defaultALl" , defaultAllCandidatesData)
		// const result = Object.values(this.props.allCandidatesData).filter((word) => {
		const result = Object.values(defaultAllCandidatesData).filter((word) => {
			console.log("word = ", word)
			const name = word.name.toString().toUpperCase().includes(filter)
			const email = word.email.toString().toUpperCase().includes(filter)
			if (name || email) {
				return word
			}
		})
		console.log('result = ', result)
		this.props.updateAllCandidates(result)
		// this.setState({
		// 	defaultAllCandidatesData: result
		// })
	}
	updateStateAfterRender = () => {
		this.setState({
			defaultAllCandidatesData: this.props.allCandidatesData,
		})
	}
	onCheckAllChange = () => {
		this.props.updateAllChecked()
	}
	render() {
		const { prepareCreate, allCandidatesData } = this.props
		const { defaultAllCandidatesData, allCandidate } = this.state
		const defaultCogData = prepareCreate.info && [prepareCreate.info['COG']['min'], prepareCreate.info['COG']['max']]
		// if (Object.keys(allCandidate).length !== Object.keys(allCandidatesData).length) {
		// 	// Update State If ADd new Candidate
		// this.updateStateAfterRender()
		// }
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12} xs={12}>
						<Card>
							<InputWrapper>
								<Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
								<TextField
									id="position-search"
									placeholder="Search candidates here"
									margin="normal"
									className="floating-textfield"
									onChange={this.searchPoisition}
								// onChange={this.onSearch}
								/>
							</InputWrapper>
							{/* <ButtonWrapper>
								<Button
									style={{ marginRight: 45 }}
									onClick={this.searchPositionData}>Search</Button>
							</ButtonWrapper> */}
							<FormGroup row>
								{/* <FilterField
									checked={this.state.showAll}
									onChange={this.filterOnChange('showAll')}
									value="All"
									label="All"
								/>
								<FilterField
									checked={this.state.showOpen}
									onChange={this.filterOnChange('showOpen')}
									value="Open"
									label="Open"
								/>
								<FilterField
									checked={this.state.showFinished}
									onChange={this.filterOnChange('showFinished')}
									value="Finished"
									label="Finished"
								/> */}
							</FormGroup>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 14 }} container spacing={24}>
					<Grid item sm={4} xs={12}>
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
					</Grid>
					<Grid item sm={8} xs={12}>
						<Card title="Outstanding Candidates">
							<CandidatesTable
								dataSource={allCandidatesData && Object.values(this.newObjectCandidate())}
								columns={this.candidatesColumn}
								rowPerPage={5}
								ellipsis={10}
							/>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 10 }} container spacing={24}>
					<Grid item sm={12} xs={12}>
						<Card>
							<h3 style={{ marginBottom: 30, cursor: 'pointer' }}>Edit Position {prepareCreate.name}.</h3>
							<Grid container spacing={0}>
								<Grid item sm={12} xs={12}>
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
										onClick={() => this.handleToggle('open')}
										width="160px"
										marginTop="30px"
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
							onClick={() => this.handleToggle('openModalCandidate')}
							width="160px"
							marginTop="30px"
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
							// onClick={this.add}
							/>
						</DialogContentText>
					</DialogContent>
				</Dialog>
				{/* end dialog modal */}
			</LayoutContentWrapper>
		)
	}
}
const mapStateToProps = state => ({
	prepareCreate: state.Positions.prepareCreate,
	allCandidatesData: state.Candidates.allCandidatesData,
})
export default connect(mapStateToProps,
	{
		Loading,
		LoadingSuccess,
		preCreatePosition,
		updatePreEditData,
		updateAllCandidates,
		updateAllChecked
	})(EditPosition)
