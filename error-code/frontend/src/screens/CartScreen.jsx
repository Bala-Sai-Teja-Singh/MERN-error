import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/shared/Message";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from "../actions/cartAction";
import { useParams } from "react-router-dom";

const PatternMatchSize = (string) => {
  const pattern = /%20/g;
  const placeholder = "<SPACE>";
  const replacedString = string.replaceAll(pattern, placeholder);
  const values = replacedString.split("<SPACE>");
  if (values.length >= 4) {
    return values[0] + values[2] + values[3];
  } else {
    return values[0];
  }
};
const PatternMatchMobileModel = (string) => {
  const pattern = /%20/g;
  const placeholder = "<SPACE>";
  const replacedString = string.replaceAll(pattern, placeholder);
  const values = replacedString.split("<SPACE>");
  var model = "";
  console.log(values);
  for (const value of values) {
    model += value;
    model += " ";
  }
  return model;
};
const CartScreen = () => {
  const location = useLocation();
  const productId = useParams().id;
  const navigate = useNavigate();
  const qty = location.search
    ? Number(location.search.split("=")[1].split("/")[0])
    : 1;
  const mobileModel = location.search
    ? PatternMatchMobileModel(location.search.split("=")[2].split("/")[0])
    : "";
  const size = location.search
    ? PatternMatchSize(location.search.split("=")[3].split("/")[0])
    : "";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToCart(productId, qty, mobileModel, size));
  }, [dispatch, productId, qty, mobileModel, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartQuantity(productId, newQuantity));
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty !<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem className="my-3" key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={9} className="mt-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-decoration-none"
                      >
                        <h5>{item.name}</h5>
                      </Link>
                      <p>Rs.&nbsp;{item.price}</p>
                      {item.category !== "GlassPotrait" ? (
                        item.size === "undefined" ? (
                          <p>Mobile Model:&nbsp;{item.mobileModel}</p>
                        ) : (
                          <p>Size:&nbsp;{item.size}</p>
                        )
                      ) : (
                        <p>&nbsp;</p>
                      )}
                      <Row style={{ position: "flex-end" }}>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            className="form-select"
                            style={{ width: "max-content" }}
                            value={item.qty}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.product,
                                Number(e.target.value)
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={3}>
                          <Button
                            className="ms-3"
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i
                              className="fa fa-trash text-danger"
                              aria-hidden="true"
                              style={{ fontSize: "20px" }}
                            ></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2 className="my-3">
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                Rs.&nbsp;
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block my-3"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
