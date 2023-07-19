import React from "react";
import { Card, Container } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
const ProductScreen = ({ product }) => {
  return (
    <Container>
      <Card
        className="my-3 p-3"
        style={{
          borderRadius: "15px",
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`} className="text-decoration-none">
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.Rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="div">Rs.{product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductScreen;
