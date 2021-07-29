/* eslint-disable @typescript-eslint/ban-types */
import fetch from 'node-fetch';

const apiKey = '5ba39e84f4034ef886bcf0404b9ffeae';
const headers = {
  'Authorization': `Key ${apiKey}`,
  'Content-Type': 'application/json'
};

export function getData(endpoint: string, callback: Function, errorCallback: Function, loadingCallback: Function): void {
  fetch(endpoint, { headers: headers })
    .then((resp) => resp.json())
    .then((json) => {
      callback(json);
    })
    .catch((err) => errorCallback(err))
    .finally(() => loadingCallback(false));
}

export function postData(endpoint: string, callback: Function, errorCallback: Function, loadingCallback: Function, data: unknown): void {
  fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((resp) => resp.json())
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      console.log('err', err);
      errorCallback(err)
    })
    .finally(() => loadingCallback(false));
}
