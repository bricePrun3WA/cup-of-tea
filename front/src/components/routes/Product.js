import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { addProduct } from "../../actions/action-types";

const Product = () => {
    let dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [productId, setProductId] = useState("");
    const [formChoices, setFormChoices] = useState({
        cond: {
            name: "",
            price: 0
        },
        qty: 1
    });

    let { id } = useParams();

    useEffect(() => {
        if (productId !== id) {
            setProductId(id);
        }
    });

    useEffect(() => {
        fetch('/product/'+ id)
            .then(response => response.json())
            .then(res => {
                setProduct(res);
            });
    }, [productId]);

    useEffect(() => {
        if (product.conditionnement && product.conditionnement.length > 0) {
            setFormChoices({
                ...formChoices,
                cond: {
                    name: product.conditionnement[0].name,
                    price: product.conditionnement[0].price.toFixed(2)
                }
            });
        }
    }, [product]);

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.name === 'cond') {
            const index = e.target.selectedIndex;
            const optionElement = e.target.childNodes[index]
            const value2 =  optionElement.getAttribute('value2');

            setFormChoices({
                ...formChoices,
                cond: {
                    name: e.target.value,
                    price: parseFloat(value2).toFixed(2)
                }
            });
        } else {
            setFormChoices({
                ...formChoices,
                [e.target.name]: e.target.value,
            });
        }
    }

    const addProductToCart = (e) => {
        e.preventDefault();

        dispatch(addProduct({
            ...formChoices,
            product: product
        }));
    }

    return (
        <>
            <h1>Détail du produit</h1>
            <Container fluid="true">
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        {product.images && product.images.length > 0 && (
                            <Image src={'/img/product/' + product.images[0]} className="rounded" />
                        )}
                    </Col>
                    <Col md={6} className="text-center">
                        {product && (
                            <span>
                                <div className="mb-4">
                                    <h2>{product.name}</h2>
                                    <p>
                                        { product.isHeart ? <b className="text-danger">&#x2764; Coup de coeur !</b> : '' }
                                    </p>
                                </div>
                                <p className="text-secondary">
                                    { product.description }
                                </p>

                                <Form onSubmit={addProductToCart}>
                                    <Row className="align-items-center">
                                        <Col md={6} className="text-center">
                                            <Form.Label>Conditionnement</Form.Label>
                                            <Form.Select name="cond" value={formChoices.cond.name} onChange={handleChange} aria-label="Condition.">
                                                {product.conditionnement && product.conditionnement.length > 0 && (
                                                    product.conditionnement.map((cond, i) =>
                                                        <option key={i} value={cond.name} value2={cond.price}>{cond.name}</option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </Col>
                                        <Col md={6} className="text-center">
                                            <Form.Label>Quantité</Form.Label>
                                            <Form.Control name="qty" type="number" value={formChoices.qty} onChange={handleChange} min={1} max={99} aria-label="Quantité" />
                                        </Col>
                                    </Row>
                                    
                                    {product.conditionnement && product.conditionnement.length > 0 && (
                                        <h2 style={{fontSize: "3rem"}}>{formChoices.cond.price} € l'unité</h2>
                                    )}

                                    <div className="text-end">
                                        <Button variant="primary" type="submit">
                                            VALIDER
                                        </Button>
                                    </div>
                                </Form>
                            </span>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export {
    Product
}