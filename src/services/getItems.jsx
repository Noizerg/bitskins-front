import sendReq from '../store/api';

export function getItemTypes() {
  return [
    'AK-47',
    'M4',
    'AWP',
    'Knife',
    'Gloves',
    'AUG',
    'USP',
    'SG 553',
    'Glock',
    'Desert Eagle',
    'All',
  ];
}

export async function getAllItems() {
  const result = await sendReq('allItems', 'GET');
  if (result.data) {
    return result.data;
  } else {
    return { errorMessage: result, errorCode: 100 };
  }
}

export async function getRawPriceData(hash_name) {
  const result = await sendReq(`getRawPriceData/${hash_name}`, 'GET');
  console.log('SteamPrices', result.data);
  return result.data;
}

export async function getAccountInventory() {
  const result = await sendReq('getAccountInventory', 'GET');
  if (result.data) {
    return result.data;
  } else {
    return { errorMessage: result, errorCode: 100 };
  }
}
