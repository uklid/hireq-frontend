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
import { decreaseTime } from '../../redux/timer/actions'
import moment from 'moment'
import Axios from 'axios'
import { arrayOfDeffered } from 'redux-saga/utils';

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6; 

	.quiz-choice {
		width: 450px;
		margin-left: 50px;
	}

	.button-control {
		margin-left: 52px;
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

const _quizMock = []
for (let i = 1; i <= 20; i++) {
	_quizMock.push({
		quizTitle: `quiz choice - ${i}`,
		radioName: i,
		chooseChoice: Math.floor(Math.random() * 6)
	})
}

class QuizLayout extends React.Component {
	state = {
		quizPercent: 1,
		quizPath: 1,
		quizData: [],
		quizArrayPosition: 0,
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
		const url = 'http://www.us-central1-hireq-api.cloudfunctions.net/v1/candidates/aabbccdd/test'
		const quizData = await Axios.get(url)
		this.setState({ quizData: quizData.data.cog })
	}
	componentDidMount = async () => {
		const { decreaseTime, timeNow } = this.props
		setInterval(() => {
			decreaseTime()
		}, 1000)
	}
	sendAnswer = async (event) => {
		const { answer } = event.target.dataset
		// const url = 'https://us-central1-hireq-api.cloudfunctions.net/v1/candidate/answer'
		// await Axios.post(url, {
		// 	"id": 'aabbccdd',
		// 	"testName": 'cog',
		// 	"testNumber": this.state.quizArrayPosition + 1,
		// 	"answer": answer
		// })
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
		const { quizPath, quizData, quizArrayPosition, beforePath } = this.state
		const { timeNow } = this.props
		if (timeNow < 0) {
			this.props.history.replace('/quiz-complete')
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
								ส่วนที่ 2 - บุคลิกภาพ
							</h4>
							<h4>
								ข้อความต่อไปนี้ตรงกับบุคลิกของท่านเพียงใด
							</h4>
							<h1 style={{ color: 'red' }}>
								{moment.utc(timeNow).format("HH:mm:ss")}
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
										quizPath === 1 && quizData.length >= 1 && quizArrayPosition <= 24 &&
										<QuizLogic
											onClick={this.sendAnswer}
											quizImage={require(`../../image/QuizImage/Question/${Object.values(quizData)[quizArrayPosition].img}`)}
											imageData={Object.values(quizData)[quizArrayPosition].cs}
										/>
									}
									{
										beforePath === 1.5 && <h2>ส่วนที่ 2 </h2>
									}
									{
										quizPath === 2 && _quizMock.map(data => {
											return (
												<QuizChoice
													radioName={data.radioName}
													quizTitle={data.quizTitle}
													chooseChoice={data.chooseChoice}
												/>
											)
										})
									}
									{
										quizPath === 3 && <div>3</div>
									}
									{
										quizPath === 4 && <div>4</div>
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

export default connect(mapStateToProps, { decreaseTime })(QuizLayout)
