import React, { Component } from 'react';

const SortIcon = (props) => {
  const { column, onSort } = props;

  const raiseSort = (props) => {
    const { column, onSort } = props;
    console.log('column_before', column);
    if (column.order == 'asc') column.order = 'desc';
    else column.order = 'asc';
    column.path = column.path; //заглушка, потом надо поменять на разные типы сортировки
    console.log('column', column);
    onSort(column);
  };

  const renderSortIcon = (column) => {
    //if (column.path !== sortColumn.path) return null;
    if (column.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <div
      className="sort-div"
      style={{ cursor: 'pointer' }}
      onClick={() => raiseSort(props)}
    >
      Order by {column.path} <span />
      {renderSortIcon(column)}
    </div>
  );
};

export default SortIcon;
