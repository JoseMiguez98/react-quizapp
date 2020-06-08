import React from 'react';
import Quiz from '../../components/Quiz';

const Game = ({ questions, tags }) =>
  <Quiz questions={questions} tags={tags} />
;

export default Game;