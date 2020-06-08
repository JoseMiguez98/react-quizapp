import React from 'react';

const Message = ({ type, message, onClose, className }) => (
  <div className={`ui ${type} message ${className}`}>
    <i className="close icon" onClick={onClose}/>
    <div className="header">{message}</div>
  </div>
);

export default Message;