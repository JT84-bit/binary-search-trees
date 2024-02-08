module.exports = class Node {
  constructor(val) {
    this._left = null;
    this._right = null;
    this._val = val;
  }

  get val() {
    return this._val;
  }

  get right() {
    return this._right;
  }

  get left() {
    return this._left;
  }

  set right(newValue) {
    this._right = newValue;
  }

  set left(newValue) {
    this._left = newValue;
  }
};
