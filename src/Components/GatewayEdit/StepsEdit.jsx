import {
  Steps,
  Button,
  message,
  Input,
  Form,
  Card,
  List,
  Switch,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { StyledInsert } from "../GatewaysList/styles";
import { Field, Data, ModalInfo, StyledImg } from "../GatewaysList/styles";
import axios, { rootURL } from "../../config";
import { DeleteOutlined } from "@ant-design/icons";
import { Container } from "../Home/styles";
// debugger;

const UpdateGateway = (gateway) => {
  const [current, setCurrent] = useState(0);
  const [formG] = Form.useForm();
  const [formP] = Form.useForm();
  const [gateways, setGateways] = useState([]);
  const [peripherals, setPeripherals] = useState([]);
  const [validG, setValidG] = useState(true);
  // const [hiddeP, setHiddeP] = useState(true);
  const { Step } = Steps;

  useEffect(() => {
    axios
      .get("/gateways")
      .then((response) => {
        if (response.data) {
          setGateways(response.data.gateways);
          // debugger;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const existPeri = (uid) => {
    let found = false;
    let i = 0;
    while (!found && i < peripherals.length) {
      if (peripherals[i].uid === uid) {
        found = true;
      }
      i++;
    }
    return found;
  };

  const savePeri = () => {
    // debugger;
    if (gateway.gateway.peripherals.length < 10) {
      formP
        .validateFields()
        .then(() => {
          const item = {};
          item.uid = formP.getFieldValue("uid");
          item.vendor = formP.getFieldValue("vendor");
          item.status = formP.getFieldValue("status") ===  undefined ? 0 : formP.getFieldValue("status");
          let currentdate = new Date();
          item.created_at =
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();
          if (!existPeri(item.uid)) {
            setPeripherals((peripherals) => [...peripherals, item]);
            document.getElementById("periForm").reset();
          } else {
            message.error("Already exist an Peripheral with this UID.");
          }
        })
        .catch((error) => {
          message.error("Fix fields value.");
        });
    } else {
      message.error("One gateway only can have 10 periferals.");
    }
  };

  const removePeri = (uid) => {
    setPeripherals(peripherals.filter((item) => item.uid !== uid));
  };

  const handleSerialChange = (e) => {
    formG.setFieldsValue({ serial: e.target.value });
  };

  const handleNameChange = (e) => {
    formG.setFieldsValue({ name: e.target.value });
  };

  const handleIPChange = (e) => {
    formG.setFieldsValue({ ipv4: e.target.value });
  };

  const handleUIDChange = (e) => {
    formP.setFieldsValue({ uid: e.target.value });
  };

  const handleVendorChange = (e) => {
    formP.setFieldsValue({ vender: e.target.value });
  };

  const handleStatusChange = (e) => {
    formP.setFieldsValue({ status: e ? 1 : 0 });
  };

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
      if (
        gateways[i].serial === serialG &&
        gateways[i].serial !== gateway.gateway.serial
      ) {
        found = true;
      }
      i++;
    }
    return found;
  };

  const gForm = (gateway) => {
    if (gateway.gateway.serial !== undefined) {
      formG.setFieldsValue({
        serial: gateway.gateway.serial,
        name: gateway.gateway.name,
        ipv4: gateway.gateway.ipv4,
      });
      return (
        <Form form={formG} name="control-hooks" style={{ width: 700 }}>
          {/* <p style={{ color: "red", margin: 0 }} hidden={hiddeP}>
            This Serial already exist.
          </p> */}
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
      );
    }
  };
  const pForm = (gateway) => {
    if (gateway.gateway.peripherals !== undefined) {
      return (
        <Container>
          <Form form={formP} name="peri" id="periForm">
            <Form.Item name="uid" label="UID" rules={[{ required: true }]}>
              <InputNumber
                min={1}
                placeholder="UID"
                id="uid"
                onChange={handleUIDChange}
              />
            </Form.Item>
            <Form.Item
              name="vendor"
              label="Vendor"
              rules={[{ required: true }]}
              onChange={handleVendorChange}
            >
              <Input
                placeholder="Vendor"
                id="vendor"
                onChange={handleVendorChange}
              />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Switch onChange={handleStatusChange} />
            </Form.Item>
            <Button onClick={savePeri}>Add</Button>
          </Form>
          <List
            style={{ marginTop: 20 }}
            itemLayout="vertical"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 2,
            }}
            dataSource={peripherals}
            extra={
              <StyledImg
                alt="logo"
                src="data:image/png;base64,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"
              />
            }
            renderItem={(item) => (
              <List.Item
                id={`listPeri${item.id}`}
                extra={
                  <StyledImg
                    style={{ width: 100 }}
                    alt="logo"
                    src="http://simpleicon.com/wp-content/uploads/pc.png"
                  />
                }
              >
                <Card id={`peri-${item.id}`}>
                  <Button type="ghost" onClick={() => removePeri(item.uid)}>
                    <DeleteOutlined />
                  </Button>
                  <ModalInfo>
                    <Field>UID: </Field>
                    <Data>{item.uid}</Data>
                  </ModalInfo>
                  <ModalInfo>
                    <Field>Vendor: </Field>
                    <Data>{item.vendor}</Data>
                  </ModalInfo>
                  <ModalInfo>
                    <Field>Created: </Field>
                    <Data>{item.created_at}</Data>
                  </ModalInfo>
                  <ModalInfo>
                    <Field>Status: </Field>
                    <Data color={item.status === 0 ? "#BFBFBF" : "#1890FF"}>
                      {item.status === 1 ? "ON" : "OFF"}
                    </Data>
                  </ModalInfo>
                </Card>
              </List.Item>
            )}
          />
        </Container>
      );
    }
  };

  const steps = [
    {
      title: `Edit Gateway ${gateway.gateway.name}`,
      content: gForm(gateway),
    },
    {
      title: "Peripherals",
      content: pForm(gateway),
    },
  ];

  const next = () => {
    // debugger;
    setCurrent(current + 1);
    if (gateway.gateway.peripherals.length !== undefined) {
      setPeripherals(gateway.gateway.peripherals);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNext = () => {
    // debugger;
    const serial = formG.getFieldValue("serial");
    const name = formG.getFieldValue("name");
    const ipv4 = formG.getFieldValue("ipv4");
    if (name !== "" && serial !== "" && ipv4 !== "") {
      const exist = findExistingSerial(serial);
      if (!exist) {
        const isIp =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipv4
          );
        if (isIp) {
          setValidG(true);
          gateway.gateway.serial = serial;
          gateway.gateway.name = name;
          gateway.gateway.ipv4 = ipv4;
        } else {
          setValidG(false);
        }
      } else {
        setValidG(false);
        message.error("Thi serial already exist");
      }
    } else {
      setValidG(false);
    }
    if (validG) {
      next();
    } else {
      message.error("Fix fields values.");
    }
  };

  const save = () => {
    // debugger;
    if (peripherals.length > 0) {
      const gtw = gateway.gateway;
      axios
        .post("/gateways/update", { data: gtw })
        .then((response) => {
          peripherals.map((item) => {
            item.gateway_id = gtw.id;
            axios
              .post("/peripherals/add", { data: item })
              .then((response) => {
                if (response.data.statusCode === 200) {
                  if (peripherals[peripherals.length - 1].uid == response.data.item.uid) {
                    window.location = rootURL;
                  }                 
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
      message.error("A Gateway has to have at least one Peripheral.");
    } 
  };

  return (
    <StyledInsert>
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
          <Button type="primary" onClick={save} style={{marginBottom: 10}}>
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
  );
};

export default UpdateGateway;
