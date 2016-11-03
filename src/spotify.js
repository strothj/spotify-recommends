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

function searchWithRelated(name) {
  const searchEmitter = search(name);
  const emitter = new EventEmitter();

  searchEmitter.on('end', (artist) => {
    getFromApi(`artists/${artist.id}/related-artists`, {})
      .then((relatedResponse) => {
        const response = Object.assign({}, artist);
        response.related = relatedResponse.artists;
        emitter.emit('end', response);
      }).catch((response) => {
        emitter.emit('error', response);
      });
  });
  searchEmitter.on('error', (response) => {
    emitter.emit('error', response);
  });

  return emitter;
}

function searchWithTopTracks(name) {
  const searchEmitter = searchWithRelated(name);
  const emitter = new EventEmitter();

  searchEmitter.on('end', (artist) => {
    const response = Object.assign({}, artist);
    const topTrackPromises = [];
    response.related.forEach((relatedArtist) => {
      const topTrackPromise = getFromApi(`artists/${relatedArtist.id}/top-tracks`, { country: 'US' });
      topTrackPromises.push(topTrackPromise);
    });
    Promise.all(topTrackPromises)
      .then((topTrackResponses) => {
        topTrackResponses.forEach((topTrackResponse, index) => {
          response.related[index].tracks = topTrackResponse.tracks;
        });
        emitter.emit('end', response);
      })
      .catch((err) => {
        emitter.emit('error', err);
      });
  });

  searchEmitter.on('error', (response) => {
    emitter.emit('error', response);
  });

  return emitter;
}

export default {
  getFromApi,
  search,
  searchWithRelated,
  searchWithTopTracks,
};
