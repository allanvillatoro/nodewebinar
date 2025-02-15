# Unit Testing using Jest

Jest is a delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

[Official Jest documentation](https://jestjs.io/docs/getting-started)

## Basics

### Basic example

```js
//sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

//sum.test.js
test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});
```

### Assertions

#### Equal Value

```js
expect(2 + 2).toBe(4);
```

#### Equal Object

```js
expect(data).toEqual({ one: 1, two: 2 });
```

#### Double Numbers

```js
expect(value).toBeCloseTo(0.3);
```

#### Strings

```js
expect('Christoph').toMatch(/stop/);
```

#### Truthiness

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as `true`
- `toBeFalsy` matches anything that an `if` statement treats as `false`

#### Arrays

```js
expect(shoppingList).toContain('milk');
```

#### Other assertions

[Check documentation](https://jestjs.io/docs/expect)

## Globals

In order to avoid repetitive instructions, Jest provides `beforeAll`, `beforeEach`, `afterEach`, `afterAll` methods and many others. [Check documentation...](https://jestjs.io/docs/api)

## Exceptions

```js
expect(() => compileAndroidCode()).toThrow();
expect(() => compileAndroidCode()).toThrow(Error);
expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
```

## Promises

### Returning a Promise

```js
return fetchData().then((data) => {
  expect(data).toBe('peanut butter');
});
```

### Async / Await

```js
const data = await fetchData();
expect(data).toBe('peanut butter');
```

### Resolves and Rejects

```js
await expect(fetchData()).resolves.toBe('peanut butter');
await expect(fetchData()).rejects.toMatch('error');
```

### Ensuring Return or Await for Promises

```js
return expect(fetchData()).resolves.toBe('peanut butter');
return expect(fetchData()).rejects.toMatch('error');
return expect(fetchData()).rejects.toThrow(Error);
```

## Mocks

Mocking is a process used in unit testing when the unit being tested has external dependencies. The purpose of mocking is to isolate and focus on the code being tested and not on the behavior or state of external dependencies.

### Mocking Functions

#### Creating a Mock Function

```js
const filterTestFn = jest.fn();
```

#### Returning Different Values on Consecutive Calls

```js
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
```

#### Example with `jest.fn`

```js
const mockCallback = jest.fn((x) => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);
```

### Class Mocks

There are different ways to mock class methods. [Check documentation...](https://jestjs.io/docs/es6-class-mocks)

### Mocking Implementations

#### Using `mockImplementationOnce` for Different Behavior on Each Call

```js
const myMockFn = jest
  .fn(() => 'default') // Called only if there are no more implementations to call
  .mockImplementationOnce((cb) => cb(null, true)) // First call
  .mockImplementationOnce((cb) => cb(null, false)); // Second call
```

### Mocking an Entire Module

```js
jest.mock('axios');

const users = [{ name: 'Bob' }];
const resp = { data: users };

axios.get.mockResolvedValue(resp);
// or
axios.get.mockImplementation(() => Promise.resolve(resp));

return Users.all().then((data) => expect(data).toEqual(users));
```

### Assertions using Mocks

#### Ensuring a Mock Function was Called

```js
const drink = jest.fn();
drinkAll(drink, 'lemon');
expect(drink).toHaveBeenCalled();
```

#### Ensuring a Mock Function was Called with Specific Arguments

```js
const f = jest.fn();
applyToAll(f);
expect(f).toHaveBeenCalledWith(beverage);
```

### Spying on Methods

This is used when only a few class methods need to be mocked, instead of the entire module.

#### Overwriting an Original Method

```js
jest
  .spyOn(SoundPlayer.prototype, 'playSoundFile')
  .mockImplementation(() => customImplementation);
// or
jest.spyOn(SoundPlayer.prototype, 'playSoundFile').mockResolvedValue(theValue);
```

### Restoring Mocks

These instructions are often used in the globals, such as `beforeEach`, `afterEach`, etc.

```js
jest.restoreAllMocks(); // Restores spies to their original value
jest.resetAllMocks(); // Resets all mocks and their implementations
jest.clearAllMocks(); // Clears all mock calls and instances
```
