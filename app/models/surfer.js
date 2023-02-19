const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Brand = require('./brand');

class Surfer extends Model {}

Surfer.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  brand_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id',
    }
  },
}, {
  sequelize,
  tableName: 'Surfer',
});

module.exports = Surfer;