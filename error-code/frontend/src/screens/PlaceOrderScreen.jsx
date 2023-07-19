import React, { useEffect } from "react";
import { Button, Col, ListGroup, Image, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/shared/Message";
import CheckOutStep from "../components/shared/CheckoutStep";
import { createOrder } from "../actions/orderAction";
import { useNavigate } from "react-router-dom";
const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  const { order, success, error } = orderCreate;
  const { cartItems } = cart;
  const navigate = useNavigate();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 50);
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        User: userInfo,
        orderItems: cart.cartItems.map((item) => ({
          name: item.name,
          image: item.image,
          qty: item.qty,
          price: item.price,
          size: item.size ? item.size : "",
          mobileModel: item.mobileModel ? item.mobileModel : "",
          Product: item.product,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate, order]);
  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.state},{cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Row>
                            <Link
                              to={`/product/${item.product}`}
                              className="text-decoration-none"
                            >
                              {item.name}
                            </Link>
                          </Row>
                          <Row className="my-3">
                            {item.category !== "GlassPotrait" ? (
                              item.size === "undefined" ? (
                                <p>Mobile Model:&nbsp;{item.mobileModel}</p>
                              ) : (
                                <p>Size:&nbsp;{item.size}</p>
                              )
                            ) : (
                              <p>&nbsp;</p>
                            )}
                          </Row>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs.{item.price} = Rs.
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs.{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs.{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>Rs.{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
                {success && (
                  <Message variant="success">
                    Order Created Successfully
                  </Message>
                )}
              </ListGroup.Item>
              <Button
                type="button"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
