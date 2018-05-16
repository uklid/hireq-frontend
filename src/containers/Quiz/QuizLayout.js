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
import { updateCurrentPage } from '../../redux/currentPage/actions'
import {
	updateQuizPercent,
	updateQuizPath,
	updateCurrentTest,
	updateCog,
	updatePer,
	updateSS,
	updateWP
} from '../../redux/quiz/actions'

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6; 

	.quiz-choice {
		width: 660px;
		margin-left: 50px;
	}

	.button-control {
		margin-left: 50px;
		width: 462px;
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

const findQuizPath = (currentQuiz) => {
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
// const candidateId = '-L3y6bEU1lxPOpxeoQw-'
// const apiURL = 'https://us-central1-hireq-api.cloudfunctions.net'

class QuizLayout extends React.Component {
	state = {
		// quizPercent: 1,
		// quizPath: 1,
		// quizDataCog: [],
		// quizDataPer: [],
		// quizDataSS: [],
		// quizDataWP: [],
		quizArrayPosition: 0,
		// currentQuiz: '',
	}
	// nextQuizPath = () => {
	// 	// const quizPercent = this.state.quizPercent + 25
	// 	// const quizPath = this.state.quizPath + 1
	// 	// const beforePath = this.state.beforePath + 1
	// 	// this.setState({
	// 	// 	quizPath,
	// 	// 	quizPercent,
	// 	// 	beforePath
	// 	// })
	// }
	componentWillMount = async () => {
		try {
			// console.log('id = ', this.props.candidateId)
			// console.log('api url = ', this.props.apiURL)
			const { apiURL, candidateId } = this.props
			// Dispatch loading when call api
			this.props.Loading()
			// /////////////////////
			const url = `${apiURL}/candidates/${candidateId}/test`
			const quizData = await Axios.get(url)
			const currentItem = quizData.data.currentItem - 1
			const currentTest = quizData.data.currentTest
			// ตำแหน่ง array เริ่มแรกในการตัดหน้า (currentPage - 1) * 10
			// const currentPage = (quizData.data.currentPage - 1) * 10
			this.props.updateQuizPath(findQuizPath(currentTest).quizPath)
			this.props.updateCurrentPage(quizData.data.currentPage)
			this.props.updateTimeFromApi(quizData.data.startedTime)
			// set currentTest
			this.props.updateCurrentTest(currentTest)
			// set all test Data
			this.props.updateCog(quizData.data.cog)
			this.props.updatePer(quizData.data.per)
			this.props.updateSS(quizData.data.ss)
			this.props.updateWP(quizData.data.wp)

			this.props.updateQuizPercent()
			// ////////////////////////////
			this.setState({
				// quizPercent: findQuizPath(currentTest).percent,
				// quizPath: findPercent(currentTest).quizPath,
				// currentQuiz: currentTest,
				// quizDataCog: quizData.data.cog,
				// quizDataPer: quizData.data.per,
				// quizDataSS: quizData.data.ss,
				// quizDataWP: quizData.data.wp,
				quizArrayPosition: currentItem,
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
		if (timeNow >= 0 && this.state.currentQuiz === 'cog') {
			setInterval(() => {
				decreaseTime()
			}, 1000)
		}
	}
	sendCogAnswer = async (event) => {
		//ADd Loading Spinner after send answer
		this.props.Loading()
		const { apiURL, candidateId } = this.props
		//////////////////////////
		const { imageFileName } = event.target.dataset
		const { answer } = event.target.dataset
		const url = `${apiURL}/candidates/${candidateId}/answer`
		const sendResult = await Axios.post(url, {
			testName: 'cog',
			testNumber: this.state.quizArrayPosition + 1,
			answer: parseInt(answer),
		})
		// set State
		console.log("sendResult = ", sendResult)
		// Update currentTest or Quiz after send answer
		this.props.updateCurrentTest(sendResult.data.nextTestName)
		// this.setState({
		// 	quizPath: 2,
		// 	// currentQuiz: sendResult.data.nextTestName
		// })
		//Remove Loading After Send Answer
		this.props.LoadingSuccess()
		////////////////////////
		// const quizPercent = this.state.quizPercent += 1
		const quizArrayPosition = this.state.quizArrayPosition += 1

		if (quizArrayPosition <= 24) {
			this.setState({ quizArrayPosition })
		}
		if (quizArrayPosition === 25) {
			// this.setState({ quizPath: 2 })
			this.props.updateCurrentTest('per')
			this.props.updateQuizPath()
			// this.setState({
			// 	// currentQuiz: 'per',
			// 	quizPath: 2
			// })
		}
	}
	render() {
		const {
			// quizPath,
			// quizDataCog,
			// quizDataPer,
			// quizDataSS,
			// quizDataWP,
			quizArrayPosition,
			// beforePath,
			// currentQuiz,
		} = this.state
		const {
			timeNow,
			currentPage,
			lastPage,
			currentQuiz,
			quizDataCog,
			quizDataPer,
			quizDataSS,
			quizDataWP,
			quizPath,
			quizPercent
		} = this.props
		//if timeout and currentQuiz = cog change to personal quiz
		if (timeNow < 0 && currentQuiz === 'cog') {
			// if timeout setState to another quizPath or redirect to another page
			// this.props.updateCurrentTest('per')
		}
		// if CurrentQuiz = Finish redirect to done page
		if (currentQuiz === 'finish') {
			this.props.history.replace('/quiz-complete')
		}
		// Slice before map
		// const per = quizDataPer.slice(currentPage, lastPage)
		// const ss = quizDataSS.slice(currentPage, lastPage)
		// const wp = quizDataWP.slice(currentPage, lastPage)
		// console.log("per Slice = ", per)
		// console.log("ss Slice = ", ss)
		// console.log("Wp Slice = ", wp)
		// console.log('QuizData', quizDataSS)
		// console.log('id = ', this.props.candidateId)
		// console.log('api url = ', this.props.apiURL)
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
								{currentQuiz === 'cog' && 'ส่วนที่ 1 - เชาวน์ปัญญา'}
								{currentQuiz === 'per' && 'ส่วนที่ 2 - บุคลิกภาพ'}
								{currentQuiz === 'ss' && 'ส่วนที่ 3 - '}
								{currentQuiz === 'wp' && 'ส่วนที่ 4 - '}
							</h4>
							<h4>
								{currentQuiz === 'cog' && 'จงพิจารณาความสัมพันธ์ของอนุกรมภาพต่อไปนี้ แล้วหาภาพที่มีความสัมพันธ์ต่อเนื่องจากภาพดังกล่าว'}
								{currentQuiz === 'per' && 'ข้อความต่อไปนี้ตรงกับบุคลิกของท่านเพียงใด'}
								{currentQuiz === 'ss' && ''}
								{currentQuiz === 'wp' && ''}
							</h4>
							<h1 style={{ color: 'red' }}>
								{
									timeNow >= 1 && currentQuiz === 'cog' && moment.utc(timeNow).format("HH:mm:ss")
								}
							</h1>
						</div>
					</WhiteCard>
					<WhiteCard>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<FlexCenter>
									<div style={{ width: 500 }}>
										<ProgressWithStyled percent={quizPercent} status="active" />
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
									<Timeline.Item id={`${currentQuiz === 'cog' && 'activeTimeline'}`} color={`${quizPath > 1 ? '#954590' : '#eee'}`}>ส่วนที่ 1 </Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'per' && 'activeTimeline'}`} color={`${quizPath > 2 ? '#954590' : '#eee'}`}>ส่วนที่ 2</Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'ss' && 'activeTimeline'}`} color={`${quizPath > 3 ? '#954590' : '#eee'}`}>ส่วนที่ 3 </Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'wp' && 'activeTimeline'}`} color={`${quizPath > 4 ? '#954590' : '#eee'}`}>ส่วนที่ 4</Timeline.Item>
								</TimelineStyled>
							</Grid>
							<Grid item sm={9} xs={12}>
								<div className="quiz-choice">
									{
										// Quiz Path COG
										currentQuiz === 'cog' && quizDataCog.length >= 1 && quizArrayPosition <= 24 &&
										<QuizLogic
											onClick={this.sendCogAnswer}
											imageDetail={`${Object.values(quizDataCog)[quizArrayPosition].img}`}
											quizImage={require(`../../image/QuizImage/Question/${Object.values(quizDataCog)[quizArrayPosition].img}`)}
											imageData={Object.values(quizDataCog)[quizArrayPosition].cs}
										/>
									}
									{
										//  Quiz Path Per
										currentQuiz === 'per' && quizDataPer.length >= 1 &&
										Object.values(quizDataPer).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a !== undefined ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`personal-quiz-${indexKey}`}
													radioName={`personal-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='per'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
									{
										//  Quiz Path SS
										currentQuiz === 'ss' && quizDataSS.length >= 1 &&
										Object.values(quizDataSS).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`softskill-quiz-${indexKey}`}
													radioName={`softskill-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='ss'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
									{
										// Quiz Path WP
										currentQuiz === 'wp' && quizDataWP.length >= 1 &&
										Object.values(quizDataWP).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`wp-quiz-${indexKey}`}
													radioName={`wp-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='wp'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
								</div>
								{/* <div className="button-control">
									<Button
										style={{
											color: '#fff',
											backgroundColor: '#954590',
											borderColor: '#954590',
											marginTop: 30,
										}}
										onClick={this.nextQuizPath}
									>Next Quiz Path</Button>
								</div> */}
							</Grid>
						</Grid>
					</WhiteCard>
				</QuizWrapper>
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
	apiURL: state.CandidateAuth.apiURL,
	candidateId: state.CandidateAuth.candidateId,
	timeNow: state.Time.time,
	currentPage: state.CurrentPage.currentPage,
	lastPage: state.CurrentPage.lastPage,
	quizPath: state.Quiz.quizPath,
	quizPercent: state.Quiz.quizPercent,
	currentQuiz: state.Quiz.currentQuiz,
	quizDataCog: state.Quiz.quizDataCog,
	quizDataPer: state.Quiz.quizDataPer,
	quizDataSS: state.Quiz.quizDataSS,
	quizDataWP: state.Quiz.quizDataWP
})

export default connect(mapStateToProps,
	{
		updateQuizPercent,
		decreaseTime,
		Loading,
		LoadingSuccess,
		updateTimeFromApi,
		updateCurrentPage,
		updateCurrentTest,
		updateQuizPath,
		updateCog,
		updatePer,
		updateSS,
		updateWP
	})(QuizLayout)
