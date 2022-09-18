import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loading from '../components/Loading';
import Rating from '../components/Rating';
import { asyncAddProduct } from '../redux/reducers/cartReducer';
import { asyncSingleProduct } from '../redux/reducers/productReducer';

const ProductScreen = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.productList.product);
    const error = useSelector((state) => state.productList.error);
    const dispatch = useDispatch();
    const [isLoad, setIsLoad] = useState(false);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProd = async () => {
            await dispatch(asyncSingleProduct(id));

            setIsLoad(true);
        };
        fetchProd();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const addtoCartHandler = () => {
        dispatch(asyncAddProduct(id, qty));
        navigate(`../cart/${id}?qty=${qty}`);
    };

    return !isLoad ? (
        <Loading />
    ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <Link className="btn btn-dark my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews}`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option value={x + 1} key={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item className="d-grid gap-2">
                                <Button
                                    onClick={addtoCartHandler}
                                    className="btn btn-lg btn-primary"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                >
                                    {' '}
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
