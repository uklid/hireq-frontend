import React from 'react'
import styled from 'styled-components'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import {
	Progress,
	Timeline,
	Card,
	Layout,
	Button
} from 'antd'
import QuizChoice from './QuizChoice'
import QuizLogic from './QuizLogic'
import { connect } from 'react-redux'
import { decreaseTime, updateTimeFromApi } from '../../redux/timer/actions'
import moment from 'moment'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6; 

	.quiz-choice {
		width: 660px;
		margin-left: 50px;
	}

	.button-control {
		margin-left: 120px;
		width: 450px;
		display: flex;
		justify-content: space-around;
	}
	
	@media only screen and (max-width: 767px) {
		.quiz-choice {
			width: 100%;
			margin-left: 0px;
		}
		.button-control {
			margin-left: 0px;
			width: 100%;
			display: flex;
			justify-content: space-around;
		}
	}
`

const WhiteCard = styled.div`
	background-color: #fff;
	padding: 20px;
	margin-bottom: 30px;
`

const FlexCenter = styled.div`
	height: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ProgressWithStyled = styled(Progress) `
	.ant-progress-bg {
		background-color: #954590;
	}
`

const TimelineStyled = styled(Timeline) `
  #activeTimeline .ant-timeline-item-head {
		background-color: #954590;
		border-color: #954590 !important;
	}
`

const findPercent = (currentQuiz) => {
	switch (currentQuiz) {
		case 'cog':
			return {
				percent: 1,
				quizPath: 1
			}
		case 'per':
			return {
				percent: 25,
				quizPath: 2
			}
		case 'ss':
			return {
				percent: 50,
				quizPath: 3
			}
		case 'wp':
			return {
				percent: 75,
				quizPath: 4
			}
		default:
			return 0
	}
}

//candidate ID
const candidateId = '-L3y6bEU1lxPOpxeoQw-'
const apiURL = 'https://us-central1-hireq-api.cloudfunctions.net'

