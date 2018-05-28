import React from 'react'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import ReportsWidget from '../../containers/Widgets/report/report-widget'
import SingleProgressWidget from '../../containers/Widgets/progress/progress-single'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Card } from 'antd'
import ReportPersonal from './ReportPersonal'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'

const WhiteCard = styled.div`
	display: flex;
	justify-content: strect;
	padding: 20px;
	background-color: #fff;
	margin-bottom: 30px;
`

const CardWithStyled = styled(Card) `
	.ant-card-head {
		background-color: lightblue;
	}
	.ant-card-body {
		background-color: #eee;
	}
`

class Report extends React.Component {
	renderPDFViaHtml = () => {
		const report = document.getElementById("reportCard")
		window.print()
	}
	render() {
		
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<WhiteCard>
							<p>First name: pitchaya</p>
						</WhiteCard>
					</Grid>
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
								icon="ion-email-unread"
								fontColor="#ffffff"
								bgColor="#7266BA"
							/>
						</IsoWidgetsWrapper>
					</Grid>
					<Grid item sm={3} xs={12}>
						<IsoWidgetsWrapper>
							{/* Sticker Widget */}
							<StickerWidget
								number="3024"
								text="Total Message"
								icon="ion-chatbubbles"
								fontColor="#ffffff"
								bgColor="#7ED320"
							/>
						</IsoWidgetsWrapper>
					</Grid>
					<Grid item sm={3} xs={12}>
						<IsoWidgetsWrapper>
							{/* Sticker Widget */}
							<StickerWidget
								number="3024"
								text="Total Message"
								icon="ion-chatbubbles"
								fontColor="#ffffff"
								bgColor="#7ED320"
							/>
						</IsoWidgetsWrapper>
					</Grid>
					<Grid item sm={3} xs={12}>
						<IsoWidgetsWrapper>
							{/* Sticker Widget */}
							<StickerWidget
								number="3024"
								text="Total Message"
								icon="ion-chatbubbles"
								fontColor="#ffffff"
								bgColor="#7ED320"
							/>
						</IsoWidgetsWrapper>
					</Grid>
					<Grid item xs={12}>
						<h3 style={{ padding: 10 }}>Report</h3>
						<Grid container style={{ padding: 20 }}>
							<Grid item xs={12}>
								<div  id="reportCard">
								<ReportPersonal />
								</div>
								<div id="testBody">
									<img id="testImage" src="" />
								</div>
								<button onClick={this.renderPDFViaHtml}>TestPDF</button>
							</Grid>
						</Grid>
					</Grid>
					{/* </WhiteCard> */}
				</Grid>
			</LayoutContentWrapper >
		)
	}
}

export default Report
