import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Commandes = () => {
    const [orders, setOrders] = useState([]);
    const [contentOrders, setContentOrders] = useState([]);

    const { reducerSession } = useSelector(state => {
        return {
            reducerSession : state.reducerSession
        }
    });

    useEffect(() => {
        fetch('/orders/'+ reducerSession._id)
            .then(response => response.json())
            .then(res => {
                setOrders(res);
            });
    }, [reducerSession]);

    useEffect(() => {
        let myContentOrders = [];
        orders.forEach((anOrder, i) => {
            const myDate = new Date(anOrder.date);
            const arrayDate = myDate.toISOString().split('T')[0];
            const strHour = myDate.getHours()+'h'+myDate.getMinutes();
            const strDate = arrayDate.split('-').reverse().join('/');

            let totalPrice = anOrder.products.reduce((acc, currentProd) => {
                return acc + (currentProd.price * currentProd.quantity);
            }, 0);
            totalPrice += anOrder.frais_port;
            myContentOrders.push({
                id: anOrder._id,
                content:
                    <>
                        <td className="text-center p-4">{anOrder._id}</td>
                        <td className="text-center p-4">
                            <p>{strDate}</p>
                            <p>{strHour}</p>
                        </td>
                        <td className="text-center p-4">{anOrder.products.length}</td>
                        <td className="text-end p-4">{totalPrice.toFixed(2)} €</td>
                    </>
            })
        });
        setContentOrders(myContentOrders);
    }, [orders]);

    return (
        <>
            <h1>Mes commandes</h1>
            {contentOrders.length > 0 && (
                <Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Date</th>
                            <th>Nombre de produits</th>
                            <th>Total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contentOrders.map((anOrderContent, i) => 
                                <tr key={i} className="align-middle">
                                    {anOrderContent.content}
                                    <td className="text-end p-4">
                                        <Button as={NavLink} to={"/commande/"+anOrderContent.id} variant='primary'>
                                            VOIR
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            )}
        </>
    )
}

export {
    Commandes
}