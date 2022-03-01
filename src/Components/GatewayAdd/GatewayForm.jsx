import { Input, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { StyledForm } from "../GatewaysList/styles";
import { Container } from "../Home/styles";
import axios from "../../config";

const GtwForm = () => {
  const [form] = Form.useForm();
  const [gateways, setGateways] = useState([]);
  const [hiddeP, setHiddeP] = useState(true);

  useEffect(() => {
    axios
      .get("/gateways")
      .then((response) => {
        if (response.data) {
          setGateways(response.data.gateways);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gateways]);

  const validateMessages = {
    required: "${label} is required!",
    pattern: "${label} must be an IPv4!",
    type: { number: "${label} must be a number!" },
  };

  const findExistingSerial = (serialG) => {
    // debugger;
    let found = false;
    let i = 0;
    while (!found && i < gateways.length) {
      if (gateways[i].serial === serialG) {
        found = true;
      }
      i++;
    }
    setHiddeP(!found);
  };

  const isValidField = () => {
    form
      .validateFields()
      .then(() => {
        if(hiddeP){
          localStorage.setItem("validateGateway", true);
        }        
      })
      .catch((error) => {
        localStorage.setItem("validateGateway", false);
      });
  };

  const handleSerialChange = (e) => {
    // debugger;
    findExistingSerial(e.target.value);
    const gtw = JSON.parse(localStorage.getItem("Gateway"));
    gtw.serial = e.target.value;
    localStorage.setItem("Gateway", JSON.stringify(gtw));
    isValidField();
  };

  const handleNameChange = (e) => {
    const gtw = JSON.parse(localStorage.getItem("Gateway"));
    gtw.name = e.target.value;
    localStorage.setItem("Gateway", JSON.stringify(gtw));
    isValidField();
  };

  const handleIPChange = (e) => {
    const gtw = JSON.parse(localStorage.getItem("Gateway"));
    gtw.ipv4 = e.target.value;
    localStorage.setItem("Gateway", JSON.stringify(gtw));
    isValidField();
  };

  return (
    <Container>
      <StyledForm>
        <Form
          form={form}
          name="control-hooks"
          style={{ width: 700 }}
          validateMessages={validateMessages}
        >
          <p style={{ color: "red", margin: 0 }} hidden={hiddeP}>
            This Serial already exist.
          </p>
          <Form.Item name="serial" label="Serial" rules={[{ required: true }]}>
            <Input placeholder="Serial" onChange={handleSerialChange} />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name" onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            name="ipv4"
            label="IPv4"
            rules={[
              { required: true },
              {
                pattern:
                  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                message: "It must be an IPv4",
              },
            ]}
          >
            <Input onChange={handleIPChange} placeholder="Ipv4" />
          </Form.Item>
        </Form>
      </StyledForm>
    </Container>
  );
};

export default GtwForm;
