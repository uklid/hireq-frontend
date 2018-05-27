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
// import rasterizeHTML from 'rasterizehtml'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'

// window.rasterizeHTML = rasterizeHTML
// window.html2canvas = html2canvas
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
// import 'regenerator-runtime/runtime'

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
		// const pdf = new jspdf()
		// console.log(report)
		// // const raster = await rasterizeHTML.drawHTML(report)
		// // console.log(raster)
		// pdf.addHTML(report, () => {
		// 	pdf.save("download.pdf")
		// })
		// report.style.width = "210mm"
		// const canvas = await html2canvas(report)
		// canvas.style.width = "210px"
		// canvas.style.marginLeft = "auto"
		// canvas.style.marginRight = "auto"
		// console.log(canvas)
		// const imageData = canvas.toDataURL('image/png')
		// document.getElementById("testImage").setAttribute("src", imageData)

		// const pdf = new jspdf()
		// pdf.addHTML(canvas)
		// pdf.addImage(imageData, 'JPEG', 0, 0, 210, report.offsetHeight)
		// pdf.addImage(imageData, 'JPEG', 0, 0, 210, 300)
		// pdf.addHTML(canvas, function(){
		// 	pdf.save("download.pdf")
		// })
		// pdf.output('dataurlnewwindow')
		// pdf.save("download.pdf")
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
