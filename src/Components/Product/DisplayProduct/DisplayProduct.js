import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './DisplayProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

const DisplayProduct = (props) => {
    const { name, price, photo } = props.product
    return (
       
        <section className="col-md-4 mb-4">

            <Card className=" border-0 shadow-lg">
                <Card.Img className="img-fluid " src={photo} alt="images" />
                <Card.Title className="ml-3 mt-3 text-primary">{name}</Card.Title>

                <Card.Body className="d-flex justify-content-between  align-items-center">

                    <Card.Subtitle className="text-primary fs-4">{price}$</Card.Subtitle>
                    <Button className="bay-btn">
                         <FontAwesomeIcon icon={faCartPlus} />
                    Bay-Now</Button>

                </Card.Body>
            </Card>

        </section>

    );
};

export default DisplayProduct;