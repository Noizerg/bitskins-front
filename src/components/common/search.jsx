import React, { Component } from 'react';

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      value={value}
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
