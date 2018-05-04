import React from 'react'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { Slider } from 'antd'
import styled from 'styled-components'

const DataSlider = ({ onChange, value, title }) => (
	<div>
		<h4>{title}</h4>
		<SliderStyled onChange={onChange} value={value} />
	</div>
)

const ChartWrapper = styled.div `
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

const innerWidth = window.innerWidth
const innerHeight = window.innerHeight

class CriticalSoftSkills extends React.Component {
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
				{ subject: 'Performance', value: 50, fullMark: 100 },
				{ subject: 'Leadership', value: 50, fullMark: 100 },
				{ subject: 'Communication', value: 50, fullMark: 100 },
				{ subject: 'People', value: 50, fullMark: 100 },
				{ subject: 'Political', value: 50, fullMark: 100 },
				{ subject: 'Productivity', value: 50, fullMark: 100 },
			],
		}
	}
	onChange = (number) => (value) => {
		this.setState((prevState) => {
			prevState.datas[number].value = value
			this.setState({
				datas: [
					...prevState.datas,
				]
			})
		})
	}

	render() {
		console.log("height = ", innerHeight)
		console.log("width = ", innerWidth)
		return (
			<ChartWrapper>
				<SpecifiedDomainRadarChart {...this.state.config} datas={this.state.datas} />
				<DataSlider title="Performance and Project" onChange={this.onChange(0)} value={this.state.datas[0].value} />
				<DataSlider title="Leadership and Organizational Management" onChange={this.onChange(1)} value={this.state.datas[1].value} />
				<DataSlider title="Communication, Persuation and Negotiation" onChange={this.onChange(2)} value={this.state.datas[2].value} />
				<DataSlider title="People and Interpersonal Skills" onChange={this.onChange(3)} value={this.state.datas[3].value} />
				<DataSlider title="Political and Cultural Skills" onChange={this.onChange(4)} value={this.state.datas[4].value} />
				<DataSlider title="Productivity and Effectiveness at Work" onChange={this.onChange(5)} value={this.state.datas[5].value} />
			</ChartWrapper>
		)
	}
}

export default CriticalSoftSkills