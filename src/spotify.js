import EventEmitter from 'events';
import unirest from 'unirest';

const apiEndpoint = 'https://api.spotify.com/v1/';

function getFromApi(endpoint, args) {
  const emitter = new EventEmitter();
  unirest.get(`${apiEndpoint}${endpoint}`)
    .qs(args)
    .end((response) => {
      if (response.ok) {
        emitter.emit('end', response.body);
      } else {
        emitter.emit('error', response.code);
      }
    });
  return emitter;
}

export function search(name) {
  return getFromApi('search', {
    q: name,
    limit: 1,
    type: 'artist',
  });
}

/* eslint-disable */
export function searchRelated(id) {
  return;
}

export function searchWithRelated(name) {
  return;
}
