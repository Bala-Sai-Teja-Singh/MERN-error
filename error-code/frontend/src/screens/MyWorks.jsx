import React from "react";
import { Col, Row, Image, Collapse, Button, Container } from "react-bootstrap";
import { useState } from "react";
const MyWorks = () => {
  const [showImage, setShowImage] = useState(false);
  return (
    <Container>
      <Row md={4}>
        <Image
          effect="blur"
          className="my-3 my-works-image"
          src={require("../myworkImages/customised-potrait-2.2.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/mobile-case-2.2.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/customised-potrait-4.1.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/mobile-case-3.2.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/customised-potrait-5.3.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/mobile-case-4.3.jpg")}
          alt="potarit"
          fluid
        />
        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/customised-potrait-6.2.jpg")}
          alt="potarit"
          fluid
        />

        <Image
          loading="lazy"
          className="my-3 my-works-image"
          src={require("../myworkImages/mobile-case-5.2.jpg")}
          alt="potarit"
          fluid
        />
      </Row>
      <Col>
        <Button variant="dark" onClick={() => setShowImage(!showImage)}>
          {showImage ? "Hide" : "See More of my works"}
        </Button>
        <Collapse in={showImage}>
          <Row md={4}>
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-1.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-2.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-6.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-7.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-9.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-10.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-12.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-19.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-21.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-28.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-29.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-32.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-33.jpg")}
              alt="potarit"
              fluid
            />
            <Image
              loading="lazy"
              className="my-3 my-works-image"
              src={require("../myworkImages/mywork-34.jpg")}
              alt="potarit"
              fluid
            />
          </Row>
        </Collapse>
      </Col>
    </Container>
  );
};

export default MyWorks;
