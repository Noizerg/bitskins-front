import sendReq from '../store/api';

export default async function getAccountBalance() {
  const result = await sendReq('balance', 'GET');
  if (result.data) {
    console.log('debug', result.data);
    return result.data;
  } else {
    return { errorMessage: result, errorCode: 100 };
  }
}
