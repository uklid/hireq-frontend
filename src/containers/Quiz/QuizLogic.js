import React from 'react'
import styled from 'styled-components'

const QuizWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 75px;
`

const QuizChoice = styled.div`
  width: 395px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  img:hover {
    cursor: pointer;
    border: 1px solid red;
  }
`

const QuizImageControl = styled.div`
  border:1px solid #eee;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const _Mock = [
  
]

class QuizLogic extends React.Component {
  sendAnswer = (data) => {
    console.log("Key = ", data)
  }
  render() {
    const { imageData , quizImage ,onClick } = this.props
    return (
      <Wrapper>
        <img src={quizImage} />
        <QuizChoice id="logicQuizChoice">
          {
            imageData.map((data, index) => {
              return <img width="100" height="75" onClick={onClick} key={index} src={data.choiceImage} />
            })
          }
        </QuizChoice>
      </Wrapper>
    )
  }
}

export default QuizLogic
