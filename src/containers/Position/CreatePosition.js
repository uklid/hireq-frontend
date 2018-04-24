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

const dataSource = []
for (let i = 0; i < 46; i++) {
  dataSource.push({
		key: i,
		name: `Mike-${i}`,
		age: `age-${i}`,
		address: '10 Downing Street'
	})
}

const columns = [{
	title: 'Name',
	dataIndex: 'name',
	key: 'name',
}, {
	title: 'Age',
	dataIndex: 'age',
	key: 'age',
}, {
	title: 'Address',
	dataIndex: 'address',
	key: 'address',
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
	state = {
		showAll: false,
		showOpen: false,
		showFinished: false,
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
							<Table dataSource={dataSource} columns={columns} />
						</Card>
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

export default CreatePosition