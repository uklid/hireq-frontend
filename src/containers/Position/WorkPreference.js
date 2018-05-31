import React from 'react'
import { withRouter } from 'react-router-dom'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { Slider, Tooltip, Badge } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { preCreatePosition } from '../../redux/position/actions'
import Ionicon from 'react-ionicons'

const DataSlider = ({ onChange, value, title, disabled, toolTip }) => (
	<div>
		<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
			<h4>{title}</h4>
			<Tooltip title="prompt text">
				<span style={{ marginLeft: 10, marginRight: 10 }}>
					<Ionicon icon="ios-alert" fontSize={20} />
				</span>
			</Tooltip>
			<Badge style={{ backgroundColor: 'rgba(149, 69, 144)' }} count={parseInt((value[0] + value[1]) / 2, 10)} />
		</div>
		<SliderStyled range disabled={disabled} onChange={onChange} defaultValue={value} />
	</div>
)

const ChartWrapper = styled.div`
	@media only screen and (max-width: 700px) {
		.isoChartWrapper {
			overflow-x: scroll;
		}
	}
`

const SliderStyled = styled(Slider) `
  .ant-slider-handle {
	border: solid 2px #954590;
  }
  .ant-slider-handle.ant-tooltip-open {
	border-color: #651562 !important;
}
  .ant-slider-track {
	background-color: #954590;
  }
`

class WorkPreference extends React.Component {
	constructor(props) {
		super(props)
		this.first = 8
		this.last = 15
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
		}
	}
	componentWillMount = () => {
		const { slideData } = this.props
		if (slideData === undefined) {
			this.props.history.replace('/dashboard')
			return
		}
	}
	onChange = (dataName) => (value) => {
		const { prepareCreate } = this.props
		prepareCreate.info[dataName] = { min: value[0], max: value[1] }
		const newDataToUpdate = { ...prepareCreate }

		this.props.preCreatePosition(newDataToUpdate)
	}

	datas = () => {
		const { slideData } = this.props
		return Object.values(slideData).slice(this.first, this.last).map((data, index) => {
			const dataName = Object.keys(slideData)[this.first + index]
			// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
			if (index <= 15) {
				return {
					subject: dataName,
					value: parseInt((data['max'] + data['min']) / 2, 10)
				}
			}
			return false
		})
	}

	render() {
		const { slideData } = this.props
		return (
			<ChartWrapper>
				<SpecifiedDomainRadarChart {...this.state.config} datas={slideData !== undefined && this.datas()} />
				{
					slideData !== undefined && Object.values(slideData).slice(this.first, this.last).map((data, index) => {
						const dataName = Object.keys(slideData)[this.first + index]
						// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
						if (index <= 15) {
							return (
								<DataSlider
									key={index}
									toolTip={"ToolTip"}
									disabled={this.props.disabled}
									title={`${dataName}`}
									onChange={this.onChange(dataName)}
									value={[parseInt(data['min'], 10), parseInt(data['max'], 10)]}
								/>
							)
						}
						return false
					})
				}
			</ChartWrapper>
		)
	}
}

const mapStateToProps = state => ({
	prepareCreate: state.Positions.prepareCreate,
})

export default connect(mapStateToProps, { preCreatePosition })(withRouter(WorkPreference))