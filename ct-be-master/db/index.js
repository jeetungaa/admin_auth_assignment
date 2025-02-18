const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jeetungaa:vaasu7945@cluster0.sfuksba.mongodb.net/');

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  phone: Number,
  password: String,
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingAddress'
  }],
  role: {
    type: String,
    enum: ['Staff', 'Admin', 'Customer', 'Vendor'],
    default:'Customer',
    required:true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const vendorSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
  },
  business_name: String,
  business_address: String,
  business_email: String,
  business_phone: String,
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: Date
});

const productSchema = new mongoose.Schema({
  vendor_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendors'
  },
  category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
  },
  name: String,
  description: String,
  mrp:String,
  price: String,
  stock: String,
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: Date
});

const productImagesSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    image_url: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});


const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: Date
});

const subCategorySchema=new mongoose.Schema({
    name:String,
    description:String,
    parent_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: Date
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    required: true
  },
  total_amount: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const orderItemsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  quantity: Number,
  price: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  },
  amount: Number,
  payment_method: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'] // (Credit Card, PayPal, etc.)
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const reviewsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  rating: Number,
  comment: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

const shippingAddressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  },
  address_type:{
    type:String,
    enum:['Home','Work']
},
isDefault:{
    type:Boolean,
    default:false
},
  address_line1: String,
  address_line2: String,
  city: String,
  state: String,
  postal_code: String,
  country: String,
  created_at: Date,
  updated_at: Date
});

const wishListSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  product_id: 
    [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }],
})

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  product_id: 
    [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }],
})


const Users = mongoose.model('Users', userSchema);
const Vendors = mongoose.model('Vendors', vendorSchema);
const Categories = mongoose.model('Categories',categorySchema);
const SubCategories = mongoose.model('SubCategories',subCategorySchema)
const Products = mongoose.model('Products', productSchema);
const ProductImages = mongoose.model('ProductImages', productImagesSchema);
const Orders = mongoose.model('Orders', orderSchema);
const OrderItems = mongoose.model('OrderItems', orderItemsSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Review = mongoose.model('Review', reviewsSchema);
const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
const WishList = mongoose.model('WishList',wishListSchema);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
  Users,
  Vendors,
  Products,
  Categories,
  SubCategories,
  ProductImages,
  Orders,
  OrderItems,
  Payment,
  Review,
  ShippingAddress,
  WishList,
  Cart
};
