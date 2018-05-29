import React from 'react'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Progress, message, Checkbox, Button, Tooltip } from 'antd'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { connect } from 'react-redux'
import { updatePositionDetail, preCreatePosition } from '../../redux/position/actions'
import { updateAllCandidates, updateAllCheckedByOne } from '../../redux/candidates/actions'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'
import CandidatesTable from '../Candidates/components/Table'
import Ionicon from 'react-ionicons'

const screenWidth = (window.innerWidth / 2) - 100 <= 250 ? 350 : 600
const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;
		width: 100%;

		h4 {
			display: inline;
		}
`

const ProgressStyled = styled(Progress) `
  .ant-progress-bg {
    background-color: #954590;
  }
`

const ChartWrapper = styled.div`
	@media only screen and (max-width: 700px) {
		.isoChartWrapper {
			overflow-x: scroll;
		}
	}
`

class PositionDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			config: {
				componentName: 'SpecifiedDomainRadarChart',
				key: 'SpecifiedDomainRadarChart',
				title: 'Specified Domain Radar Chart',
				width: screenWidth,
				height: 500,
				colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
				angle: 30,
				domain: [0, 100],
				cx: 300,
				cy: 250,
				outerRadius: 150,
			},
		}
	}
	componentDidMount = async () => {
		try {
			firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					this.props.Loading()
					const uid = localStorage.getItem('loginToken')
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					//ถ้าเข้าโดยตรงไม่ได้ ต้องส่ง location.state.positionDetail มาด้วย จะได้เอาไป set เป็น ไอดีครับ
					if (this.props.location.state === undefined) {
						this.props.history.push('/dashboard')
						this.props.LoadingSuccess()
						return
					}
					// ถ้ามาจากหน้า create alert message 
					if (this.props.location.state.message) {
						message.config({
							top: 100,
						})
						message.success(this.props.location.state.message, 13)
					}
					const positionId = this.props.location.state.positionDetail !== undefined ? this.props.location.state.positionDetail : false
					const url = `${baseUrl}/users/${uid}/positions/${positionId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updatePositionDetail(result.data)

					// const candidatesURL = `${baseUrl}/users/${uid}/candidates`
					const candidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates`
					const candidatesResult = await Axios.get(candidateURL, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(candidatesResult.data)
					this.props.LoadingSuccess()
				} else {
					throw new Error("No User Login Data")
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
	firstDatas = () => {
		const positionDetail = this.props.positionDetail.info
		const start = 1
		const last = 8
		return Object.values(positionDetail).slice(start, last).map((data, index) => {
			const dataName = Object.keys(positionDetail)[start + index]
			// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
			if (index <= 14) {
				return {
					subject: dataName,
					value: parseInt((data['min'] + data['max']) / 2)
				}
			}
		})
	}
	secondDatas = () => {
		const positionDetail = this.props.positionDetail.info
		const start = 8
		const last = 15
		return Object.values(positionDetail).slice(start, last).map((data, index) => {
			const dataName = Object.keys(positionDetail)[start + index]
			// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
			if (index <= 15) {
				return {
					subject: dataName,
					value: parseInt((data['min'] + data['max']) / 2)
				}
			}
		})
	}
	cogNativePercent = () => {
		const positionDetail = this.props.positionDetail.info
		const cogNumber = Object.values(positionDetail).slice(0, 1)
		return parseInt((cogNumber[0].max + cogNumber[0].min) / 2)
	}
	onEditPositionClick = async (id) => {
		try {
			this.props.Loading()
			const test = await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${id}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.preCreatePosition({ ...result.data, positionId: id })
					this.props.LoadingSuccess()
					this.props.history.push({
						pathname: '/dashboard/edit-position',
						state: { positionId: id }
					})
				} else {
					this.props.LoadingSuccess()
					console.log("ไม่มี")
				}
			})
		} catch (err) {
			this.props.LoadingSuccess()
			console.log(err)
		}
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
	onCheckAllChange = async (event) => {
		const allCheckBox = document.getElementsByClassName("ant-checkbox")
		console.log("Checked all Event: ", event.target)
		if (event.target.checked === true) {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.add("ant-checkbox-checked")
				console.log("Children: ", allCheckBox[i].children)
				if (allCheckBox[i].children[0].checked === false) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					allCheckBox[i].children[0].click()
				}
			}
			this.props.updateAllCheckedByOne(true)
			// this.props.updateAllChecked()
		} else {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.remove("ant-checkbox-checked")
				if (allCheckBox[i].children[0].checked === true) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					await allCheckBox[i].children[0].click()
				}
			}
			// this.props.updateAllChecked()
			// this.props.updateUncheckCandidateId([])      
			this.props.updateAllCheckedByOne(false)
		}
	}
	render() {
		const { positionDetail, allCandidatesData } = this.props
		console.log("candidate Id : ", positionDetail)
		const candidatesColumn = [
			{
				title: <Checkbox id="checkAllId" checked={this.props.allChecked} onChange={this.onCheckAllChange}>Check all</Checkbox>,
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
		return (
			<LayoutContentWrapper>
				<WhiteWrapper>
					<Grid container spacing={0}>
						<Grid item sm={6} xs={6}>
							<p><h4>Position Name: </h4><span> {positionDetail.name}</span></p>
							<p><h4>Category: </h4><span> {positionDetail.category}</span></p>
							<p><h4>Info: </h4><span> {positionDetail.descriptions}</span></p>
						</Grid>
						<Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item sm={6} xs={6}>
							<Ionicon
								style={{ cursor: 'pointer' }}
								icon="ios-cog"
								fontSize="35px"
								onClick={() => this.onEditPositionClick(this.props.location.state.positionDetail)}
								color="rgb(149, 69, 144)"
							/>
						</Grid>
					</Grid>
				</WhiteWrapper>
				<Grid style={{ marginTop: 30 }} container spacing={0}>
					<Grid item sm={12} xs={12}>
						<WhiteWrapper>
							<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
								<h3>Critical SoftSkill</h3>
								<Tooltip title="prompt text">
									<span style={{ marginLeft: 10 }}>
										<Ionicon icon="ios-alert" fontSize={20} />
									</span>
								</Tooltip>
							</div>
							<ProgressStyled percent={Object.keys(positionDetail).length && this.cogNativePercent()} />
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={24}>
					<Grid item sm={6} xs={12}>
						<WhiteWrapper>
							<ChartWrapper>
								<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
									<h3>Critical Softskill</h3>
									<Tooltip title="prompt text">
										<span style={{ marginLeft: 10 }}>
											<Ionicon icon="ios-alert" fontSize={20} />
										</span>
									</Tooltip>
								</div>
								<SpecifiedDomainRadarChart {...this.state.config} datas={Object.keys(positionDetail).length !== 0 && this.firstDatas()} />
							</ChartWrapper>
						</WhiteWrapper>
					</Grid>
					<Grid item sm={6} xs={12}>
						<WhiteWrapper>
							<ChartWrapper>
								<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
									<h3>Work Preference</h3>
									<Tooltip title="prompt text">
										<span style={{ marginLeft: 10 }}>
											<Ionicon icon="ios-alert" fontSize={20} />
										</span>
									</Tooltip>
								</div>
								<SpecifiedDomainRadarChart {...this.state.config} datas={Object.keys(positionDetail).length !== 0 && this.secondDatas()} />
							</ChartWrapper>
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 20 }} container spacing={0}>
					<Grid item xs={12}>
						<WhiteWrapper>
							<CandidatesTable
								dataSource={Object.keys(allCandidatesData).length !== 0 ? Object.values(this.newObjectCandidate()) : []}
								columns={candidatesColumn}
								rowPerPage={10}
								ellipsis={10}
							/>
						</WhiteWrapper>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	positionDetail: state.Positions.positionDetail,
	allCandidatesData: state.Candidates.allCandidatesData,
	allChecked: state.Candidates.allChecked
})

export default connect(mapStateToProps,
	{
		updatePositionDetail,
		Loading,
		LoadingSuccess,
		updateAllCandidates,
		updateAllCheckedByOne,
		preCreatePosition
	})(withRouter(PositionDetail))