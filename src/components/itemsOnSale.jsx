import React, { useEffect, useState } from 'react';
import { getAccountInventory } from '../services/getItems';
const ItemOnSale = () => {
  const [inventory, setinventory] = useState({});
  const [needUpdate, setUpdate] = useState(false);
  useEffect(() => {
    const getAccount = async (items) => {
      let x = await getAccountInventory();
      setinventory(x);
    };
    getAccount();
  }, []);

  const getLink = (link, id) => {
    let result = link.replace('%asset_id%', id);
    return result;
  };
  console.log('inventory', inventory);
  return (
    <div className="on-sale">
      <h3>Items On Sale</h3>
      {inventory.bitskins_inventory &&
        inventory.bitskins_inventory.items.map((item) => {
          return (
            <div key={item.asset_ids[0]} className="cs-items">
              <h6>{item.market_hash_name}</h6>

              <div className="item-stats">
                <div className="icon-cs">
                  <img src={item.image} alt="" />
                </div>
                <article className="float">
                  float: {item.float_values[0]}
                </article>
                <article className="Sell Price">
                  SellPrice: {item.prices[0]}
                </article>
                <article className="recent_sales_info">
                  Recent Sell Prices: {item.recent_sales_info.average_price}
                </article>

                <div className="stickers">
                  {item.stickers &&
                    item.stickers.map((sticker, index) => {
                      return (
                        <div key={index} className="sticker-cs">
                          {' '}
                          <img src={sticker.url} alt="" />{' '}
                        </div>
                      );
                    })}
                </div>
                <a href={getLink(item.inspect_link, item.asset_ids[0])}>
                  Inspect
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ItemOnSale;
