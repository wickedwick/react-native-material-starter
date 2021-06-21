import fetch from 'node-fetch';

function getData(endpoint: string, callback: Function, errorCallback: Function, loadingCallback: Function) {
  fetch(endpoint)
    .then((resp) => resp.json())
    .then((json) => {
      callback(json);
    })
    .catch((err) => errorCallback(err))
    .finally(() => loadingCallback(false));
}

export function getStarWarsData(endpoint: string, callback: Function, errorCallback: Function, loadingCallback: Function) {
  fetch(endpoint)
    .then((resp) => resp.json())
    .then((json) => {
      callback(json.results);
    })
    .catch((err) => errorCallback(err))
    .finally(() => loadingCallback(false));
}

export default getData;
