import React, { Component } from 'react';
import './styles.scss';
import Message from '../Message';

class CreateQuestion extends Component {
  constructor(props){
    super(props);
    this.state = { success: false }

    this.addQuestion = this.addQuestion.bind(this);
    this.closeToast = this.closeToast.bind(this);
  }

  addQuestion(e){
    const { onFormSubmit } = this.props;
    onFormSubmit(e);
    this.setState({ success: true });
  }

  closeToast() {
    this.setState({ success: false });
  }

  render() {
    const { success } = this.state;
    const { tags, levels } = this.props;

    return (
      <div className="create-answer">
        <h1 className="title">Create your answers!</h1>
        { success && <Message type="positive" message="Question successfully added!" onClose={this.closeToast} /> }
        <form className="ui form create-answer__form" onSubmit={this.addQuestion}>
          <div className="create-answer__category-wrapper input-wrapper">
            <label htmlFor="category" className="create-answer__input-label">Category</label>
            <select className="create-answer__category-dropdown" name="category" required>
              {tags.map((tag, i) => (
                <option
                  key={`caetgory${i}`}
                  className="category__option"
                  value={i}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
           <div className="create-answer__lvl-wrapper input-wrapper">
              {levels.map((lvl, i) => (
                <div key={`lvl${i}`} className="create-answer__lvl-input">
                  <input
                    name="lvl"
                    id={`lvl${i}`}
                    type="radio"
                    value={lvl.value}
                    className="create-answer__lvl-radio"
                    required
                  />
                  <label
                    htmlFor={`lvl${i}`}
                    className="create-answer__input-label
                              create-answer__input-label--offset-left
                              create-answer__lvl-label">
                      {lvl.label}
                    </label>
                </div>
              ))}
           </div>
           <div className="create-answer__question-wrapper input-wrapper">
            <label htmlFor="question" className="create-answer__input-label">Question</label>
            <input type="text" name="question" required/>
           </div>
           <div className="create-answer__answer-wrapper input-wrapper">
            <label htmlFor="answer" className="create-answer__input-label">Answer</label>
            <textarea name="answer" required/>
           </div>
           <div className="create-answer__submit-wrapper input-wrapper">
            <button type="submit" className="button submit-button">Add question!</button>
           </div>
        </form>
      </div>
    );
  }
}

export default CreateQuestion;