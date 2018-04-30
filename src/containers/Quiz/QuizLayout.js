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

class QuizLayout extends React.Component {
	render() {
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
						</div>
					</WhiteCard>
					<WhiteCard>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<FlexCenter>
									<div style={{ width: 500 }}>
										<Progress percent={50} status="active" />
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
							>
								<Timeline>
									<Timeline.Item color="green">ส่วนที่ 1 </Timeline.Item>
									<Timeline.Item color="green">ส่วนที่ 2</Timeline.Item>
									<Timeline.Item color="green">ส่วนที่ 3 </Timeline.Item>
									<Timeline.Item color="#eee">ส่วนที่ 6</Timeline.Item>
								</Timeline>
							</Grid>
							<Grid item sm={9}>
								<QuizChoice radioName="1" />
								<QuizChoice radioName="2" />
								<QuizChoice radioName="3" />
								<QuizChoice radioName="4" />
								<QuizChoice radioName="5" />
								<QuizChoice radioName="6" />

								{/* <QuizChoice /> */}
							</Grid>
						</Grid>
					</WhiteCard>
				</QuizWrapper>
			</Layout>
		)
	}
}

export default QuizLayout
