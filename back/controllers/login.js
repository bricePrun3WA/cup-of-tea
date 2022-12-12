import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// Models
import User from "./../models/user.js";

const saltRounds = 10;

function login(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    const myRet = {
        hasError: false,
        errorMsg: ""
    }
    
    if (!req.body.email || !req.body.pwd) {
        myRet.hasError = true;
        myRet.errorMsg = "Un des champs n'est pas renseigné.";

        return res.json(myRet);
    } else {
        User.findOne({email: req.body.email}, (err, user) => {
            if (user === null) {
                myRet.hasError = true;
                myRet.errorMsg = "Identifiant ou mot de passe incorrect.";
                
                return res.json(myRet);
            } else {
                bcrypt 
                    .compare(req.body.pwd, user.pwd)
                    .then(function(isMatching) {
                        if (!isMatching) {
                            myRet.hasError = true;
                            myRet.errorMsg = "Identifiant ou mot de passe incorrect.";
    
                            return res.json(myRet);
                        } else {
                            req.session.isLogged = true;
                            req.session.userId = user._id;
                            req.session.roles = user.roles;
    
                            myRet.user = user;
                            return res.json(myRet);
                        }
                });
            }
        });
    }
}

function getSession(req, res) {
    return res.json(req.session);
}

function addUser(req, res) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);

    const myRet = {
        hasError: false,
        errorMsg: ""
    }
    const actualDate = new Date().toISOString();

    if (!req.body.name
            || !req.body.surname
            || !req.body.phone
            || !req.body.birthDate
            || !req.body.email
            || !req.body.pwd) {

        myRet.hasError = true;
        myRet.errorMsg = "Un des champs n'est pas rensigné.";
        return res.json(myRet);
    } else {
        bcrypt.hash(req.body.pwd, saltRounds).then(function(myPwd) {
            const myBirthDate = new Date(req.body.birthDate).toISOString();

            const myUser = new User({
                name: req.body.name,
                surname: req.body.surname,
                birthDate: myBirthDate,
                phone: req.body.phone,
                email: req.body.email,
                pwd: myPwd,
                roles: ["user"],
                fav_products: [],
                my_orders: [],
                dateCreated: actualDate,
                dateUpdated: actualDate
            });

            myUser
                .save()
                .then(savedDoc => {
                        myRet.done="OK";
                        return res.json(myRet);
                    })
                .catch(e => {
                        myRet.hasError = true
                        myRet.errorMsg = "Erreur d'enregistrement";
                        return res.json(myRet);
                    });
        });
    }
}

function logout (req, res) {
    req.session.destroy((err) => {
        console.log('ok');
        return res.json(err ? 'nok' : 'ok');
	});
}

export {
    login,
    addUser,
    logout
}