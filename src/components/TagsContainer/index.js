import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Tag = ({ tooltip, index, onTagClick, children }) => {
  function handleClick() {
    onTagClick(index);
  }

  return (
    <div className="tag-wrapper">
      <button
        className="tag"
        title={ tooltip }
        onClick={ handleClick }>
          { children }
      </button>
    </div>
  );
};

const TagsContainer = ({ title, tags, tooltip, onTagClick }) => (
  <div className="tags-container">
    <div className="tags-container__label title">{title}</div>
    <div className="tags-container__tags">
      {tags.length ? tags.map((tag, i) => (
        <Tag
          tooltip={tooltip}
          index={i}
          key={`tag${i}`}
          onTagClick={onTagClick}>
            {tag}
        </Tag>
      )) : <div className="empty-tags">There is no available categories yet. Try adding a question!</div>}
    </div>
  </div>
);

TagsContainer.propTypes = {
  onTagClick: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  tooltip: PropTypes.string
}

Tag.propTypes = {
  tooltip: PropTypes.string,
  index: PropTypes.number.isRequired,
  onTagClick: PropTypes.func,
  children: PropTypes.node.isRequired
}
export default TagsContainer;