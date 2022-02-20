import { Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { StyledForm } from "./styles";
import ModalPer from "./peripheralModal";

const GtwForm = (item) => {
  const [form] = Form.useForm();
  const [availableSubmit, setAvailableSubmit] = useState(false);

  const validateMessages = {
    required: "${label} is required!",
    pattern: "${label} must be an IPv4!",
  };

  return (
    <StyledForm>
      <Form
        form={form}
        name="control-hooks"
        style={{ width: 700 }}
        validateMessages={validateMessages}
      >        
      <Form.Item style={{ marginTop: 15 }}>
        <Button disabled={!availableSubmit} type="primary">
          Submit
        </Button>
      </Form.Item>
        <Form.Item name="serial" label="Serial" rules={[{ required: true }]}>
          <Input
            placeholder="Serial"
            defaultValue={item.item !== "" ? item.item.serial : ""}
          />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input
            placeholder="Name"
            defaultValue={item.item !== "" ? item.item.name : ""}
          />
        </Form.Item>
        <Form.Item
          name="ipv4"
          label="IpV4"
          rules={[
            { required: true },
            {
              pattern:
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
              message: "It must be an IPv4",
            },
          ]}
        >
          <Input
            placeholder="Ipv4"
            defaultValue={item.item !== "" ? item.item.ipv4 : ""}
          />
        </Form.Item>
      </Form>
        <ModalPer />
    </StyledForm>
  );
};

export default GtwForm;
