import mongoose from "mongoose";

// Models
import Product from "./../models/product.js";
import Order from "./../models/order.js";
import Category from "./../models/category.js";

function products(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    Product.find({}, (err, products) => {
        const myRet = { products: products }
        return res.json(myRet);
    });
}

function getAProduct(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    const { id } = req.params;

    Product.findOne({ '_id': mongoose.Types.ObjectId(id) }, (err, product) => {
        return res.json(product);
    });
}

// LISTE DES PRODUITS PAR CATEGORIE (un produit contient ses catégories & ses sous-catégories à qui elle appartient)
function productsFromCategory(req, res) {
    const { id } = req.params;

    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);
    Category.findOne({ '_id': mongoose.Types.ObjectId(id) }).then(myCate => {

        Product.find({ 'categories' : mongoose.Types.ObjectId(id) }, (err, products) => {
            return res.json({
                        category_name: myCate.name,
                        products: products
                    });
        });
    })

    /*
        Category.find({
            $or: [{ '_id': mongoose.Types.ObjectId(id) }, { 'parent': mongoose.Types.ObjectId(id) }]
        }).then(categories => {
            const arrayCate = [];
            categories.forEach(cat => {
                arrayCate.push(cat._id.toString());
            });
            Product
                .find({ 'categories': { $in: arrayCate} })
                .then (products => {
                    return res.json(products);
                })
                .catch (err => {
                    return res.json([]);
                });
        })
        .catch (err => {
            return res.json([]);
        });
    */
}

async function getBannerProducts(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);
    
    let newestProduct = "";
    let mostSold = "";
    let heartProduct = "";

    // Nouveau Produit
    await Product
        .find()
        .sort({ 'dateCreated' : -1 })
        .limit(1)
        .then(products => {
            newestProduct = products[0];
        }).then(() => {

            // Coup de Coeur
            Product
            .find({isHeart: true})
            .count()
            .exec((err, count) => {
                let random = Math.floor(Math.random() * count);
                
                Product
                    .findOne({isHeart: true})
                    .skip(random)
                    .exec((err2, product) => {
                        if (!err2) {
                            heartProduct = product;
                        }
                
                        // Produit phare
                        Order.aggregate([
                            {
                                "$unwind": "$products"
                            },
                            {
                                "$project": {
                                    "_id": "$products.product_id",
                                    "myQty": "$products.quantity"
                                }
                            },
                            {
                                "$group": {
                                    "_id": "$_id",
                                    "count": { $sum: "$myQty" }
                                }
                            },
                            {
                                "$sort": {
                                    "count": -1
                                }
                            }
                        ]).limit(1)
                        .then((result) => {
                            console.log(result);
                            Product.findOne({ '_id' : mongoose.Types.ObjectId(result[0]._id) }, (err, products) => {
                                mostSold = products;
                                
                                const myRet = {
                                    newProduct: newestProduct,
                                    mostSold: mostSold,
                                    heartProduct: heartProduct
                                }
                                
                                return res.json(myRet);
                            });
                        })
                    });
            });
        });
}

export {
    products,
    getAProduct,
    productsFromCategory,
    getBannerProducts
}