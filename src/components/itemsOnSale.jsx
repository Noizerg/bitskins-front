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

  return (
    <React.Fragment>
      {inventory.bitskins_inventory &&
        inventory.bitskins_inventory.items.map((item) => (
          <div key={item.asset_ids[0]} className="cs-items">
            {item.market_hash_name}
          </div>
        ))}
    </React.Fragment>
  );
};
export default ItemOnSale;
