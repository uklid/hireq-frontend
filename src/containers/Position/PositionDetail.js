import React from 'react'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { Progress } from 'antd'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;

		h4 {
			display: inline;
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
				width: 600,
				height: 500,
				colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
				angle: 30,
				domain: [0, 100],
				cx: 300,
				cy: 250,
				outerRadius: 150,
			},
			datas: [
				{ subject: 'Math', value: 50, fullMark: 100 },
				{ subject: 'Chinese', value: 50, fullMark: 100 },
				{ subject: 'English', value: 50, fullMark: 100 },
				{ subject: 'Geography', value: 50, fullMark: 100 },
				{ subject: 'Physics', value: 50, fullMark: 100 },
				{ subject: 'History', value: 50, fullMark: 100 },
			],
		}
	}
	render() {
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12}>
						<WhiteWrapper>
							<p><h4>Position Name: </h4><span> Accountant</span></p>
							<p><h4>Category: </h4><span> Account</span></p>
							<p><h4>Info: </h4><span> Analyz xxxxx xxxx detail Ompsdq Lorem spd</span></p>
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={0}>
					<Grid item sm={12}>
						<WhiteWrapper>
							<h3> Cognative Ability </h3>
							<Progress percent={40} />
						</WhiteWrapper>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={24}>
					<Grid item sm={6}>
						<WhiteWrapper>
							<h3>Critical SoftSkill</h3>
							<SpecifiedDomainRadarChart {...this.state.config} datas={this.state.datas} />
						</WhiteWrapper>
					</Grid>
					<Grid item sm={6}>
						<WhiteWrapper>
							<h3>Work Preference</h3>
							<SpecifiedDomainRadarChart {...this.state.config} datas={this.state.datas} />
						</WhiteWrapper>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

export default PositionDetail