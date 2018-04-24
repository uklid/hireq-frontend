import React from 'react'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider } from 'antd'
import CriticalSoftSkills from './CriticalSoftSkills'
import moment from 'moment'
import WorkPreference from './WorkPreference'

const Span = styled.span`
	font-weight: 800;
	margin-right: 5px;
`

const columns = [
	{
		title: 'First Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Last Name',
		dataIndex: 'lastName',
		key: 'lastName',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Complete',
		dataIndex: 'complete',
		key: 'complete',
	},
	{
		title: 'Q-Score',
		dataIndex: 'qScore',
		key: 'qScore',
	}
]

const dataSouce = []
for (let i = 0; i <= 30; i++) {
	dataSouce.push({
		firstName: `Mike Number ${i}`,
		lastName: `Mike Last Name ${i}`,
		email: `xxx${i}@email.com`,
		complete: `${i}/xx/2000`,
		qScore: `q  - score : ${i + Math.random()}`
	})
}

const onChange = (date, dateString) => {
	console.log("date =", date)
	console.log("data String =", dateString)
}

class EditPosition extends React.Component {
	render() {
		return (
			<LayoutContentWrapper>
				<Grid container spacing={24}>
					<Grid item sm={4}>
						<Card>
							<p> <Span>Position Name: </Span> Accountant </p>
							<p> <Span>Category: </Span> Finance </p>
							<p> <Span>Info: </Span> 123123123123123123123 </p>
						</Card>
						<Card title="Candidate" >

						</Card>
					</Grid>
					<Grid item sm={8}>
						<Card title="Outstanding Candidates">
							<Table dataSource={dataSouce} columns={columns} />
						</Card>
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item sm={12}>
						<Card title="Edit Position Detail">
							<Grid container spacing={0}>
								<Grid item sm={12}>
									<p>
										<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
										<span>
											End Date: <DatePicker onChange={onChange} />
										</span>
									</p>
									<Grid container>
										<Grid item sm={2}> Cognative Skill: </Grid>
										<Grid item sm={4}><Slider defaultValue={30} /></Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid container spaceing={0}>
								<Grid item sm={6}>
									<CriticalSoftSkills />
								</Grid>
								<Grid item sm={6}>
									<WorkPreference />
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

export default EditPosition