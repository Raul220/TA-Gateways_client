import { Row } from "antd";
import React, { useState, useEffect, useContext } from "react";
import Title1 from "../General/Titles/index";
import Gateways from "../GatewaysList/index";
import { Container } from "./styles";
import { gateways } from "./data";

const Home = () => {
  return (
    <Container>
      <Row>
        <Title1 title="Gateways" color="#0141D9" />
      </Row>
      <Gateways gateways={ gateways } />
    </Container>
  );
};

export default Home;
