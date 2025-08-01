const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class OrderService {

  constructor() {
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,
      {
        include: [
          {
            association: 'customer',
            include: ['user']
          },
          'items'
        ]
      }
    );
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('order not found');
    }
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async deleteOrder(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('order not found');
    }
    await order.destroy();
    return { id };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
