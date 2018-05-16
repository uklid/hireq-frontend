import React from 'react'
import { connect } from 'react-redux'
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
import firebase from 'firebase'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
	searchPosition,
	updatePositionData
} from '../../redux/position/actions'

// const dataSource = []
// for (let i = 0; i < 46; i++) {
// 	dataSource.push({
// 		positionName: `Accountants - ${i}`,
// 		category: `Business and Financial - ${i}`,
// 		description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ${i}`,
// 		expandData: 'matong xxx'
// 	})
// }

const columns = [{
	title: 'Position name',
	dataIndex: 'name',
	key: 'name',
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

	// componentWillMount = () => {
	// 	this.setState({
	// 		dataSource: dataSource
	// 	})
	// }

	state = {
		showAll: false,
		showOpen: false,
		showFinished: false,
	}

	searchPositionData = async (event) => {
		try {
			this.props.Loading()
			const getIdToken = await firebase.auth().currentUser.getIdToken()
			// console.log('getIdToken = ', getIdToken)
			const searchKeyword = document.getElementById('position-search').value
			const url = `https://us-central1-hireq-api.cloudfunctions.net/jobs/search?keyword=${searchKeyword}`

			const result = await Axios.get(url, {
				headers: { Authorization: "Bearer " + getIdToken }
				// headers: { Authorization: "Bearer " + localStorage.getItem('headerToken') }
			})
			console.log("search result = ", result)

			this.props.updatePositionData(result.data)
			this.props.LoadingSuccess()
		} catch (err) {
			console.log(err)
		}
	}

	// onSearch = (event) => {

	// 	const filter = event.target.value.toUpperCase()

	// 	const result = dataSource.filter(word => {
	// 		const resultSearch = Object.keys(word).map(e => {
	// 			if (word[e].toUpperCase().includes(filter)) {
	// 				return word[e].toUpperCase().includes(filter)
	// 			}
	// 		})
	// 		if (resultSearch.includes(true)) {
	// 			return word
	// 		}
	// 	})
	// 	this.setState({
	// 		dataSource: result
	// 	})
	// }

	filterOnChange = (name) => (event) => {
		this.setState({
			[name]: !this.state[name],
		})
	}

	render() {
		console.log("positionData = ", this.props.positionData)
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12} xs={12}>
						<Card>
							<InputWrapper>
								<Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
								<TextField
									id="position-search"
									placeholder="Search here"
									margin="normal"
									className="floating-textfield"
									onKeyPress={this.searchPoisition} 
								// onChange={this.onSearch}
								/>
							</InputWrapper>
							<ButtonWrapper>
								<Button type="primary">Filter</Button>
								<Button onClick={this.searchPositionData} type="primary">Search</Button>
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
					<Grid item sm={12} xs={12}>
						<Card
							title="Result"
							style={{ overflowX: 'scroll' }}
						>
							{/* <Table
								bordered
								dataSource={dataSource}
								columns={columns}
								expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
							/> */}
							<Tables
								key={`myTables`}
								tableId="myTable"
								// dataSource={dataSource}
								dataSource={this.props.positionData}
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

const mapStateToProps = (state) => ({
	searchPosition: state.Positions.searchPoisition,
	positionData: state.Positions.positionData,
	headerToken: state.Auth.headerToken
})

export default connect(mapStateToProps,
	{
		searchPosition,
		updatePositionData,
		Loading,
		LoadingSuccess,
	})(CreatePosition)