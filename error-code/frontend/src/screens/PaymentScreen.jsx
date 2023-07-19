import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutStep from "../components/shared/CheckoutStep";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => {
                savePaymentMethod(e.target.value);
              }}
            />
            {/* <Form.Check
              type="radio"
              label="Paytm"
              id="Paytm"
              name="paymentMethod"
              value="Paytm"
              checked
              onChange={(e) => {
                savePaymentMethod(e.target.value);
              }}
            /> */}
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
