import mongoose from "mongoose";

// Models
import Order from "./../models/order.js";

function getOrders(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    const { id } = req.params;

    Order
        .find({ 'user_id': id })
        .sort({ 'dateCreated': -1 })
        .then(orders => {
            return (
                !orders ?
                    res.json('')
                :
                    res.json(orders)
            );
        });
}

function getAnOrder(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    const { id } = req.params;

    Order.findOne({ '_id': mongoose.Types.ObjectId(id) }, (err, order) => {
        return (
            err ?
                res.json('')
            :
                res.json(order)
        );
    });
}

function addOrder(req, res) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9,0,0,0);
    const cmdDate = tomorrow.toISOString();
    //const cmdDate = new Date().toISOString();
    const actualDate = new Date().toISOString();

    const adresseDrive = {
        address: "4 avenue des lilas",
        suburb: "Appartement 23",
        cp: "31000", 
        city: "TOULOUSE",
        country: "France"
    };
    const modeLivr = "livr";
    const fraisLivr = modeLivr !== "retrait" ? 5 : 0;

    const myOrder = new Order({
        user_id: req.body.user._id,
        products: req.body.products,
        mode_livr: modeLivr,
        adresse: adresseDrive,
        frais_port: fraisLivr,
        remise: "",
        date: cmdDate,
        dateCreated: actualDate,
        dateUpdated: actualDate
    });

    myOrder.save()
        .then(savedDoc => {
                return res.json(savedDoc);
            })
        .catch(e => {
                return res.json({});
            });
}

export {
    getOrders,
    getAnOrder,
    addOrder,
}