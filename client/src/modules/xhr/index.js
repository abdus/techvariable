class XHR {
  static base(path) {
    return `http://localhost:3456${path}`;
  }

  constructor(opts = {}) {
    this.commonOpts = opts;
  }

  async getAllDishes(opts = {}) {
    try {
      return await makeRequest("/api/v1/dish/all", {
        ...this.commonOpts,
        ...opts,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async getDish(id, opts = {}) {
    try {
      return await makeRequest("/api/v1/dish/" + id, {
        ...this.commonOpts,
        ...opts,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async createDish(dish, opts = {}) {
    try {
      return await makeRequest("/api/v1/dish/", {
        ...this.commonOpts,
        ...opts,
        ...{
          method: "POST",
          body: JSON.stringify(dish),
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

const makeRequest = async (path, opts = {}) => {
  const raw = await fetch(`${XHR.base(path)}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...opts,
  });
  if (raw.ok) {
    return await raw.json();
  }
};

export default XHR;
