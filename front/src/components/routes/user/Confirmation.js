import { useEffect, useState } from "react";
import { Alert, Button, Table } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

const Confirmation = () => {
    const [order, setOrder] = useState({});
    const [orderId, setOrderId] = useState("");

    let { id } = useParams();

    useEffect(() => {
        if (orderId !== id) {
            setOrderId(id);
        }
    }, []);

    useEffect(() => {
        fetch('/order/'+ id)
            .then(response => response.json())
            .then(res => {
                setOrder(res);
            });
    }, [orderId]);


    let arrayDate = [];
    let strDate = "";
    let productsContent = "";
    if (order.date) {
        arrayDate = order.date.split('T')[0];
        strDate = arrayDate.split('-').reverse().join('/');
    }

    if (order.products && order.products.length > 0) {
        productsContent =
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
                        order.products.map((orderProd, i) => 
                            <tr key={i} className="align-middle">
                                <td className="p-4">
                                    <img src={"/img/product/" + orderProd.image} className="rounded" style={{height: "60px"}} />
                                </td>
                                <td className="p-4">{orderProd.name}</td>
                                <td className="p-4">{orderProd.conditionnement}</td>
                                <td className="p-4">{orderProd.quantity}</td>
                                <td className="p-4 text-end">{parseFloat(orderProd.price).toFixed(2)} €</td>
                                <td className="p-4 text-end">{parseFloat(orderProd.price * orderProd.quantity).toFixed(2)} €</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
    }
    return (
        <>
            <Alert variant="success" className="text-center mb-4" style={{padding: "1em"}}>
                Votre commande a bel et bien été validée. Vous pouvez retouver le résumé de cette dernière via <b>"Profil &gt; Mes commandes"</b>.
            </Alert>
            <h1>Commande du {strDate}</h1>
            {productsContent}
        </>
    )
}

export {
    Confirmation
}