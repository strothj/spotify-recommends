// import { EventEmitter } from 'events';
import unirest from 'unirest';

const apiEndpoint = 'https://api.spotify.com/v1/';

async function getFromApi(endpoint, args) {
  return new Promise((fulfill, reject) => {
    unirest.get(`${apiEndpoint}${endpoint}`)
      .qs(args)
      .end((response) => {
        if (response.ok) {
          fulfill(response.body);
        } else {
          reject(response.code || 500);
        }
      });
  });
}

function search(name) {
  return getFromApi('search', {
    q: name,
    limit: 1,
    type: 'artist',
  });
}

/* eslint-disable */
function searchRelated(id) {
  return;
}

function searchWithRelated(name) {
  return;
}

export default {
  getFromApi: getFromApi,
  search: search,
  searchRelated: searchRelated,
  searchWithRelated: searchWithRelated
}
