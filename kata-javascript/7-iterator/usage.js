// iterator - one example usage.
// Build an iterable and use it with some built-in ES6 constructs.
// To do: make all tests pass, leave the assert lines unchanged!
const assert = require("assert");

// Consumable users:
// - `consumableUser` contains a consumable user,
// - `anyLeft` tells if there is any user left that can be consumed.
class ConsumableUsers {
  constructor() {
    this.users = ["Alice", "Bob"];
  }
  get nextUser() {
    if (this.users.length > 0) return `user: ${this.users.shift()}`;
    return void 0;
  }
  get anyLeft() {
    return this.users.length > 0;
  }
}

describe("Iterator usages", () => {

  let usersIterable;

  beforeEach(() => {
    const consumableUsers = new ConsumableUsers();
    const iteratorFunction = () => ({
      next: () => ({
        done: !consumableUsers.anyLeft,
        value: consumableUsers.nextUser
      })
    });

    usersIterable = {
      [Symbol.iterator]: iteratorFunction,
    };
  });

  describe("create an iterator/iterable", () => {
    it("the `usersIterable` should be iterable", () => {
      const isIterable = Symbol.iterator in usersIterable;
      assert.equal(isIterable, true);
    });

    it("the iterator of `usersIterable` should return an object", () => {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator, "object");
    });

    it("the iterator of `usersIterable` should have a next function", () => {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator.next, "function");
    });
  });

  describe("fill the iterable with content using `ConsumableUsers`", () => {
    describe("using the iterator", () => {
      let iterator;
      beforeEach(() => {
        iterator = usersIterable[Symbol.iterator]();
      });
      it("should return `Alice` as first user", () => {
        const firstItem = iterator.next();
        assert.deepEqual(firstItem, { value: "user: Alice", done: false });
      });
      it("should return `Bob` as second user", () => {
        iterator.next(); // drop the first item
        const secondItem = iterator.next();
        assert.deepEqual(secondItem, { value: "user: Bob", done: false });
      });
      it("should return `done:true`, which means there are no more items", () => {
        iterator.next();
        iterator.next();
        const beyondLast = iterator.next();
        assert.deepEqual(beyondLast, { value: void 0, done: true });
      });
    });

    describe("using built-in constructs", () => {
      it("use `Array.from()` to convert an iterable to an array", () => {
        const users = Array.from(usersIterable);
        assert.deepEqual(users, ["user: Alice", "user: Bob"]);
      });
      it("use for-of to loop over an iterable", () => {
        const users = [];
        for (let user of usersIterable) users.push(user);
        assert.deepEqual(users, ["user: Alice", "user: Bob"]);
      });
      it("use the spread-operator to convert/add iterable to an array", () => {
        const users = ["noname", ...usersIterable];
        assert.deepEqual(users, ["noname", "user: Alice", "user: Bob"]);
      });
      it("destructure an iterable like an array", () => {
        const [firstUser, secondUser] = usersIterable;
        assert.equal(firstUser, "user: Alice");
        assert.equal(secondUser, "user: Bob");
      });
    });
  });
});