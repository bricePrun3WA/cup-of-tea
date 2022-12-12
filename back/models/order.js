import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cupoftea");

let orderSchema = mongoose.Schema({
    user_id: String,
    products: [{
        product_id: String,
        name: String,
        description: String,
        image: String,
        quantity: Number,
        price: Number,
        conditionnement: String
    }],
    mode_livr: String,
    adresse: {
        address: String,
        suburb: String,
        cp: String, 
        city: String,
        country: String
    },
    frais_port: Number,
    remise: String,
    date: Date,
    dateCreated: Date,
    dateUpdated: Date
});
let Order = mongoose.model("Order", orderSchema);

export default Order;