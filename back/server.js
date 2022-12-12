import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import router from './routes/shop.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
	isLogged: false,
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

// Lien vers les routes dans carnet.js
app.use('/', router);

// Redirection quand aucune page n'est trouvée
app.use((req, res) => {
    return res.send('');
});

// Création du serveur
app.listen(process.env.NUM_PORT, () => {
    console.log(`Serveur initialisé au port ${process.env.NUM_PORT}`);
});