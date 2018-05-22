import React from 'react'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Progress, message } from 'antd'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { connect } from 'react-redux'
import { updatePositionDetail } from '../../redux/position/actions'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'
// const screenHeight = window.innerHeight
const screenWidth = (window.innerWidth / 2) - 100 <= 250 ? 350 : 600

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;

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
					console.log("getidtoken positiondetail ", getIdToken)
					console.log("this.props.location", this.props.location.state)
					//ถ้าเข้าโดยตรงไม่ได้ ต้องส่ง location.state.positionDetail มาด้วย จะได้เอาไป set เป็น ไอดีครับ
					if (this.props.location.state === undefined) {
						console.log("ไปอีกหน้าสิจ๊ะ")
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
					console.log(result.data)
					// this.props.updatePositionDetail(result.data)
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
		console.log("positionDatas ==== ", positionDetail)
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
		console.log("positionDatas ==== ", positionDetail)
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
	render() {
		const { positionDetail } = this.props
		console.log("secondDatas ", positionDetail.info)
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12} xs={12}>
						<WhiteWrapper>
							<p><h4>Position Name: </h4><span> {positionDetail.name}</span></p>
							<p><h4>Category: </h4><span> {positionDetail.category}</span></p>
							<p><h4>Info: </h4><span> {positionDetail.descriptions}</span></p>
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={0}>
					<Grid item sm={12} xs={12}>
						<WhiteWrapper>
							<h3> Cognative Ability </h3>
							<ProgressStyled percent={Object.keys(positionDetail).length && this.cogNativePercent()} />
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={24}>
					<Grid item sm={6} xs={12}>
						<WhiteWrapper>
							<ChartWrapper>
								<h3>Critical SoftSkill</h3>
								<SpecifiedDomainRadarChart {...this.state.config} datas={Object.keys(positionDetail).length !== 0 && this.firstDatas()} />
							</ChartWrapper>
						</WhiteWrapper>
					</Grid>
					<Grid item sm={6} xs={12}>
						<WhiteWrapper>
							<ChartWrapper>
								<h3>Work Preference</h3>
								<SpecifiedDomainRadarChart {...this.state.config} datas={Object.keys(positionDetail).length !== 0 && this.secondDatas()} />
							</ChartWrapper>
						</WhiteWrapper>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	positionDetail: state.Positions.positionDetail
})

export default connect(mapStateToProps,
	{
		updatePositionDetail,
		Loading,
		LoadingSuccess
	})(withRouter(PositionDetail))