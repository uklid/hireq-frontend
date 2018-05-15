import React, { Component } from 'react'
import styled from 'styled-components'

const TRBodyStyled = styled.tr`
    height: 50px;
    background: ${props => props.isExpand ? '#954590' : 'white'};
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
    cursor: pointer;
`

export default class RowData extends Component {
	state = {
		isExpand: false
	}

	componentWillReceiveProps = (props) => {
		this.setState({ isExpand: false })
	}
	render() {
		const { data, columns } = this.props
		const dataWithInfo = {
			...data,
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
				<TRBodyStyled isExpand={this.state.isExpand}>{columns.map((key, index) => (
					<TDStyled isExpand={this.state.isExpand} key={index}><span>{dataWithInfo[key.key]}</span></TDStyled>
				))}
				</TRBodyStyled>
				<tr>
					<MoreInfoBoxStyled isExpand={this.state.isExpand}>
						<table style={{ width: '100%' }}>
							<tr>
								<td>
									{data.expandData}
								</td>
								<td>
									asdasdsadasdasdasdasdasdasdsadsadsadsadas
								</td>
							</tr>
							<tr>
								<td>
									asdasdsadasdasdasdasdasdasdsadsadsadsadas
								</td>
							</tr>
						</table>
					</MoreInfoBoxStyled>
				</tr>
			</React.Fragment>
		)
	}
}
