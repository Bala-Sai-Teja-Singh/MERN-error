import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <Nav.Link as={Link} to="/login">
              Signin
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Signin</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <Nav.Link as={Link} to="/login/shipping">
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <Nav.Link as={Link} to="/payment">
              Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <Nav.Link as={Link} to="/placeorder">
              Place Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutStep;
