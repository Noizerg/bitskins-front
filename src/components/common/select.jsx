import React, { Component } from 'react';

const Select = ({ name: inputName, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{label}</label>
      <select
        id={inputName}
        name={inputName}
        {...rest}
        className="form-control"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
