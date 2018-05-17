import React, { Component } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const TRBodyStyled = styled.tr`
		height: 50px;
		cursor: pointer;
		background: ${props => props.isExpand ? '#954590' : 'white'};
		background-color: ${props => props.isActive ? '#eee' : 'white'}
		border: ${props => props.isActive ? '1px solid red' : 'none'};
`
const TRInfoStyled = styled.tr`
    height: 50px;
    background: ${props => props.isExpand ? '#954590' : 'white'};
`
const TDStyled = styled.td`
    font-size: 14px;
    padding: 18px 30px;
    color: ${props => props.isExpand ? 'white' : 'black'};
    border: ${props => props.isExpand ? '1px solid #954590' : ''};
`

const MoreInfoLink = styled.span`
		font-weight: 700;
    cursor: pointer;
`

export default class RowData extends Component {
	state = {
		isExpand: false,
		isActive: false,
	}

	componentWillReceiveProps = (props) => {
		this.setState({ isExpand: false })
	}

	// onRowClick = (event) => {
	// 	console.log(event.target)
	// }
	render() {
		const { data, columns } = this.props
		const dataWithInfo = {
			...data,
			button: <Button
				onClick={this.props.onClick}
				style={{
					color: '#fff',
					backgroundColor: '#954590',
					borderColor: '#954590',
				}}>Create position</Button>,
			buttonAction:
				<React.Fragment>
					<Button onClick={this.props.seeDetailClick}>More Detail</Button>
					<Button onClick={this.props.onEditPositionClick}>Edit</Button>
				</React.Fragment>
			,
			moreInfo: <MoreInfoLink onClick={() => this.setState({ isExpand: !this.state.isExpand })}>More Info</MoreInfoLink>
		}
		const totalCol = Object.keys(dataWithInfo)
		const MoreInfoBox = ({ className, children }) => (
			<td colSpan={totalCol.length} className={className}>
				{children}
			</td>
		)
		const MoreInfoBoxStyled = styled(MoreInfoBox) `
				box-sizing: border-box;
				border-left: 1px solid #954590;
				border-right: 1px solid #954590;
				border-bottom: 1px solid #954590;
				display: ${props => props.isExpand ? '' : 'none'};
				padding: 32px 16px;
		`
		return (
			<React.Fragment>
				<TRBodyStyled
					// onClick={this.onRowClick}
					onClick={() => this.setState({ isActive: !this.state.isActive })}
					isActive={this.state.isActive}
					isExpand={this.state.isExpand}
				>
					{columns.map((key, index) => (
						<TDStyled
							// onClick={this.props.onClick}
							isExpand={this.state.isExpand}
							key={index}
						>
							{dataWithInfo[key.key]}
						</TDStyled>
					))}
				</TRBodyStyled>
				<tr>
					<MoreInfoBoxStyled isExpand={this.state.isExpand}>
						<table style={{ width: '100%' }}>
							<tr>
								<td>
									{dataWithInfo ? dataWithInfo.descriptions : ''}
								</td>
							</tr>
							{/* <td>
									asdasdsadasdasdasdasdasdasdsadsadsadsadas
								</td>
							</tr>
							<tr>
								<td>
									asdasdsadasdasdasdasdasdasdsadsadsadsadas
								</td>
							</tr> */}
						</table>
					</MoreInfoBoxStyled>
				</tr>
			</React.Fragment>
		)
	}
}
