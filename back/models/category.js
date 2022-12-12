import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/cupoftea");

let categorySchema = mongoose.Schema({
    name: String,
    parent: String,
    dateCreated: Date,
    dateUpdated: Date
});
let Category = mongoose.model("Category", categorySchema);

export default Category;