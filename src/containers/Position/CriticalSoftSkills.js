import React from 'react'
import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { Slider } from 'antd'

const DataSlider = ({ onChange, value }) => (
    <Slider onChange={onChange} value={value} />
)

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
                { subject: 'Math', value: 80, fullMark: 100 },
                { subject: 'Chinese', value: 98, fullMark: 100 },
                { subject: 'English', value: 86, fullMark: 100 },
                { subject: 'Geography', value: 99, fullMark: 100 },
                { subject: 'Physics', value: 85, fullMark: 100 },
                { subject: 'History', value: 65, fullMark: 100 },
            ],
            text: 'xxxx'
        }
    }
    onChange = (number) => (value1) => {
        this.setState((prevState) => {
            prevState.datas[number].value = value1
            this.setState({
                text: value1,
                datas: [
                    ...prevState.datas,
                ]
            }
            )
        })
    }

    render() {
        // console.log("vvalue = ",this.state.datas[0].value)
        return (
            <div>
                <SpecifiedDomainRadarChart {...this.state.config} datas={this.state.datas} />
                <Slider onChange={this.onChange(0)} value={this.state.datas[0].value} max={100}/>
                <Slider onChange={this.onChange(1)} value={this.state.datas[1].value} max={100}/>
                {/* <DataSlider onChange={this.onChange} value={this.state.datas[0].value} /> */}
            </div>
        )
    }
}

export default CriticalSoftSkills