import React from 'react';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import _ from 'lodash';

const Paginate = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  console.log('pages', pages);
  console.log('currentPage', currentPage);

  return (
    <div>
      <Typography>Page: {currentPage}</Typography>
      <Pagination
        count={pages.length}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
      />
    </div>
  );
};

export default Paginate;
