import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { asyncSingleProduct } from '../redux/reducers/product/ProductDetails';
import { asyncUploadImageProduct } from '../redux/reducers/product/ProductImageUpload';
import { asyncUpdateProduct } from '../redux/reducers/product/UpdateProduct';

export default function ProductEditSreen() {
  const { id } = useParams();

  const [productData, setproductData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const [fileUpload, setfileUpload] = useState('');
  const { detailSuccess, detailError } = useSelector(
    (state) => state.productDetails
  );
  const { updatedProduct } = useSelector((state) => state.updateProduct);

  const { productImageUpload } = useSelector((state) => state.uploadImage);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (detailSuccess || detailSuccess._id !== id) {
      dispatch(asyncSingleProduct(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detailSuccess) {
      setproductData({
        ...productData,
        _id: detailSuccess._id,
        name: detailSuccess.name,
        image: detailSuccess.image,
        brand: detailSuccess.brand,
        category: detailSuccess.category,
        description: detailSuccess.description,
        price: detailSuccess.price,
        countInStock: detailSuccess.countInStock,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailSuccess]);

  useEffect(() => {
    if (productImageUpload) {
      setproductData({
        ...productData,
        image: productImageUpload,
      });
    }
  }, [productData, productImageUpload]);

  useEffect(() => {
    if (productImageUpload.length > 0) {
      dispatch(asyncUpdateProduct(productData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImageUpload]);

  useEffect(() => {
    if (updatedProduct) {
      navigate('/admin/productslist/');
    }
  }, [navigate, updatedProduct, productImageUpload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileUpload.length > 0) {
      dispatch(asyncUploadImageProduct(fileUpload));
    } else {
      dispatch(asyncUpdateProduct(productData));
    }
  };

  return (
    <Container>
      <Row className='align-items-start'>
        <Col md={3} className='h-100'>
          <BackButton />
        </Col>
        <Col md={6}>
          <h1>Edit Product</h1>
          {!detailSuccess ? (
            <Loading />
          ) : detailError ? (
            <Message variant={'danger'}>{detailError}</Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={productData.name}
                      minLength={4}
                      onChange={(e) =>
                        setproductData({ ...productData, name: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPrice'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      value={productData.price}
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicImage'>
                    <Form.Label>Image</Form.Label>

                    <Form.Control
                      type='text'
                      name='image'
                      readOnly
                      value={productData.image}
                    />
                    <Form.Control
                      type='file'
                      name='image'
                      onChange={(e) => setfileUpload(e.target.files)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicBrand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      value={productData.brand}
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          brand: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicCategory'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      value={productData.category}
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          category: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='formBasicCountInStock'
                  >
                    <Form.Label>Count in Stock</Form.Label>
                    <Form.Control
                      type='number'
                      label='contInStock'
                      value={productData.countInStock}
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          countInStock: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      value={productData.description}
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='w-100'>
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
