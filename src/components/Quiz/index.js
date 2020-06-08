import React, { Component } from 'react';
import Message from '../Message';
import './styles.scss';
import { Redirect, Link } from 'react-router-dom';

const Question = ({
  question,
  tags,
  onAnswerSubmit,
  visibleAnswer,
  switchAnswerDisplay,
  nextQuestion }) => (
  <div className="question">
    <form className="question__form" onSubmit={onAnswerSubmit}>
      <div className="question__category">{ tags[question.category] }</div>
      <label className="question__question">{ question.question }</label>
      <textarea className="question__answer" name="answer" rows="10" cols="50" required/>
      <button type="submit" className="question__submit button">Answer!</button>
    </form>
    <button className="question__show-answer button" onClick={switchAnswerDisplay}>Show answer</button>
    <button className="question__next button" onClick={nextQuestion}>Next Question</button>
    {visibleAnswer &&
    (<Message
      message={question.answer}
      type="compact"
      onClose={switchAnswerDisplay}
    />)}
    <Link to="/home">Go back</Link>
  </div>
);

class Quiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      actual: 0,
      answered: false,
      correct: false,
      correctAnswers: 0,
      finished: false,
      redirect: false,
      visibleAnswer: false
    };

    this.checkQuestion = this.checkQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.switchAnswerDisplay = this.switchAnswerDisplay.bind(this);
  }

  checkQuestion(e) {
    e.preventDefault();
    const { answer } = e.target;
    const { actual } = this.state;
    const { questions } = this.props;
    const actualQuestion = questions[actual];
    const correctAnswer = answer.value === actualQuestion.answer;

    this.setState(prevState => (
      {
        correctAnswers: correctAnswer ? prevState.correctAnswers + 1 : prevState.correctAnswers,
        answered: true,
        correct: correctAnswer
      }
    ));
  }

  nextQuestion() {
    const { actual } = this.state;
    const { questions } = this.props;
    const finished = questions.length === actual+1;
    this.setState(prevState => ({
      answered: false,
      actual: prevState.actual+1,
      finished
    }));
  }

  setRedirect(){
    this.setState({ redirect:true });
  }

  switchAnswerDisplay() {
    this.setState(prevState => ({
      visibleAnswer: !prevState.visibleAnswer
    }));
  }

  render() {
    const {
      actual,
      answered,
      correct,
      correctAnswers,
      finished,
      redirect,
      visibleAnswer
    } = this.state;
    const { questions, tags } = this.props;
    const actualQuestion = questions[actual];

    return (
      <div className="quiz-game">
        { redirect ? <Redirect to="/home" /> : finished ?
        <Message
          type={correctAnswers < questions.length ? 'red' : 'teal'} message={`You answered OK ${correctAnswers} of ${questions.length}`}
          className="quiz-game__finished"
          onClose={this.setRedirect}
        />
         : !answered ?
          (<Question
            question={actualQuestion}
            tags={tags}
            onAnswerSubmit={this.checkQuestion}
            switchAnswerDisplay={this.switchAnswerDisplay}
            visibleAnswer={visibleAnswer}
            nextQuestion={this.nextQuestion}
          />)
        : correct ?
        (<Message className="quiz-game__result-msg" type="success" message="Correct!" onClose={this.nextQuestion} />) :
        (<Message className="quiz-game__result-msg" type="negative" message="Incorrect!" onClose={this.nextQuestion} />)}
      </div>
    );
  }
}

export default Quiz;