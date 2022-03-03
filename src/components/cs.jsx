import React, { Component } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { getAllItems, getItemTypes } from '../services/getItems';
import ListGroup from './common/listGroup';
import Paginate from './common/pagination';
import pagination from '../services/utils/paginate';
import SortIcon from './common/sortIcon';
import _ from 'lodash';
import Search from './common/search';
import LineChart from './common/lineChart';
import ModalWindow from './common/modalWindow';
import Modal from 'react-bootstrap/Modal';
import ShowImgOnly from './common/checkImg';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

class CS extends Component {
  state = {
    loading: true,
    error: false,
    list: [],
    pageSize: 50,
    currentPage: 1,
    currentType: 'All',
    sortColumn: { path: 'price', order: 'asc' },
    searchQuery: '',
    imgRequired: true,
  };
  async componentDidMount() {
    const allItems = await getAllItems();
    if (allItems.errorCode === 100) {
      this.setState({ error: true });
    }
    this.setState({ loading: false });
    console.log('state', this.state);
    const list = allItems; //.slice(0, 200);

    console.log('list', list);
    this.setState({ list });
  }

  handleType = (type) => {
    this.setState({ currentType: type, currentPage: 1, searchQuery: '' });
  };

  handlePageChange = (value) => {
    this.setState({ currentPage: value });
  };

  handleSort = (sortColumn) => {
    console.log('change_state', sortColumn);
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentType: 'All', currentPage: 1 });
  };

  handleImage = (imgFlg) => {
    this.setState({ imgRequired: imgFlg });
  };

  getPagedData = () => {
    const {
      list,
      currentPage,
      pageSize,
      currentType,
      sortColumn,
      searchQuery,
      imgRequired,
    } = this.state;
    let filteredList = [];
    if (searchQuery) {
      filteredList = list.filter((m) =>
        m.market_hash_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (this.state.currentType && this.state.currentType == 'All') {
      filteredList = list;
    } else if (currentType) {
      filteredList = list.filter(
        (item) => item.market_hash_name.indexOf(currentType) > -1
      );
    }

    if (filteredList.filter && imgRequired) {
      filteredList = filteredList.filter((item) => item.icon_url);
    }

    let totalCount = filteredList.length;
    for (let i = 0; i < filteredList.length; i++) {
      filteredList[i]['price'] = +filteredList[i]['price'];
    }
    const sorted = _.orderBy(
      filteredList,
      [sortColumn.path],
      [sortColumn.order]
    );
    const data = pagination(sorted, currentPage, pageSize);

    return [data, totalCount];
  };

  render() {
    const { list, sortColumn, loading, error } = this.state;
    const itemTypes = getItemTypes();
    let filteredList = list;
    //const totalCount = list.length;
    filteredList = this.getPagedData()[0];
    const totalCount = this.getPagedData()[1];
    if (loading === true) {
      return <Loader type="Hearts" color="#00BFFF" height={500} width={500} />;
    } else if (error === true) {
      return (
        <h1 className="errorLoad">
          There is an Error Loading CS:GO Items, please refresh page and try
          again
        </h1>
      );
    } else {
      return (
        <React.Fragment>
          <div className="tab-list">
            <ListGroup
              itemTypes={itemTypes}
              currentType={this.state.currentType}
              onType={this.handleType}
            ></ListGroup>
          </div>
          <div className="wrapper">
            <div className="stuff">
              {' '}
              <Search
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
              <div className="commonButton">
                <SortIcon column={sortColumn} onSort={this.handleSort} />
                <ShowImgOnly
                  onImageRequired={this.handleImage}
                  checked={this.state.imgRequired}
                />
              </div>
            </div>

            {filteredList.map((item) => (
              <div key={item.market_hash_name} className="cs-items">
                <div className="icon-cs">
                  {' '}
                  <img src={item.icon_url} alt="" />
                </div>
                <div className="item-info">
                  <ul>
                    <li key={item.created_at}>Name: {item.market_hash_name}</li>
                    <li key={+item.created_at + 1}>Price: {item.price} $</li>
                  </ul>
                </div>
                <div className="form-group">
                  <form name="setBo" method="post" action="setBo">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="BO Price"
                      aria-label="BO Price"
                    />
                  </form>
                </div>
                <div className="buttons">
                  <div className="dropdown">
                    <button className="btn btn-secondary">Add To BO</button>
                    <ModalWindow market_hash_name={item.market_hash_name} />
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="/">
                        GetAppId
                      </a>
                      <a className="dropdown-item" href="/">
                        GetMinBO
                      </a>
                      <a className="dropdown-item" href="/">
                        Else
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ToastContainer />
          <Paginate
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    }
  }
}

export default CS;
