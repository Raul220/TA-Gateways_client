import { Row, Skeleton } from "antd";
import React, { useState, useEffect, useContext } from "react";
import Title1 from "../General/Titles/index";
import { Container } from "../Home/styles";
import axios from "../../config";
import UpdateGateway from "./StepsEdit";

const EditGtw = () => {
  const [gateway, setGateway] = useState({});

  useEffect(() => {
      // debugger;
      const id= window.location.pathname.split('/')[2];
    axios
      .post("/gateways/get-by-id", {id: id})
      .then((response) => {
        if(response.data) {
          setGateway(response.data.gateway);
          console.log(response.data.gateway);
        }        
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);
  return (
    <Container>
      <Title1 title={`Edit ${gateway.name}`} color="#0141D9" />
      <UpdateGateway gateway={gateway} />
    </Container>
  );
};

export default EditGtw;
