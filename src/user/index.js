export default class User {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}
