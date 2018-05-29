import React from 'react'
import { Link } from 'react-router-dom'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import ReportsWidget from '../../containers/Widgets/report/report-widget'
import SingleProgressWidget from '../../containers/Widgets/progress/progress-single'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Card, message, Input, Button } from 'antd'
import ReportPersonal from './ReportPersonal'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import { updateAllCandidates } from '../../redux/candidates/actions'
import Ionicon from 'react-ionicons'
import Axios from 'axios'
import moment from 'moment'
import { baseUrl } from '../../libs/url/baseUrl'

const WhiteCard = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 20px;
	background-color: #fff;
	margin-bottom: 30px;
	width: 100%;
`

const CardWithStyled = styled(Card) `
	.ant-card-head {
		background-color: lightblue;
	}
	.ant-card-body {
		background-color: #eee;
	}
`

const FormWrapper = styled.div`
	width: 350px;
	padding: 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	p {
		margin: 0px;
	}
	h4 {
		margin: 0px;
	}
`

class CandidateDetail extends React.Component {
	state = {
		isEdit: false,
	}
	componentDidMount = async () => {
		const { candidateId } = this.props.location.state
		this.props.Loading()
		const test = await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/candidates/${candidateId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(result.data)
					this.props.LoadingSuccess()
				} catch (err) {
					this.props.LoadingSuccess()
					console.log(err)
				}
			} else {
				this.props.LoadingSuccess()
				console.log("ไม่มี")
			}
		})

	}
	handleChange = (event) => {
		const { allCandidatesData } = this.props
		const name = event.target.getAttribute('name')
		const value = event.target.value
		allCandidatesData[name] = value
	}
	saveChange = async () => {
		this.props.Loading()
		const { candidateId } = this.props.location.state
		const positionId = this.props.allCandidatesData.position
		const { allCandidatesData } = this.props
		const test = await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${positionId}/candidates/${candidateId}`
					const result = await Axios.put(url, allCandidatesData, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(allCandidatesData)
					this.props.LoadingSuccess()
					message.success('Update candidate success', 10)
				} catch (err) {
					this.props.LoadingSuccess()
					message.error('Fail to update candidate', 10)
					console.log(err)
				}
			} else {
				this.props.LoadingSuccess()
				console.log("ไม่มี")
			}
		})
	}
	renderPDFViaHtml = () => {
		const { allCandidatesData } = this.props
		let doc = new jspdf()
		html2canvas(document.getElementById("reportBody1"), {
			// allowTaint: false,
			// useCORS: false
		}).then(function (canvas) {
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			let width = doc.internal.pageSize.width - 10
			let height = doc.internal.pageSize.height - 20
			doc.addImage(data1, 'JPEG', 5, 5, width, height)
			doc.addPage()
		})
		html2canvas(document.getElementById("reportBody2"), {
			// allowTaint: false,
			// useCORS: false
		}).then(function (canvas) {
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			let width = doc.internal.pageSize.width - 10
			let height = doc.internal.pageSize.height - 8
			doc.addImage(data1, 'JPEG', 5, 5, width, height)
			doc.addPage()
		})
		html2canvas(document.getElementById("reportBody3"), {
			// allowTaint: false,
			// useCORS: false
		}).then(function (canvas) {
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			let width = doc.internal.pageSize.width - 10
			let height = doc.internal.pageSize.height - 20
			doc.addImage(data1, 'JPEG', 5, 5, width, 93)
			doc.save(`${allCandidatesData.name}-${moment(new Date()).format("DD-MM-YY_HH-mm-ss")}.pdf`)
		})
	}
	render() {
		const { allCandidatesData } = this.props
		console.log("Candidate Data: ", allCandidatesData)
		return (
			<div id="testBody1" >
				<LayoutContentWrapper >
					<Grid container spacing={0}>
						<WhiteCard>
							<Grid item xs={6}>
								<FormWrapper>
									<h4>NAME: </h4>
									{
										this.state.isEdit ?
											<Input name="name" onChange={this.handleChange} defaultValue={allCandidatesData.name} /> : <p style={{ marginLeft: 10 }}>{allCandidatesData.name}</p>
									}
								</FormWrapper>
								<FormWrapper>
									<h4>EMAIL: </h4>
									{
										this.state.isEdit ?
											<Input name="email" onChange={this.handleChange} defaultValue={allCandidatesData.email} /> : <p style={{ marginLeft: 10 }}>{allCandidatesData.email}</p>}
								</FormWrapper>
								<FormWrapper>
									<h4>POSITION: </h4>
									<p style={{ marginLeft: 10 }}>
										<Link to={{
											pathname: '/dashboard/position-detail',
											state: { positionDetail: allCandidatesData.position }
										}}
										>
											{allCandidatesData.position}
										</Link>
									</p>
								</FormWrapper>
							</Grid>
							<Grid item xs={6}
								style={{
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<FormWrapper style={{ alignSelf: 'flex-start' }}>
									<h4>CREATE TIME</h4>
									<p style={{ marginLeft: 10 }}>{moment(allCandidatesData.createdTime).format("DD/MM/YY HH:mm:ss")}</p>
								</FormWrapper>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									{this.state.isEdit && <Button onClick={this.saveChange}>Save Edit</Button>}
									<Ionicon
										style={{ cursor: 'pointer' }}
										icon="ios-cog"
										fontSize="35px"
										onClick={() => { this.setState({ isEdit: !this.state.isEdit }) }}
										color="rgb(149, 69, 144)"
									/>
								</div>
							</Grid>
						</WhiteCard>
					</Grid>
					<Grid style={{ backgroundColor: '#fff' }} container spacing={8}>
						{/* <WhiteCard> */}
						<Grid item xs={12}>
							<h2 style={{ padding: 10 }}>Summary of Q-score Results</h2>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								{/* Report Widget */}
								<StickerWidget
									number="210"
									text="Unread Email"
									icon="ion-ios-infinite"
									fontColor="#ffffff"
									bgColor="#7263bc"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								{/* Sticker Widget */}
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-android-list"
									fontColor="#ffffff"
									bgColor="#42a5f5"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								{/* Sticker Widget */}
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-heart"
									fontColor="#ffffff"
									bgColor="#7ed321"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								{/* Sticker Widget */}
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-trophy"
									fontColor="#ffffff"
									bgColor="#e05273"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>

						<Grid item xs={12}>
							<h3 style={{ padding: 10 }}>Report</h3>
							<Grid container style={{ padding: 20 }}>
								<Grid item xs={12}>
									<div id="testBody" ref={(elem) => this.Line1 = elem} >
										<ReportPersonal />
										{/* <img id="testImage" src="" /> */}
									</div>
									<button style={{
										backgroundColor: '#D0021B',
										color: 'white',
										width: 200,
										height: 40,
										alignItems: 'center',
										alignSelf: 'center',
										marginTop: 30
									}}
										onClick={this.renderPDFViaHtml}>Print Report.</button>
								</Grid>
							</Grid>
						</Grid>
						{/* </WhiteCard> */}
					</Grid>

				</LayoutContentWrapper >
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	allCandidatesData: state.Candidates.allCandidatesData,
})

export default connect(mapStateToProps, {
	Loading,
	LoadingSuccess,
	updateAllCandidates
})(CandidateDetail)
