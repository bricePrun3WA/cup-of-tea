import { useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { deconnexion, getSession } from '../../actions/action-types';

const Header = () => {
    const { myReducerPanier, myReducerSession } = useSelector(state => {
        return {
            myReducerPanier : state.reducerPanier,
            myReducerSession : state.reducerSession
        }
    });

    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.user) {
            dispatch(getSession({
                isLogged: JSON.parse(sessionStorage.isLogged),
                user : JSON.parse(sessionStorage.user)
            }));
        }
        if (sessionStorage.basket) {
            /*
            dispatch(getPanier({
                products: JSON.parse(sessionStorage.basket),
            }));
            */
        }
    }, []);

    const checkIsActive = ({ isActive }) => {
        return {
            display: "block",
            margin: "1rem 0",
            padding: "1em",
            backgroundColor: isActive ? "#b09067" : "white",
            color: isActive ? "white" : "black",
            textDecoration: "none",
            borderRadius: "2em"
        };
    };

    const handleDeconnexion = (e, user) => {
        e.preventDefault();
        
        let reqLogout = new Request('/logout', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        });
        
        fetch(reqLogout)
            .then(res => res.json())
            .then(data => {
                dispatch(deconnexion({ done : data }));
            })
            .then(result => {
                navigate('/');
            })
            .catch(err => {
                return;
            });
    }

  return (
    <header className="site-header">
        <NavLink className="site-header-logo" to="/" title="Retour à l'accueil">
            <img src="/img/logo.png" alt="Logo de Cup of Tea" />
        </NavLink>
        <img className="site-header-baseline" src="/img/ribbon.svg" alt="Élu meilleur thé en 2016" width="150" />
        <nav className="site-header-nav">
            <NavLink className="site-header-nav-link" style={checkIsActive} to="/category/638f258c9661a85b8734f264">
                Thés
            </NavLink>
            <NavLink className="site-header-nav-link" style={checkIsActive} to="/category/638f26179661a85b8734f266">
                Grands crus
            </NavLink>
            <NavLink className="site-header-nav-link" style={checkIsActive} to="/category/638f25a49661a85b8734f265">
                Accessoires
            </NavLink>
            <NavLink className="site-header-nav-link" style={checkIsActive} to="/category/638f263a9661a85b8734f267">
                Epicerie
            </NavLink>
            <NavLink className="site-header-nav-link" style={checkIsActive} to="/about">
                Notre histoire
            </NavLink>
        </nav>
        <p className="site-header-promo">Livraison offerte à partir de 65€ d'achat !</p>
        
        <div className="text-end" style={{marginRight: "15%"}}>
            {
                myReducerSession && myReducerSession.isLogged ?
                        <Dropdown align="end" className='d-inline-block me-4'>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Profil
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/profil">
                                    Mon compte
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/commandes">
                                    Mes commandes
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} variant='link' onClick={handleDeconnexion}>
                                    Se déconnecter
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    :
                        <NavLink to="/connexion" className='me-4'>
                            <Button variant='primary'>
                                Se connecter
                            </Button>
                        </NavLink>
            }
            <NavLink to="/panier">
                <Button variant='light' className="site-header-cart" style={{ textAlign: "right"}} aria-label="Mon panier">
                    <span aria-hidden="true">Mon panier</span>&nbsp;
                    <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i><br/>
                    <strong>{parseFloat(myReducerPanier.totalPrice).toFixed(2)} €</strong>
                </Button>
            </NavLink>
        </div>
    </header>
  )
}

export {
    Header
}