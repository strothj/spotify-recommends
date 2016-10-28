import chai from 'chai';
import nock from 'nock';
import EventEmitter from 'events';
import fixtures from './fixtures';
import * as spotify from '../src/spotify';

chai.should();

describe('Spotify', () => {
  before(() => {
    nock.disableNetConnect();
  });

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('search', () => {
    it('emits "end" event with result object on success', (done) => {
      const service = nock('https://api.spotify.com')
        .get('/v1/search')
        .query({
          q: 'some artist',
          limit: 1,
          type: 'artist',
        })
        .reply(200, fixtures.artistResult);

      const emitter = spotify.search('some artist');
      emitter.should.be.an.instanceOf(EventEmitter);
      emitter.on('end', (response) => {
        response.should.deep.equal(fixtures.artistResult);
        service.isDone().should.equal(true);
        done();
      });
    });
  });
});
