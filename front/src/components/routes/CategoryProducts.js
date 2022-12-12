import { useEffect, useState } from "react";
import { Alert, Container, Row, Col, Image } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const [liste, setListe] = useState({
        category_name: "",
        products: []
    });
    const [categoryId, setCategoryId] = useState("");

    let { id } = useParams();

    useEffect(() => {
        if (categoryId !== id) {
            setCategoryId(id);
        }
    });

    useEffect(() => {
        fetch('/products/category/'+ id)
            .then(response => response.json())
            .then(res => {
                setListe(res);
            })
    }, [categoryId]);

    return (
        <>
            <h1>Produits de la catégorie "{ liste.category_name }"</h1>
            <Container fluid="true">
                <Row>
                    {
                        liste.products.map((product, i) =>
                            <Col key={i} md={3}>
                                <NavLink to={'/product/'+product._id}>
                                    <Alert key="secondary" variant="secondary" className="d-inline-block m-2 text-center" style={{width: "90%"}}>
                                        {product.images.length > 0 && (
                                            <Image src={'/img/product/' + product.images[0]} className="rounded" />
                                        )}
                                        <p className="mt-3">
                                            <b>
                                                {product.name}
                                            </b>
                                        </p>
                                        <p className="mt-3">
                                            {product.conditionnement.length > 0 && (
                                                <span>
                                                    <b style={{fontSize: "2rem"}}>
                                                        {parseFloat(product.conditionnement[0].price).toFixed(2)} €
                                                    </b>
                                                    &nbsp;pour&nbsp;
                                                    <b>
                                                        {product.conditionnement[0].name}
                                                    </b>
                                                </span>
                                            )}
                                        </p>
                                    </Alert>
                                </NavLink>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}

export {
    CategoryProducts
}