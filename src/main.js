import User from './user';

const user = new User('bob');

(async () => {
  await setTimeout(() => {
    user.hello();
  }, 1000 * 1);
})();
