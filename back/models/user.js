import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cupoftea");

let userSchema = mongoose.Schema({
    name: String,
    surname: String,
    birthDate: Date,
    phone: String,
    email: String,
    pwd: String,
    roles: [{
        type: String
    }],
    fav_products: [{
        product_id: String
    }],
    my_orders: [{
        order_id: String
    }],
    dateCreated: Date,
    dateUpdated: Date
});
let User = mongoose.model("User", userSchema);

export default User;