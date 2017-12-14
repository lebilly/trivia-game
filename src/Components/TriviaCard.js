import React from "react";

export class TriviaCard extends React.Component {
  state = {
    question: "",
    correctAnswer: "",
    answers: [],
    selectedAnswer: null
  };

  componentDidMount() {
    const { trivia } = this.props;
    const answers = trivia.incorrect_answers;
    answers.push(trivia.correct_answer);

    let currentIndex = answers.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = answers[currentIndex];
      answers[currentIndex] = answers[randomIndex];
      answers[randomIndex] = temporaryValue;
    }

    this.setState({
      question: trivia.question,
      correctAnswer: trivia.correct_answer,
      answers: answers
    });
  }

  handleAnswerChange = e => {
    const { value } = e.target;
    this.setState({
      selectedAnswer: value
    });
  };

  handleAnswerSubmit = e => {
    e.preventDefault();
    if (!this.state.selectedAnswer) {
      return;
    }
    const { nextQuestion } = this.props;
    const { selectedAnswer, correctAnswer } = this.state;
    if (selectedAnswer === correctAnswer) {
      nextQuestion(true, correctAnswer);
    } else {
      nextQuestion(false, correctAnswer);
    }
  };

  createMarkup = text => {
    return {
      __html: text
    };
  };

  render() {
    const { currentQuestion } = this.props;
    const { question, answers } = this.state;
    return (
      <div>
        <h4>Question {currentQuestion}</h4>
        <form onSubmit={this.handleAnswerSubmit}>
          <fieldset>
            <legend dangerouslySetInnerHTML={this.createMarkup(question)} />
            {answers.map((answer, idx) => (
              <span key={idx}>
                <input
                  type="radio"
                  name={question}
                  id={answer}
                  value={answer}
                  onChange={this.handleAnswerChange}
                />
                <label
                  dangerouslySetInnerHTML={this.createMarkup(answer)}
                  htmlFor={answer}
                />
              </span>
            ))}
          </fieldset>
          <input type="submit" value="This is my answer!" />
        </form>
      </div>
    );
  }
}
