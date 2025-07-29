'use strict';
const { ORDER_TABLE } = require('../models/order.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(ORDER_TABLE, 'customer_id', 'customerId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(ORDER_TABLE, 'customerId', 'customer_id');
  }
};
