import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from '../../routes/Home';
import Add from '../../routes/Add';
import Game from '../../routes/Game';

const tags = [
  "Peliculas",
  "Videojuegos",
  "Cultura general",
  "Geografia",
  "Historia",
  "Música",
  "Deportes",
];

const levels = [
  {
    label: '1 - Easy',
    value: 0
  },
  {
    label: '2 - Medium',
    value: 1
  },
  {
    label:'3 - Hard',
    value: 2
  }
];

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tags,
      selectedTags: [],
      availableTags: [],
      questions: [],
      normalizedQuestions: {},
      //In a real case categories should be obtained from an API and when i got the response i update this map
      //with an array of false that is the same length that the categories array obtained from fetch
      tagsMap: new Array(tags.length).fill(false)
    };

    this.addQuizTag = this.addQuizTag.bind(this);
    this.removeQuizTag = this.removeQuizTag.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuizTag(i) {
    const { selectedTags, availableTags } = this.state;
    const [newSelected, newAvailable] = [[...selectedTags], [...availableTags]];
    newSelected.push(availableTags[i]);
    newAvailable.splice(i,1);
    this.setState(prevState => (
      {
        ...prevState,
        selectedTags: newSelected,
        availableTags: newAvailable
      }
    ));
  }

  removeQuizTag(i) {
    const { selectedTags, availableTags } = this.state;
    const [newSelected, newAvailable] = [[...selectedTags], [...availableTags]];
    newAvailable.push(selectedTags[i]);
    newSelected.splice(i,1);

    this.setState(prevState => (
      {
        ...prevState,
        selectedTags: newSelected,
        availableTags: newAvailable
      }
    ));
  }

  addQuestion(e) {
    e.preventDefault();
    const { tagsMap, availableTags, normalizedQuestions, questions } = this.state;
    const { target: { category, lvl, question, answer } } = e;
    const newTagsMap = [...tagsMap];
    const newAvailableTags = [...availableTags];
    const newNormailized = {...normalizedQuestions};

    if(!(category.value in newNormailized)) {
      newNormailized[category.value] = [];
    }

    newNormailized[category.value].push(questions.length);

    const newQuestion = {
      category: category.value,
      lvl: lvl.value,
      question: question.value,
      answer: answer.value
    };

    if (!tagsMap[category.value]) {
      newAvailableTags.push(category.value);
      newTagsMap[category.value] = true;
    };

    [category.value, lvl.value, question.value, answer.value] = ['', '', '', ''];

    this.setState(prevState => (
      {
        questions: [...prevState.questions, newQuestion],
        tagsMap: newTagsMap,
        availableTags: newAvailableTags,
        normalizedQuestions: newNormailized
      }
    ));
  }

  render() {
    const {
      availableTags,
      selectedTags,
      tags,
      questions,
      normalizedQuestions
    } = this.state;

    let filteredQuestions = selectedTags.length ? selectedTags.map((tag) => (
      [...normalizedQuestions[tag]]
    )) : [];

    filteredQuestions = [].concat.apply([], filteredQuestions);

    const sortedQuestions = filteredQuestions.map(index => (
      questions[index]
    )).sort((a, b) => a.lvl - b.lvl);

    return (
      <Router>
        <div className="ui container game-container">
          <h1 className="game-container__title">Quiz Game!</h1>
          <Switch>
            <Route path="/home">
              <Home
                addQuizTag={this.addQuizTag}
                removeQuizTag={this.removeQuizTag}
                availableTags={availableTags.map(tag => tags[tag])}
                selectedTags={selectedTags.map(tag => tags[tag])}
              />
            </Route>
            <Route path="/add">
              <Add tags={tags} levels={levels} onFormSubmit={this.addQuestion} />
            </Route>
            <Route path="/quiz">
              <Game questions={sortedQuestions} tags={tags} />
            </Route>
          </Switch>
          <Redirect from="/" to="/home" />
        </div>
      </Router>
    );
  }
}

export default App;