import React from 'react'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { Slider } from 'antd'

const DataSlider = ({ onChange, value, title }) => (
	<div>
		<h4>{title}</h4>
		<Slider onChange={onChange} value={value} />
	</div>
)

class WorkPreference extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			config: {
				componentName: 'SpecifiedDomainRadarChart',
				key: 'SpecifiedDomainRadarChart',
				title: 'Specified Domain Radar Chart',
				width: 600,
				height: 500,
				colors: ['#788195'],
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
	onChange = (number) => (value) => {
		this.setState((prevState) => {
			prevState.datas[number].value = value
			this.setState({
				datas: [
					...prevState.datas,
				]
			}
			)
		})
	}

	render() {
		return (
			<div>
				<SpecifiedDomainRadarChart {...this.state.config} datas={this.state.datas} />
				<DataSlider title="Performance and Project" onChange={this.onChange(0)} value={this.state.datas[0].value}/>
				<DataSlider title="Leadership and Organizational Management" onChange={this.onChange(1)} value={this.state.datas[1].value}/>
				<DataSlider title="Communication, Persuation and Negotiation" onChange={this.onChange(2)} value={this.state.datas[2].value}/>
				<DataSlider title="People and Interpersonal Skills" onChange={this.onChange(3)} value={this.state.datas[3].value}/>
				<DataSlider title="Political and Cultural Skills" onChange={this.onChange(4)} value={this.state.datas[4].value}/>
			</div>
		)
	}
}

export default WorkPreference