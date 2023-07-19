import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
// import axios from "axios";

const ProductDetails = ({ match }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    dispatch(listProductDetails(id))
      .then(() => setLoad(false))
      .catch(() => setLoad(false));
  }, [dispatch, id, match]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [mobileModel, setMobileModel] = useState("");
  const renderAddToCartButton = () => {
    if (product.category === "MobileCases" && mobileModel === "") {
      return (
        <Button className="btn-block" type="submit" disabled>
          Add to cart
        </Button>
      );
    } else {
      return (
        <Button className="btn-block" type="submit" onClick={addToCartHandler}>
          Add to cart
        </Button>
      );
    }
  };

  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined
  );
  useEffect(() => {
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
  }, [product]);
  const renderRequirement = () => {
    if (product.category === "GlassPotrait") {
      return <div />;
    } else if (product.category === "MobileCases") {
      return (
        <Form.Group className="mb-3">
          <Form.Label>
            {product.requirements}
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            value={mobileModel}
            onChange={(e) => setMobileModel(e.target.value)}
            placeholder="Mobile Model"
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label>
            {product.requirements}
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Select
            className="mb-3"
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
            }}
          >
            {product.sizes?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      );
    }
  };
  const addToCartHandler = (event) => {
    navigate(
      `/cart/${id}/?qty=${qty}/?mobileModel=${mobileModel}/?size=${selectedSize}`
    );
  };
  return (
    <>
      <Link
        to="/"
        className="text-decoration-none btn btn-light"
        style={{ backgroundColor: "#00000000" }}
      >
        <i className="fa-solid fa-arrow-left"></i>
        &nbsp; GO BACK
      </Link>
      {loading || load /*|| ImgLoad*/ ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="my-3">
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                <Rating
                  value={product.Rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                Price: Rs.{product.price}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                {product.description}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                <Row>
                  <Col>Satus: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item style={{ backgroundColor: "#00000000" }}>
                  <Row>
                    <Col className="mt-2 mb-3">Qty:</Col>
                    <Col>
                      <Form.Control
                        style={{
                          backgroundColor: "#00000000",
                          border: "1px solid #000000",
                          width: "max-content",
                        }}
                        className="form-select"
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup.Item className="my-3">
              <Form>
                {renderRequirement()}
                {renderAddToCartButton()}
              </Form>
            </ListGroup.Item>
            <p>
              <span style={{ color: "red" }}>*</span>
              <span style={{ fontWeight: "bold" }}>Note:&nbsp;</span>
              You can share the Image after the confirmation of the order
            </p>
            {product.category === "Potraits" ? (
              <p>
                <span style={{ color: "red" }}>*</span>
                <span style={{ fontWeight: "bold" }}>Note:&nbsp;</span>
                If You Order Multiple potraits You can let us know the sizes at
                the time of our contact
              </p>
            ) : product.category === "MobileCases" ? (
              <p>
                <span style={{ color: "red" }}>*</span>
                <span style={{ fontWeight: "bold" }}>Note:&nbsp;</span>
                If You Order Multiple mobileCases You can type multiple mobile
                models in the mobile model option
              </p>
            ) : (
              <p>&nbsp;</p>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetails;
