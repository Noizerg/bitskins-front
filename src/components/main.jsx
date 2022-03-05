import React, { Component } from 'react';
import CS from './cs';
import ItemOnSale from './itemsOnSale';

const main = () => {
  return (
    <div className="main container">
      <div className="row">
        <div className="cs-items col-sm">
          <CS />
        </div>
        <div className="items-on-sale col-sm">
          {' '}
          <ItemOnSale />
        </div>
      </div>
    </div>
  );
};

export default main;
