import React from 'react'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import ReportsWidget from '../../containers/Widgets/report/report-widget'
import SingleProgressWidget from '../../containers/Widgets/progress/progress-single'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'

const WhiteCard = styled.div`
	display: flex;
	justify-content: strect;
	padding: 20px;
	background-color: #fff;
	margin-bottom: 30px;
`

class Report extends React.Component {
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
						<Grid item sm={3}>
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
						<Grid item sm={3}>
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
						<Grid item sm={3}>
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
						<Grid item sm={3}>
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
					{/* </WhiteCard> */}
				</Grid>
			</LayoutContentWrapper >
		)
	}
}

export default Report
