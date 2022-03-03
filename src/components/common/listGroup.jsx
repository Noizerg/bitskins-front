import React, { Component } from 'react';

class ListGroup extends Component {
  state = {};

  render() {
    const { currentType, itemTypes } = this.props;
    return (
      <ul className="list-group">
        {itemTypes.map((item) => (
          <li
            key={item}
            className={
              item === currentType
                ? 'list-group-item active'
                : 'list-group-item'
            }
            onClick={() => this.props.onType(item)}
            style={{ cursor: 'pointer' }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
