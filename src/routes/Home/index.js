import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import TagsContainer from '../../components/TagsContainer';
import './styles.scss';

const Home = ({ addQuizTag, removeQuizTag, availableTags, selectedTags }) => (
  <Fragment>
    <TagsContainer
      onTagClick={addQuizTag}
      title="Select the categories you want to play with"
      tooltip="Add"
      tags={availableTags}
    />
    <TagsContainer
      onTagClick={removeQuizTag}
      title="Selected categories"
      tooltip="Remove"
      tags={selectedTags}
    />
    <div className="game-container__link-wrapper">
      <Link to="/add">Create your question</Link>
      { selectedTags.length && <Link to="/quiz">Play game!</Link> }
    </div>
  </Fragment>
);

Home.propTypes = {
  addQuizTag: PropTypes.func,
  removeQuizTag: PropTypes.func,
  availableTags: PropTypes.array,
  selectedTags: PropTypes.array
};

export default Home;