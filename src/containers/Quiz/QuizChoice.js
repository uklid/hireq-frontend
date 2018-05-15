import React from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const QuizWrapper = styled.div`
	position: relative;
	text-align: center;
	height: 75px;
	margin-top: 10px;
	width: 70%;

	@media only screen and (max-width: 767px) {
		width: 264px;
	}

	h4 {
		margin-top: 25px;
		margin-left: 15px;
		margin-bottom: 15px;
		font-size: 16px;
	}
	h4:first-child {
		margin-left: 15px;
		margin-bottom: 15px;
		font-size: 16px;
	}
	input[type="radio"] {
		display: none;
	}
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

const candidateId = '-L3y6bEU1lxPOpxeoQw-'
const apiURL = 'https://us-central1-hireq-api.cloudfunctions.net'

class QuizChoice extends React.Component {
	sendPersonalAnswer = async (event) => {
		try {
			// console.log('value Number = ', parseInt(event.target.value))
			// console.log('testNumber = ', parseInt(event.target.dataset.testnumber))
			const answer = parseInt(event.target.value)
			const testNumber = parseInt(event.target.dataset.testnumber)
			const testName = event.target.dataset.testname
			const url = `${apiURL}/candidates/${candidateId}/answer`
			const personalResult = await Axios.post(url, {
				testName: testName,
				testNumber: testNumber,
				answer: answer
			})
			console.log('personalResut = ', personalResult)
		} catch (err) {
			console.log(err)
		}
	}
	render() {
		const { radioName, quizTitle, testNumber, testName } = this.props
		return (
			<QuizWrapper >
				<h4>{quizTitle}</h4>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<h4 style={{ color: '#09b29c' }}> ตรงมาก </h4>
					<Container
						height="50px"
						width="50px"
						borderColor="#09b29c"
						activeColor="#09b29c"
					>
						<input type="radio" name={radioName} data-testname={testName} value="5" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
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
						<input type="radio" name={radioName} data-testname={testName} value="4" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						style={{
							marginLeft: 10,
							marginTop: 10
						}}
						activeColor="#eee"
					>
						<input type="radio" name={radioName} data-testname={testName} value="3" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
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
						<input type="radio" name={radioName} data-testname={testName} value="2" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						height="50px"
						width="50px"
						borderColor="#954590"
						activeColor="#954590"
						style={{
							marginLeft: 8
						}}
					>
						<input type="radio" name={radioName} data-testname={testName} value="1" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<h4 style={{ color: '#954590' }}> ไม่ตรง </h4>
				</div>
			</QuizWrapper>
		)
	}
}

export default QuizChoice