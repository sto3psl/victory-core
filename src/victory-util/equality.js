export default {
  equals(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a && b || a && !b) {
      return false;
    }
    return a instanceof Date && b instanceof Date ?
      a.getTime() === b.getTime() :
      a === b;
  },

  isShallowEqual(a, b, keys) {
    if (!a && !b) {
      return true;
    } else if (!a || !b) {
      return false;
    }
    const getKeys = () => {
      aKeys = Object.keys(a);
      bKeys = Object.keys(b);
      return aKeys.length === bKeys.length ? bKeys : false;
    };

    keys = keys || getKeys();
    if (!keys) {
      return false;
    }

    const matches = keys.filter((key) => this.equals(a[key], b[key]));
    return matches.length === keys.length;
  },

  isArrayEquality(a, b) {
    if (!a && !b) {
      return true;
    } else if (!a || !b) {
      return false;
    } else if (a.length !== b.length) {
      return false;
    }
    for (let i = 0, len = a.length; i < len; i++) {
      if (!this.isShallowEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
};
