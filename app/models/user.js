const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
  email: {
      type: DataTypes.STRING,
      unique: true
  },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  role: {
      type: DataTypes.STRING,
      default: 'guest'
  }
  // psql -> ALTER TABLE public.user ADD COLUMN "role" TEXT DEFAULT 'guest';
}, {
  sequelize,
  tableName: "user",
});

module.exports = User;