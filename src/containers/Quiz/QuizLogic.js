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

  img {
    border: 1px solid #eee;
    margin-top: 10px;
  }
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

  .quiz-image {
    width: 400px;
    height: 400px;
  }
  .quiz-answer-image {
    width: 120px;
    height: 120px;
  }
  @media only screen and (max-width: 767px) {
		.quiz-image {
      width: 100%;
      height: 100%;
    }
    .quiz-answer-image {
      width: 50%;
      height: 100px;
    }
	}
`

class QuizLogic extends React.Component {
  // sendAnswer = (data) => {
  //   console.log("Key = ", data)
  // }
  render() {
    const { imageData, quizImage, onClick } = this.props
    return (
      <Wrapper>
        <img className="quiz-image" src={quizImage} />
        <h3>เลือกรูปภาพที่คิดว่าถูกต้องที่สุด</h3>
        <QuizChoice id="logicQuizChoice">
          {
            imageData.map((data, index) => {
              return <img
                className="quiz-answer-image"
                onClick={onClick}
                key={index}
                data-answer={data.c}
                src={require(`../../image/QuizImage/Answer/${data.img}`)}
              />
            })
          }
        </QuizChoice>
      </Wrapper>
    )
  }
}

export default QuizLogic