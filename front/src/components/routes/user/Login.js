import { Form , Button, Alert } from 'react-bootstrap';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { connexion } from '../../../actions/action-types';

function Login(props) {
    const { reducerPanier, reducerSession } = useSelector(state => {
        return {
            reducerPanier : state.reducerPanier,
            reducerSession : state.reducerSession
        }
    });
    
    let dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        pwd: ''
    });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e, user) => {
        e.preventDefault();
        
        setErrorMessage("");
        if (!user.email || !user.pwd) {
            setErrorMessage("Un des champs est vide.");
            return;
        }
        
        let reqLogin = new Request('/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        });
        
        fetch(reqLogin)
            .then(res => res.json())
            .then(data => {
                if (data.hasError) {
                    setErrorMessage(data.errorMsg);
                    return;
                } else if (data.user) {
                    dispatch(connexion({user: data.user}));
                }
            })
            .then(result => {
                if (reducerSession.isLogged) {
                    sessionStorage.setItem("isLogged", reducerSession.isLogged);
                    sessionStorage.setItem("user", JSON.stringify(reducerSession.user));

                    navigate('/');
                }
            })
            .catch(err => {
                setErrorMessage("Une erreur est survenur, veuillez réessayer ultérieurement.");
                return;
            });
    }

    return (
        <Form method="post" onSubmit={(e) => { handleSubmit(e, user) }}>
            <h1>Connexion</h1>

            <Form.Group className="mb-3" controlId="basicsInfos">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" className="inputUser" value={user.email} onChange={handleChange} />
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control name="pwd" type="password" className="inputUser" value={user.pwd} onChange={handleChange} />
            </Form.Group>
            
            <div className="text-center">
                {errorMessage !== '' && (
                    <Alert key="danger" variant="danger">
                    {errorMessage}
                    </Alert>
                )}
                <p>Aucun compte sur notre site ? <NavLink className="btn-link" to="/inscription">Créer un compte</NavLink></p>
                <Button variant="primary" type="submit">
                    VALIDER
                </Button>
            </div>
        </Form>
    );
}

export {
    Login
}