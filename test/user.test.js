import chai from 'chai';
import User from '../src/user';

chai.should();

(async () => {
  await setTimeout(() => {
    console.log('test');
  }, 0);
})();

describe('User', () => {
  it('should say hello with given name', () => {
    const user = new User('Bob');
    user.name.should.be.a('number');
    user.name.should.equal('Bob');
  });
});
