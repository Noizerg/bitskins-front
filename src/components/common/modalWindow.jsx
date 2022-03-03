import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect } from 'react';
import { getRawPriceData } from '../../services/getItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApexChart from './timeChart';

const ModalWindow = (props) => {
  const { market_hash_name } = props;
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const onClick = async () => {
    let data = await getData(market_hash_name);
    setItems(data);
    return data;
  };
  useEffect(() => {
    console.log('new_items', items);
  }, [items]);

  const getData = async (market_hash_name) => {
    const result = await getRawPriceData(market_hash_name);
    let data = [];
    if (result.raw_data) {
      for (let i = 0; i < result.raw_data.length; i++) {
        data.push([
          result.raw_data[i].time * 1000,
          parseFloat(result.raw_data[i].price),
        ]);
      }
    }
    return data;
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={async () => {
          let res = await onClick();
          console.log('test', res);
          if (res.length > 0) {
            setShow(true);
          } else {
            toast('Error loading data, please try again');
          }
        }}
      >
        Get Detail
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Prices
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{market_hash_name}</p>
          <ApexChart hash_name={market_hash_name} data={items}></ApexChart>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalWindow;
