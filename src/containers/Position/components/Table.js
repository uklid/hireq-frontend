import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import RowData from './RowData'
import { connect } from 'react-redux'
import { preCreatePosition, updatePreEditData } from '../../../redux/position/actions'

const TableStyled = styled.table`
    width: 100%;
		border-collapse: collapse;
`
const TRheadStyled = styled.tr`
    background-color: #F4ECF4;
    border-radius: 2px;
    height: 50px;
    width: 100%;
`
const THstyled = styled.th`
    border: 1px solid #F4ECF4;
    color: #788195;
    font-size: 13px;
    font-weight: bold;
    padding: 18px 30px;
`

const Pagination = styled.div`
	display: flex;
	justify-content: flex-end;
`
const PaginationItem = styled.span`
    color: black;
    padding: 4px 8px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    border: solid 1px #d9d9d9;
    font-size: 12px;
    margin: 4px;
    background-color: ${props => props.currentPage === props.page && props.page ? '#954590' : 'white'};
    color: ${props => props.currentPage === props.page && props.page ? 'white' : 'black'};
`

const Ellipsis = styled.span`
    font-size: 20px;
    font-weight: bold;
`

class Tables extends Component {
	state = {
		currentPage: 1,
		createData: {},
		currentRow: null
	}
	forward = (numOfPage) => {
		if (this.state.currentPage < numOfPage) {
			this.setState({ currentPage: this.state.currentPage + 1 })
		}
	}
	backward = (numOfPage) => {
		if (this.state.currentPage > 1) {
			this.setState({ currentPage: this.state.currentPage - 1 })
		}
	}
	onRowClick = (event) => {
		console.log(event.target)
	}
	render() {
		const { columns, dataSource, dataShow, rowPerPage, ellipsis, tableId } = this.props
		const numOfPage = Math.ceil(dataSource.length / rowPerPage)
		const pages = [...Array(numOfPage).keys()];
		const startData = (this.state.currentPage - 1) * rowPerPage
		const endData = (this.state.currentPage) * rowPerPage
		return (
			<div>
				<TableStyled
					id={tableId}
				>
					<thead>
						<TRheadStyled>{columns.map((column, index) => (
							<THstyled key={index}><span>{column.title}</span></THstyled>
						))}
						</TRheadStyled>
					</thead>
					<tbody>
						{dataSource.slice(startData, endData).map((data, index) => (
							<RowData
								// onClick={() => console.log(data)}
								// seeDetailClick={() => console.log(Object.keys(dataSource)[index])}
								seeDetailClick={() => {
									this.props.history.push({
										pathname: '/dashboard/position-detail',
										state: { positionDetail: data.positionId }
									})
								}}
								onEditPositionClick={() => {
									console.log("PositionId = ",data.positionId)
									this.props.history.push({
										pathname: '/dashboard/edit-position',
										state: { positionId: data.positionId }
									})
								}}
								onClick={() => {
									this.props.preCreatePosition(data)
									this.props.history.push('/dashboard/create-position/create-setting')
								}}
								data={data}
								columns={columns}
							/>
						))}
					</tbody>
				</TableStyled>
				<Pagination>
					<PaginationItem
						onClick={() => this.backward(numOfPage)}
					>
						&lt;
          </PaginationItem>
					{pages.length < ellipsis && pages.map(page => (
						<PaginationItem
							currentPage={this.state.currentPage}
							page={page + 1}
							onClick={() => this.setState({ currentPage: page + 1 })}
						>
							{page + 1}
						</PaginationItem>
					))}
					{this.state.currentPage < 4 && pages.length >= ellipsis && (
						<React.Fragment>
							{pages.slice(0, 4).map(page => (
								<PaginationItem
									currentPage={this.state.currentPage}
									page={page + 1}
									onClick={() => this.setState({ currentPage: page + 1 })}
								>
									{page + 1}
								</PaginationItem>
							))}
							<Ellipsis>...</Ellipsis>
							<PaginationItem
								currentPage={this.state.currentPage}
								page={numOfPage}
								onClick={() => this.setState({ currentPage: numOfPage })}
							>
								{numOfPage}
							</PaginationItem>
						</React.Fragment>
					)}

					{this.state.currentPage + 3 > numOfPage && pages.length >= ellipsis && (
						<React.Fragment>

							<PaginationItem
								currentPage={this.state.currentPage}
								page={1}
								onClick={() => this.setState({ currentPage: 1 })}
							>
								{1}
							</PaginationItem>
							<Ellipsis>...</Ellipsis>
							{pages.slice(numOfPage - 4, numOfPage).map(page => (
								<PaginationItem
									currentPage={this.state.currentPage}
									page={page + 1}
									onClick={() => this.setState({ currentPage: page + 1 })}
								>
									{page + 1}
								</PaginationItem>
							))}
						</React.Fragment>
					)}

					{this.state.currentPage + 2 < numOfPage && this.state.currentPage > 3 && pages.length >= ellipsis && (
						<React.Fragment>

							<PaginationItem
								currentPage={this.state.currentPage}
								page={1}
								onClick={() => this.setState({ currentPage: 1 })}
							>
								{1}
							</PaginationItem>
							<Ellipsis>...</Ellipsis>
							{pages.slice(this.state.currentPage - 2, this.state.currentPage + 1).map(page => (
								<PaginationItem
									currentPage={this.state.currentPage}
									page={page + 1}
									onClick={() => this.setState({ currentPage: page + 1 })}
								>
									{page + 1}
								</PaginationItem>
							))}
							<Ellipsis>...</Ellipsis>
							<PaginationItem
								currentPage={this.state.currentPage}
								page={numOfPage}
								onClick={() => this.setState({ currentPage: numOfPage })}
							>
								{numOfPage}
							</PaginationItem>
						</React.Fragment>
					)}

					<PaginationItem
						onClick={() => this.forward(numOfPage)}
					>
						&gt;
                    </PaginationItem>
				</Pagination>
			</div>
		)
	}
}

export default connect(null, { preCreatePosition, updatePreEditData })(withRouter(Tables))