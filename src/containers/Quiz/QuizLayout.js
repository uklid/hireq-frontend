import React from 'react'
import styled from 'styled-components'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import {
	Progress,
	Timeline,
	Card,
	Layout
} from 'antd'
import QuizChoice from './QuizChoice'
import { connect } from 'react-redux'
import { decreaseTime } from '../../redux/timer/actions'
import moment from 'moment'

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6;
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
	componentDidMount = () => {
		const { decreaseTime, timeNow } = this.props
		setInterval(() => {
			decreaseTime()
		}, 1000)
	}
	render() {
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
										<ProgressWithStyled percent={50} status="active" />
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
									<Timeline.Item color="#954590">ส่วนที่ 1 </Timeline.Item>
									<Timeline.Item id="activeTimeline" color="#954590">ส่วนที่ 2</Timeline.Item>
									<Timeline.Item color="#eee">ส่วนที่ 3 </Timeline.Item>
									<Timeline.Item color="#eee">ส่วนที่ 6</Timeline.Item>
								</TimelineStyled>
							</Grid>
							<Grid item sm={9} xs={12}>
								{
									_quizMock.map(data => {
										return (
											<QuizChoice
												radioName={data.radioName}
												quizTitle={data.quizTitle}
												chooseChoice={data.chooseChoice}
											/>
										)
									})
								}
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
