const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class CategoryService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department()
      })
    }
  }

  async find() {
    return new Promise((resolve, reject) => {
      resolve(this.categories);
    })
  }

  async findOne(id) {
    const categories = this.categories.find(categories => categories.id === id);
    if (!categories) {
      throw bomm.notFound('categories not found');
    }
    return categories;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    }
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService;