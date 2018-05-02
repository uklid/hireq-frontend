import React from 'react'
import styled from 'styled-components'

const QuizWrapper = styled.div`
	position: relative;
	text-align: center;
	width: 400px;
	height: 75px;
`
const Container = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
}
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: ${({ height }) => height ? height : '25px'};
	width: ${({ width }) => width ? width : '25px'};
	background-color: #fff;
	border-radius: 50%;
	border: 4px solid ${({ borderColor }) => borderColor || '#eee'};
}
input:checked ~ .checkmark {
	background-color: ${({ activeColor }) => activeColor || '#fff'};
}
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}
input:checked ~ .checkmark:after {
	display: block;
}
`

class QuizChoice extends React.Component {
	onClick = (event) => {
		console.log(event.target.value)
	}
	render() {
		const { radioName, choiceSelect, quizTitle } = this.props
		return (
			<QuizWrapper>
				<h4>{quizTitle}</h4>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Container
						height="50px"
						width="50px"
						borderColor="#09b29c"
						activeColor="#09b29c"
					>
						<input type="radio" name={radioName} value="5" onClick={this.onClick} />
						<span class="checkmark"></span>
					</Container>
					<Container
						style={{
							marginLeft: 20,
							marginTop: 5
						}}
						height="37px"
						width="37px"
						borderColor="#09b29c"
						activeColor="#09b29c"
					>
						<input type="radio" name={radioName} value="4" onClick={this.onClick} />
						<span class="checkmark"></span>
					</Container>
					<Container
						style={{
							marginLeft: 10,
							marginTop: 10
						}}
						activeColor="#eee"
					>
						<input type="radio" name={radioName} value="3" onClick={this.onClick} />
						<span class="checkmark"></span>
					</Container>
					<Container
						style={{
							marginTop: 5
						}}
						height="37px"
						width="37px"
						borderColor="#954590"
						activeColor="#954590"
					>
						<input type="radio" name={radioName} value="2" onClick={this.onClick} />
						<span class="checkmark"></span>
					</Container>
					<Container
						height="50px"
						width="50px"
						borderColor="#954590"
						activeColor="#954590"
					>
						<input type="radio" name={radioName} value="1" onClick={this.onClick} />
						<span class="checkmark"></span>
					</Container>
				</div>
			</QuizWrapper>
		)
	}
}

export default QuizChoice