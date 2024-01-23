const { Schema, model } = require('mongoose')

const Product = new Schema({
  header: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  cpu: {
    type: String
  },
  graphics: {
    type: String
  },
  screen: {
    type: String
  },
  storage: {
    type: String
  },
  ram: {
    type: String
  }
})

module.exports = model('Product', Product)