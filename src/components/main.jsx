import React, { Component } from 'react';
import CS from './cs';
import ItemOnSale from './itemsOnSale';

const main = () => {
  return (
    <div className="main">
      <div className="cs-items">
        <CS />
      </div>
      <div className="items-on-sale">
        {' '}
        <ItemOnSale />
      </div>
    </div>
  );
};

export default main;