class QuizLayout extends React.Component {
	state = {
		quizPercent: 1,
		quizPath: 1,
		quizDataCog: [],
		quizDataPer: [],
		quizDataSS: [],
		quizDataWP: [],
		quizArrayPosition: 0,
		beforePath: 0.5,
		currentQuiz: ''
	}
	nextQuizPath = () => {
		const quizPercent = this.state.quizPercent + 25
		const quizPath = this.state.quizPath + 1
		const beforePath = this.state.beforePath + 1
		this.setState({
			quizPath,
			quizPercent,
			beforePath
		})
	}
	componentWillMount = async () => {
		try {
			// Dispatch loading when call api
			this.props.Loading()
			// /////////////////////
			const url = `${apiURL}/candidates/${candidateId}/test`
			const quizData = await Axios.get(url)
			const currentItem = quizData.data.currentItem - 1
			const currentTest = quizData.data.currentTest
			this.props.updateTimeFromApi(quizData.data.startedTime)

			this.setState({
				quizPercent: findPercent(currentTest).percent,
				quizPath: findPercent(currentTest).quizPath,
				currentQuiz: currentTest,
				quizDataCog: quizData.data.cog,
				quizDataPer: quizData.data.per,
				quizDataSS: quizData.data.ss,
				quizDataWP: quizData.data.wp,
				quizArrayPosition: currentItem
			})
			// after set api data to State SuccessLoading
			this.props.LoadingSuccess()
			// //////////////////////////////////////////
		} catch (err) {
			console.log(err)
		}
	}
	componentDidMount = async () => {
		const { decreaseTime, timeNow } = this.props
		setInterval(() => {
			decreaseTime()
		}, 1000)
	}
	sendAnswer = async (event) => {
		//ADd Loading Spinning after send answer
		this.props.Loading()
		//////////////////////////
		const { imageFileName } = event.target.dataset
		const { answer } = event.target.dataset
		const url = `${apiURL}/candidates/${candidateId}/answer`
		await Axios.post(url, {
			testName: 'cog',
			testNumber: this.state.quizArrayPosition + 1,
			answer: parseInt(answer),
		})
		//Remove Loading After Send Answer
		this.props.LoadingSuccess()
		////////////////////////
		const quizPercent = this.state.quizPercent += 1
		const quizArrayPosition = this.state.quizArrayPosition += 1

		if (quizArrayPosition <= 24) {
			this.setState({ quizArrayPosition })
		}
		if (quizArrayPosition === 25) {
			// this.setState({ quizPath: 2 })
			this.setState({ beforePath: 1.5 })
		}
	}
	render() {
		const {
			quizPath,
			quizDataCog,
			quizDataPer,
			quizDataSS,
			quizDataWP,
			quizArrayPosition,
			beforePath,
			currentQuiz,
		} = this.state
		const { timeNow } = this.props
		if (timeNow < 0) {
			// if timeout redirect to DONE page or other page
			// this.props.history.replace('/quiz-complete')
		}
		return (
			<Layout style={{ minHeight: '100%' }}>
				<QuizWrapper>
					<WhiteCard style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 200,
					}}
					>
						<div style={{ display: 'block', textAlign: 'center' }}>
							<h4>
								{quizPath === 1 && 'ส่วนที่ 1 - เชาวน์ปัญญา'}
								{quizPath === 2 && 'ส่วนที่ 2 - บุคลิกภาพ'}
								{quizPath === 3 && 'ส่วนที่ 3 - '}
								{quizPath === 4 && 'ส่วนที่ 4 - '}
							</h4>
							<h4>
								{quizPath === 1 && 'จงพิจารณาความสัมพันธ์ของอนุกรมภาพต่อไปนี้ แล้วหาภาพที่มีความสัมพันธ์ต่อเนื่องจากภาพดังกล่าว'}
								{quizPath === 2 && 'ข้อความต่อไปนี้ตรงกับบุคลิกของท่านเพียงใด'}
								{quizPath === 3 && ''}
								{quizPath === 4 && ''}
							</h4>
							<h1 style={{ color: 'red' }}>
								{
									timeNow >= 1 && moment.utc(timeNow).format("HH:mm:ss")
								}
							</h1>
						</div>
					</WhiteCard>
					<WhiteCard>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<FlexCenter>
									<div style={{ width: 500 }}>
										<ProgressWithStyled percent={this.state.quizPercent} status="active" />
									</div>
								</FlexCenter>
							</Grid>
						</Grid>
						<Grid container spacing={0}>
							<Grid
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
								item
								sm={3}
								xs={12}
							>
								<TimelineStyled>
									<Timeline.Item id={`${quizPath === 1 && 'activeTimeline'}`} color={`${quizPath > 1 ? '#954590' : '#eee'}`}>ส่วนที่ 1 </Timeline.Item>
									<Timeline.Item id={`${quizPath === 2 && 'activeTimeline'}`} color={`${quizPath > 2 ? '#954590' : '#eee'}`}>ส่วนที่ 2</Timeline.Item>
									<Timeline.Item id={`${quizPath === 3 && 'activeTimeline'}`} color={`${quizPath > 3 ? '#954590' : '#eee'}`}>ส่วนที่ 3 </Timeline.Item>
									<Timeline.Item id={`${quizPath === 4 && 'activeTimeline'}`} color={`${quizPath > 4 ? '#954590' : '#eee'}`}>ส่วนที่ 4</Timeline.Item>
								</TimelineStyled>
							</Grid>
							<Grid item sm={9} xs={12}>
								<div className="quiz-choice">
									{
										currentQuiz === 'cog' && quizDataCog.length >= 1 && quizArrayPosition <= 24 &&
										<QuizLogic
											onClick={this.sendAnswer}
											imageDetail={`${Object.values(quizDataCog)[quizArrayPosition].img}`}
											quizImage={require(`../../image/QuizImage/Question/${Object.values(quizDataCog)[quizArrayPosition].img}`)}
											imageData={Object.values(quizDataCog)[quizArrayPosition].cs}
										/>
									}
									{
										// beforePath === 1.5 && <h2>ส่วนที่ 2 </h2>
									}
									{
										currentQuiz === 'per' && quizDataPer.length >= 1 && quizDataPer.map((data, index) => {
											return (
												<QuizChoice
													key={index}
													radioName={`personal-quiz-${index}`}
													quizTitle={data.th}
													testNumber={index + 1}
													testName='per'
												/>
											)
										})
									}
									{
										currentQuiz === 'ss' && quizDataSS.length >= 1 && quizDataSS.map((data, index) => {
											return (
												<QuizChoice
													key={index}
													radioName={`softskill-quiz-${index}`}
													quizTitle={data.th}
													testNumber={index + 1}
													testName='ss'
												/>
											)
										})
									}
									{
										currentQuiz === 'wp' && quizDataWP.length >= 1 && quizDataWP.map((data, index) => {
											return (
												<QuizChoice
													key={index}
													radioName={`wp-quiz-${index}`}
													quizTitle={data.th}
													testNumber={index + 1}
													testName='wp'
												/>
											)
										})
									}
								</div>
								<div className="button-control">
									<Button
										style={{
											color: '#fff',
											backgroundColor: '#954590',
											borderColor: '#954590',
											marginTop: 30,
										}}
										onClick={this.nextQuizPath}
									>Next Quiz Path</Button>
								</div>
							</Grid>
						</Grid>
					</WhiteCard>
				</QuizWrapper>
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({ timeNow: state.Time.time })

export default connect(mapStateToProps,
	{ decreaseTime, Loading, LoadingSuccess, updateTimeFromApi })(QuizLayout)
