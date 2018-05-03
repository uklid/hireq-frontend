import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Card from '../../components/uielements/card'
import { Table } from 'antd'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import { Button } from 'antd'
import Tables from './components/Table'
import moment from 'moment'
const dataSource = []
for (let i = 0; i < 46; i++) {
	dataSource.push({
		positionName: `Accountants - ${i}`,
		category: `Business and Financial - ${i}`,
		description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ${i}`
	})
}

const columns = [{
	title: 'Position name',
	dataIndex: 'positionName',
	key: 'positionName',
}, {
	title: 'Category',
	dataIndex: 'category',
	key: 'category',
}, {
	title: 'More info',
	dataIndex: 'moreInfo',
	key: 'moreInfo',
}]

const InputWrapper = styled.div`
    position: relative;
    width: 80%;

    .floating-icon {
        position: absolute;
    }
    .floating-textfield {
        margin-top: 0px;
        padding-left: 40px;
        width: 100%;
    }
`

const ButtonWrapper = styled.div`
		position: absolute;
		right: 37px;
		top: 30px;

		button {
			margin: 0px 10px 0px 10px;
			background-color: #954590;
			border-color: #954590;
		}
		@media only screen and (max-width: 768px) {
			display: none;
		}
`

const NewButton = styled.button`
	color: #fff;
	background-color: #954590;
	border-color: #954590;
`

const FilterField = ({ checked, onChange, value, label }) => (
	<FormControlLabel
		// style={{ marginLeft: 20, marginRight: 20, }}
		control={
			<Checkbox
				checked={checked}
				onChange={onChange}
				value={value}
				style={{ color: '#954590' }}
			/>
		}
		label={label}
	/>
)

class CreatePosition extends React.Component {

	componentWillMount = () => {
		this.setState({
			dataSource: dataSource
		})
	}

	state = {
		showAll: false,
		showOpen: false,
		showFinished: false,
	}

	onSearch = (event) => {

		const filter = event.target.value.toUpperCase()

		const result = dataSource.filter(word => {
			const resultSearch = Object.keys(word).map(e => {
				if (word[e].toUpperCase().includes(filter)) {
					return word[e].toUpperCase().includes(filter)
				}
			})
			if (resultSearch.includes(true)) {
				return word
			}
		})
		this.setState({
			dataSource: result
		})
	}

	filterOnChange = (name) => (event) => {
		this.setState({
			[name]: !this.state[name],
		})
	}

	render() {
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12}>
						<Card>
							<InputWrapper>
								<Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
								<TextField
									id="position-search"
									placeholder="Search here"
									margin="normal"
									className="floating-textfield"
									onChange={this.onSearch}
								/>
							</InputWrapper>
							<ButtonWrapper>
								<Button type="primary">Filter</Button>
								<Button type="primary">Search</Button>
							</ButtonWrapper>
							<FormGroup row>
								<FilterField
									checked={this.state.showAll}
									onChange={this.filterOnChange('showAll')}
									value="All"
									label="All"
								/>
								<FilterField
									checked={this.state.showOpen}
									onChange={this.filterOnChange('showOpen')}
									value="Open"
									label="Open"
								/>
								<FilterField
									checked={this.state.showFinished}
									onChange={this.filterOnChange('showFinished')}
									value="Finished"
									label="Finished"
								/>
							</FormGroup>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={0}>
					<Grid item sm={12}>
						<Card
							title="Result"
						>
							{/* <Table
								bordered
								dataSource={dataSource}
								columns={columns}
								expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
							/> */}
							<Tables
								tableId="myTable"
								// dataSource={dataSource}
								dataSource={this.state.dataSource}
								columns={columns}
								rowPerPage={7}
								ellipsis={4}
							/>
							{/* <Tables
								dataSource={dataSource}
								columns={columns}
								rowPerPage={4}
								ellipsis={4}
							/> */}
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 20 }} container spacing={0}>
					<Grid item>
						<Button style={{
							color: '#fff',
							backgroundColor: '#954590',
							borderColor: '#954590',
						}}>Create position</Button>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

export default CreatePosition