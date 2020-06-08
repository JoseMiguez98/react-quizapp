import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateQuestion from '../../components/CreateQuestion';

const Add = ({ tags, levels, onFormSubmit }) => (
  <Fragment>
    <CreateQuestion tags={tags} levels={levels} onFormSubmit={onFormSubmit} />
    <div className="game-container__link-wrapper">
      <Link to="/home">Go back</Link>
    </div>
  </Fragment>
);

Add.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFormSubmit: PropTypes.func
};

export default Add;