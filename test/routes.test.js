import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import fixtures from './fixtures';
import app from '../src/main';

chai.use(chaiHttp);
const should = chai.should();

describe('Routes', () => {

  beforeEach(() => {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  afterEach(() => { nock.cleanAll(); nock.enableNetConnect(); });

  it('root serves index.html', (done) => {
    chai.request(app).get('/').end((err, res) => {
      should.equal(err, null);
      res.should.be.html;
      done();
    });
  });

  it('search returns artist search result', (done) => {
    nock('https://api.spotify.com')
      .get('/v1/search')
      .query({ q: 'someArtist', limit: 1, type: 'artist' })
      .reply(200, fixtures.artistResult);
    chai.request(app)
      .get('/search/someArtist')
      .end((err, res) => {
        should.equal(err, null);
        res.body.should.deep.equal(fixtures.searchResult);
        done();
      });
  });

});
