import mongoose, { mongo } from "mongoose";

//quantity detail
// const quantityDetail = new mongoose.Schema({
//   value: Number,
//   unit: String,
// });

//set schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    min: 0,
    max: 10000,
    required: true,
  },
});

//create table
const Food = mongoose.model("Food", foodSchema);

export default Food;