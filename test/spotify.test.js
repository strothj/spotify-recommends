import 'chai/should';
import nock from 'nock';
import { EventEmitter } from 'events';
import fixtures from './fixtures';
import spotify from '../src/spotify';

class MockService {
  constructor(response) {
    this.response = response;
  }

  getFromApi(endpoint, args) {
    this.calledEndpoint = endpoint;
    this.calledArgs = args;
    return this.response;
  }
}

describe('Spotify', () => {

  describe('getFromApi', () => {

    let service;
    beforeEach(() => {
      nock.disableNetConnect();
      service = nock('https://api.spotify.com')
        .get('/v1/search')
        .query({ qs: 'some artist' });
    });
    afterEach(() => { nock.cleanAll(); nock.enableNetConnect(); });

    it('returns code 500 on network error', (done) => {
      spotify.getFromApi('search', 'some artist').catch((response) => {
        response.should.equal(500);
        done();
      });
    });

    it('returns response on successful request', () => {
      service = service.reply(200, fixtures.artistResult);
      return spotify.getFromApi('search', { qs: 'some artist' }).then((response) => {
        response.should.deep.equal(fixtures.artistResult);
        service.isDone().should.equal(true);
      });
    });

    it('returns status code on failed request', (done) => {
      service = service.reply(404);
      spotify.getFromApi('search', { qs: 'some artist' }).catch((err) => {
        err.should.equal(404);
        service.isDone().should.equal(true);
        done();
      });
    });

  });

  describe('search', () => {

    it('emits "end" event with response on success', (done) => {
      const service = new MockService(Promise.resolve(fixtures.artistResult));
      const emitter = spotify.search('some artist', service.getFromApi.bind(service));

      service.calledEndpoint.should.equal('search');
      service.calledArgs.should.deep.equal({ q: 'some artist', limit: 1, type: 'artist' });
      emitter.should.be.instanceOf(EventEmitter);
      emitter.on('end', (response) => {
        response.should.deep.equal(fixtures.searchResult);
        done();
      });
    });

    it('emits "error" event on failed request', (done) => {
      const service = new MockService(Promise.reject(404));
      const emitter = spotify.search('some artist', service.getFromApi.bind(service));

      emitter.on('error', (response) => {
        response.should.equal(404);
        done();
      });
    });

  });

});
