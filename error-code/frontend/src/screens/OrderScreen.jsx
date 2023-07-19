import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
// import { useNavigate } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import { useParams } from "react-router-dom";
const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderId = id;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    order.shippingPrice = addDecimals(order.itemsPrice > 1000 ? 0 : 50);
    order.totalPrice = Number(order.itemsPrice) + Number(order.shippingPrice);
  }
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order Details</h2>
      {order.orderItems.length === 0 ? (
        <Message>Order is empty</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.User.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
                </p>
                <p>
                  <strong>Your Order Id: {order._id}</strong>
                </p>
                <p>
                  <strong style={{ color: "red" }}>
                    Share us Your Image along with the Order Id through whatsapp
                  </strong>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.state},
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {order.paidAt.slice(0, 10)}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
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
                            {item.qty} x Rs{item.price} = Rs
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}{" "}
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
                      <Col>Rs.{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>Rs.{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>Rs.{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
