import { Steps, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { StyledInsert } from "../GatewaysList/styles";
import Principal from "../General/Titles/index";
import { Container } from "../Home/styles";
import GtwForm from "./GatewayForm";
import PrphForm from "./PeripheralForm";
import axios, { rootURL } from "../../config";
// debugger;

const AddGateway = () => {
  const [current, setCurrent] = useState(0);
  const [gateway, setGateway] = useState({
    serial: "",
    name: "",
    ipv4: "",
    peripherals: [],
  });
  const { Step } = Steps;

  useEffect(() => {
    localStorage.setItem("Gateway", JSON.stringify(gateway));
    localStorage.setItem("validateGateway", false);
    localStorage.setItem("validatePeripheral", false);
  }, [gateway]);

  const steps = [
    {
      title: "Add Gateway",
      content: <GtwForm />,
    },
    {
      title: "Peripherals",
      content: <PrphForm />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNext = () => {
    // debugger;
    const valid = localStorage.getItem("validateGateway");
    if (valid === "true") {
      next();
    } else {
      message.error("Fix fields avlue");
    }
  };

  const save = () => {
    // debugger;
    const validGat = localStorage.getItem("validateGateway");
    const validPer = localStorage.getItem("validatePeripheral");
    if (validGat === "true" && validPer === "true") {
      const gat = JSON.parse(localStorage.getItem("Gateway"));
      axios
        .post("/gateways/add", { data: gat })
        .then((response) => {
          response.data.statusCode === 200 &&
            gat.peripherals.map((item) => {
              item.gateway_id = response.data.id;
              axios
                .post("/peripherals/add", { data: item })
                .then((response) => {
                  if (response.data.statusCode === 200) {
                    window.location = rootURL;
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error('Complete the formulary')        
    }
  };

  return (
    <Container>
      <StyledInsert>
        <Principal title="Add Gateway" color="#007ACC" />
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={save}>
              Save
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </StyledInsert>
    </Container>
  );
};

export default AddGateway;
