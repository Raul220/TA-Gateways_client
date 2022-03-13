import { Row, Skeleton } from "antd";
import React, { useState, useEffect, useContext } from "react";
import Title1 from "../General/Titles/index";
import Gateways from "../GatewaysList/index";
import { Container, SpinContainer } from "./styles";
// import { gateways } from "./data";
import axios from "../../config";
import { Spin } from "antd";

const Home = () => {
  const [gateways, setGateways] = useState([]);

  useEffect(() => {
    axios
      .get("/gateways")
      .then((response) => {
        if(response.data) {
          setGateways(response.data.gateways);
        }        
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);
  return (
    <Container>
      {gateways.length > 0 ? (
        <>
          <Row>
            <Title1 title="Gateways" color="#0141D9" />
          </Row>
          <Gateways gateways={gateways} />
        </>
      ) : (
        <SpinContainer>
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton style={{marginTop: 100}} active paragraph={{ rows: 3 }} />
        </SpinContainer>
      )}
    </Container>
  );
};

export default Home;
