import { Form , Button, Alert } from 'react-bootstrap';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

function Inscription(props) {

    // Informations rentrés dans le champs
    const [user, setUser] = useState({
        name: '',
        surname: '',
        birthDate: '',
        phone: '',
        email: '',
        pwd: '',
        secPwd: ''
    });

    // Message à afficher en cas d'erreur
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Changement d'input
    const handleChange = (e) => {
        e.preventDefault();

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    // Formulaire d'envoi pour s'inscrire
    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMessage("");
        if (!user.name
                || !user.surname
                || !user.birthDate
                || !user.phone
                || !user.email
                || !user.pwd
                || !user.secPwd) {
            setErrorMessage("Un des champs est vide.");
            return;
        }

        if (user.pwd !== user.secPwd) {
            setErrorMessage("Les mots de passe rentrés ne sont pas les mêmes.");
            return;
        }
        
        // else REQUÊTE en back d'un ajout d'utilisateur
        let req = new Request('/user/inscription', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        });
        
        fetch(req)
            .then(res => res.json())
            .then(data => {
                if (data.done && data.done === 'OK') {
                    navigate("/connexion");
                    return;
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <Form method="post" onSubmit={handleSubmit}>
            <h1>Créer un compte</h1>

            <Form.Group className="mb-3" controlId="basicsInfos">
                <Form.Label>Nom</Form.Label>
                <Form.Control name="surname" type="text" className="inputUser" value={user.surname} onChange={handleChange} />

                <Form.Label>Prénom</Form.Label>
                <Form.Control name="name" type="text" className="inputUser" value={user.name} onChange={handleChange} />

                <Form.Label>Date de naissance</Form.Label>
                <Form.Control name="birthDate" type="date" className="inputUser" value={user.birthDate} 
                    max={new Date().toISOString().slice(0, 10)} onChange={handleChange} />

                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" className="inputUser" value={user.email} onChange={handleChange} />

                <Form.Label>Téléphone</Form.Label>
                <Form.Control name="phone" type="text" className="inputUser" value={user.phone} onChange={handleChange} />

                <Form.Label>Mot de passe</Form.Label>
                <Form.Control name="pwd" type="password" className="inputUser" value={user.pwd} onChange={handleChange} />

                <Form.Label>Répéter le mot de passe</Form.Label>
                <Form.Control name="secPwd" type="password" className="inputUser" value={user.secPwd} onChange={handleChange} />
            </Form.Group>
            
            <div className="text-center">
                {errorMessage !== '' && (
                    <Alert key="danger" variant="danger">
                        {errorMessage}
                    </Alert>
                )}
                <p>Déjà un compte ? <NavLink className="btn-link" to="/connexion">Se connecter</NavLink></p>
                <Button variant="primary" type="submit">
                    S'INSCRIRE
                </Button>
            </div>
        </Form>
    );
}

export {
    Inscription
}