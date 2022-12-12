import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeProduct, resetBasket, updateQuantityProduct } from "../../../actions/action-types";

const Panier = () => {
    const { myReducerPanier, myReducerSession } = useSelector(state => {
        return {
            myReducerPanier : state.reducerPanier,
            myReducerSession : state.reducerSession
        }
    });
    const [products, setProducts] = useState([]);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        setProducts(myReducerPanier.products);
    }, [myReducerPanier]);

    const modifProduct = (e, i, product = '') => {
        e.preventDefault();

        console.log(!isNaN(e.target.value) && e.target.value > 0 && e.target.value < 100);
        if (!isNaN(e.target.value) && e.target.value > 0 && e.target.value < 100) {
            const arrayProd = products;
            arrayProd[i].quantity = e.target.value;
            setProducts(arrayProd);
    
            dispatch(updateQuantityProduct({
                product_id: product.product_id,
                cond: product.conditionnement,
                qty: e.target.value
            }));
        }
    }

    const removeAProduct = (e, i, product = '') => {
        e.preventDefault();

        dispatch(removeProduct({
            product_id: product.product_id,
            cond: product.conditionnement
        }));
    }

    const validerCommande = (e) => {
        e.preventDefault();

        if (myReducerSession.isLogged) {
            /*
                if (!user.email || !user.pwd) {
                    setErrorMessage("Un des champs est vide.");
                    return;
                }
            */

            // TODO vérif des champs
            
            const formData = {
                user: myReducerSession,
                products: products
            }

            let reqAddOrder = new Request('/addOrder', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'content-type': 'application/json' },
            });
            
            let myOrder;
            // TODO fetch
            fetch(reqAddOrder)
                .then(res => res.json())
                .then(data => {
                    myOrder = data;
                    dispatch(resetBasket());
                })
                .then(result => {
                    if (myOrder && myOrder._id) {
                        navigate('/validation/' + myOrder._id);
                    }
                })
                .catch(err => {
                    //setErrorMessage("Une erreur est survenur, veuillez réessayer ultérieurement.");
                    return;
                });
        }
    }

    return (
        <>
            {
                products.length > 0 ?
                    <Form onSubmit={validerCommande}>
                        <h1 className="mb-4">Mon panier</h1>
                        <h2>Mes produits</h2>
                        <Table striped>
                            <thead>
                                <tr className="text-center">
                                    <th>&nbsp;</th>
                                    <th>Désignation</th>
                                    <th>Conditionnement</th>
                                    <th>Quantité</th>
                                    <th>Prix Unit.</th>
                                    <th>Prix Tot.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((orderProd, i) => 
                                        <tr key={i} className="align-middle">
                                            <td className="p-4">
                                                {
                                                    orderProd.image && (
                                                        <img src={"/img/product/" + orderProd.image} className="rounded" style={{height: "60px"}} />
                                                    )
                                                }
                                            </td>
                                            <td className="p-4">{orderProd.name}</td>
                                            <td className="p-4">{orderProd.conditionnement}</td>
                                            <td className="p-4">
                                                <Form.Control type="number" className="m-auto" style={{width: "100px"}} min={1} max={99} value={orderProd.quantity} onChange={(e) => modifProduct(e, i, orderProd)} />
                                            </td>
                                            <td className="p-4 text-end">{parseFloat(orderProd.price).toFixed(2)} €</td>
                                            <td className="p-4 text-end">{parseFloat(orderProd.price * orderProd.quantity).toFixed(2)} €</td>
                                            <td className="p-4 text-end">
                                                <Button variant="danger" onClick={(e) => removeAProduct(e, i, orderProd)}>
                                                    <b>&times;</b>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        {
                            myReducerSession.isLogged ?
                                <Container fluid>
                                    <Row>
                                        <Col className="text-end">
                                            <Button type="submit" variant="primary">
                                                Valider la commande
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>

                                :
                                    <Alert variant="danger" className="text-center">
                                        Pour valider votre panier, veuillez <NavLink>vous connecter</NavLink>.
                                    </Alert>
                        }
                    </Form>
                :
                    <Container fluid>
                        <Row>
                            <Col>
                                <Alert variant="secondary" className="text-center">
                                    Vous n'avez aucun produit d'ajouté dans votre panier.
                                </Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end">
                                <Button as={NavLink} to="/" variant="secondary">
                                    ACCUEIL
                                </Button>
                            </Col>
                        </Row>
                    </Container>
            }
        </>
    )
}

export {
    Panier
}