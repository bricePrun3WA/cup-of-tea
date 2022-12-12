import express from "express";
import parseurl from "parseurl";

import {login, addUser, logout} from "./../controllers/login.js";
import { getBannerProducts, products, productsFromCategory, getAProduct } from "../controllers/products.js";
import { addOrder, getAnOrder, getOrders } from "../controllers/orders.js";

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/user/inscription', addUser);

router.get('/products', products);
router.get('/products/category/:id', productsFromCategory);
router.get('/products/homeBanner', getBannerProducts);

router.get('/product/:id', getAProduct);

router.get('/orders/:id', getOrders);
router.get('/order/:id', getAnOrder);
router.post('/addOrder', addOrder);

/*
    router.get('/product/:id', getProduct);
*/

/*
router.get('/articles', listArticles);
router.post('/articles', listArticlesSubmit);
*/

export default router;