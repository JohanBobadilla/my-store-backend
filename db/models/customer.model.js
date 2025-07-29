const { Model, DataTypes, Sequelize } = require("sequelize");

const CUSTOMER_TABLE = "customers";
const { USER_TABLE } = require("./user.model");

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name",
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    unique: true,
  },
};

class Customer extends Model {

  static associate(model) {
    this.belongsTo(model.User, { as: "user" });
    this.hasMany(model.Order, { as: "orders", foreignKey: "customerId" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };

