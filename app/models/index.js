const Surfer = require('./surfer');
const Brand = require('./brand');
const Category = require('./category');

Surfer.belongsTo(Brand, {
  as: 'brand',
  foreignKey: 'brand_id',
});
Brand.hasMany(Surfer, {
  as: 'Surfers',
  foreignKey: 'brand_id',
});

Category.belongsToMany(Surfer, {
  as: 'Surfers',
  through: 'category_has_Surfers',
  foreignKey: 'category_id',
  otherKey: 'Surfer_id'
})
Surfer.belongsToMany(Category, {
  as: 'categories',
  through: 'category_has_Surfers',
  otherKey: 'category_id',
  foreignKey: 'Surfer_id'
})

module.exports = {
  Surfer,
  Brand,
  Category
}