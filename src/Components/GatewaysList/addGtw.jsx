import { Modal } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import PeripheralSwiper from "./PeripheralSwiper";
import { StyledInsert } from "./styles";
import Principal from "../General/Titles/index";
import GtwForm from "./GtwForm";
import { Container } from "../Home/styles";

const AddGateway = () => {
  return (
    <Container>
      <StyledInsert>
        <Principal title="Add Gateway" color="#007ACC" />
        <GtwForm item={""} />
      </StyledInsert>
    </Container>
  );
};

export default AddGateway;
