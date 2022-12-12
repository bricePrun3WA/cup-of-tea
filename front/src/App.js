import {Routes, Route } from 'react-router-dom';

import { Footer } from './components/structure/Footer';
import { Header } from './components/structure/Header';

import { Login } from './components/routes/user/Login';
import { Inscription } from './components/routes/user/Inscription';

import { Home } from './components/routes/Home';
import { About } from './components/routes/About';

import { CategoryProducts } from './components/routes/CategoryProducts';
import { Product } from './components/routes/Product';

import { Panier } from './components/routes/user/Panier';
import { Confirmation } from './components/routes/user/Confirmation';
import { Profil } from './components/routes/user/Profil';
import { Commandes } from './components/routes/user/Commandes';
import { Commande } from './components/routes/user/Commande';

import { useSelector } from 'react-redux';

import logo from './logo.svg';
import './css/all.min.css';
import './css/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { myReducerSession } = useSelector(state => {
  return {
      myReducerSession : state.reducerSession
  }
});
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Home />} />

          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/about" element={<About />} />

          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
          
          {
            myReducerSession.isLogged && (
              <>
                <Route path="/profil" element={<Profil />} />
                <Route path="/commandes" element={<Commandes />} />
                <Route path="/commande/:id" element={<Commande />} />
                <Route path="/confirmation/:id" element={<Confirmation />} />
              </>
            )
          }

          <Route path="/panier" element={<Panier />} />
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
