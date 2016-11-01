import { EventEmitter } from 'events';
import unirest from 'unirest';

const apiEndpoint = 'https://api.spotify.com/v1/';

function getFromApi(endpoint, args) {
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

function search(name, service) {
  const spotService = service || getFromApi;
  const emitter = new EventEmitter();

  spotService('search', {
    q: name,
    limit: 1,
    type: 'artist',
  }).then((response) => {
    emitter.emit('end', response.artists.items[0]);
  }).catch((response) => {
    emitter.emit('error', response);
  });
  return emitter;
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
