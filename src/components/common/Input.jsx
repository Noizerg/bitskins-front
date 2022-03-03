import React from 'react';

const Input = ({ name: inputName, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{label}</label>
      <input
        autoFocus
        id={inputName}
        name={inputName}
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
