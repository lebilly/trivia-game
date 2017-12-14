import React from "react";
import axios from "axios";
import { TriviaStart } from "./TriviaStart";
import { TriviaSelection } from "./TriviaSelection";
import { TriviaCard } from "./TriviaCard";
import { TriviaResult } from "./TriviaResult";
import { TriviaReport } from "./TriviaReport";

import { append, head, join, tail } from "ramda";

import "./TriviaHome.css";

export class TriviaHome extends React.Component {
  state = {
    api: `https://opentdb.com/api.php?`,
    selected: {
      amount: "10",
      category: "",
      difficulty: "",
      type: ""
    },
    score: 0,
    start: false,
    isPlaying: false,
    isCardMounted: false,
    questions: [],
    currentQuestion: 0,
    correctAnswer: "",
    isGameOver: false
  };

  onContinue = () => {
    const {
      isCardMounted,
      isGameOver,
      currentQuestion,
      questions
    } = this.state;
    this.setState({
      isCardMounted: !isCardMounted
    });
    if (currentQuestion === questions.length) {
      this.setState({
        isGameOver: !isGameOver
      });
    }
  };

  onNextQuestion = (bool, correctAnswer) => {
    const { currentQuestion, isCardMounted, score } = this.state;
    bool
      ? this.setState({
          currentQuestion: currentQuestion + 1,
          isCardMounted: !isCardMounted,
          score: score + 1,
          correctAnswer
        })
      : this.setState({
          currentQuestion: currentQuestion + 1,
          isCardMounted: !isCardMounted,
          correctAnswer
        });
  };

  onStartClick = () => {
    const { start, isCardMounted } = this.state;
    this.setState({
      start: !start,
      isCardMounted: !isCardMounted
    });
  };

  onSelectionChange = e => {
    const { value, name } = e.target;
    this.setState({
      selected: {
        ...this.state.selected,
        [name]: value
      }
    });
  };

  onSelectionSubmit = e => {
    e.preventDefault();
    function checkValue(param, value) {
      return value ? `&${param}=${value}` : "";
    }
    const {
      api,
      isPlaying,
      selected: { amount, difficulty, category, type }
    } = this.state;

    const url =
      api +
      `amount=${amount}` +
      checkValue("category", category) +
      checkValue("difficulty", difficulty) +
      checkValue("type", type);

    axios.get(url).then(
      res => {
        if (res.data.response_code !== 0) {
          return;
        }
        this.setState({
          questions: res.data.results,
          isPlaying: !isPlaying
        });
      },
      err => console.log(err)
    );
  };

  render() {
    const {
      isCardMounted,
      isPlaying,
      isGameOver,
      start,
      currentQuestion,
      correctAnswer,
      questions,
      selected,
      score
    } = this.state;

    return (
      <div className="container">
        <div className="title-container">
          <h1 className="title">Trivia</h1>
          <div
            className="title-streamer"
            ref={node => (this.titleStreamer = node)}
          />
        </div>
        <div className="main-content">
          {start && !isPlaying ? (
            <TriviaSelection
              onSelectionChange={this.onSelectionChange}
              onSelectionSubmit={this.onSelectionSubmit}
              selected={selected}
            />
          ) : !isPlaying ? (
            <TriviaStart start={this.onStartClick} />
          ) : isCardMounted && currentQuestion < questions.length ? (
            <TriviaCard
              trivia={questions[currentQuestion]}
              currentQuestion={currentQuestion + 1}
              nextQuestion={this.onNextQuestion}
              score={score}
            />
          ) : !isGameOver ? (
            <TriviaResult
              correctAnswer={correctAnswer}
              continue={this.onContinue}
            />
          ) : (
            <TriviaReport score={score} questions={questions.length} />
          )}
        </div>
      </div>
    );
  }
}
