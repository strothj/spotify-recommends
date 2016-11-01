import 'chai/should';
import nock from 'nock';
import fixtures from './fixtures';
import spotify from '../src/spotify';

describe('Spotify', () => {

  describe('getFromApi', () => {

    let service;
    beforeEach(() => {
      nock.disableNetConnect();
      service = nock('https://api.spotify.com')
        .get('/v1/search')
        .query({ qs: 'slipknot' });
    });
    afterEach(() => { nock.cleanAll(); nock.enableNetConnect(); });

    it('returns code 500 on network error', (done) => {
      const responsePromise = spotify.getFromApi('search', 'slipknot');
      responsePromise.catch((response) => {
        response.should.be.a('number');
        done();
      });
    });

    it('returns response on successful request', () => {
      service = service.reply(200, fixtures.artistResult);
      return spotify.getFromApi('search', { qs: 'slipknot' }).then((response) => {
        response.should.deep.equal(fixtures.artistResult);
        service.isDone().should.equal(true);
      });
    });

    it('returns status code on failed request', (done) => {
      service = service.reply(404);
      spotify.getFromApi('search', { qs: 'slipknot' }).catch((err) => {
        err.should.equal(404);
        service.isDone().should.equal(true);
        done();
      });
    });

  });
});
