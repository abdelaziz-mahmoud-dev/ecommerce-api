const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true, // بنسجل السعر وقت الإضافة، عشان لو المنتج اتغير سعره بعدين، السلة تفضل زي ما هي
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // كل يوزر ليه سلة واحدة بس
    },
    items: [cartItemSchema], // مصفوفة فيها كذا منتج، كل واحد بالـ Schema اللي فوق
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);