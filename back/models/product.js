import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cupoftea");

let productSchema = mongoose.Schema({
    name: String,
    description: String,
    images: [{
        type: String
    }],
    conditionnement: [{
        name: String,
        price: Number
    }],
    defaultCond: Number,
    categories: [{
        type: String
    }],
    isHeart: Boolean,
    stock: Number,
    dateCreated: Date,
    dateUpdated: Date
});
let Product = mongoose.model("Product", productSchema);

export default Product;