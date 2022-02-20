import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

const GtwForm = (item) => {
  const [form] = Form.useForm();
  console.log(item.item.name);

  return (
    <Form form={form} name="control-hooks">
      <Form.Item name="serial" label="Serial" rules={[{ required: true }]}>
        <Input defaultValue={item.item.serial} />
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input defaultValue={item.item.name} />
      </Form.Item>
      <Form.Item name="ipv4" label="IpVa" rules={[{ required: true }]}>
        <Input defaultValue={item.item.ipv4} />
      </Form.Item>
      <Button type="primary" icon={<PlusCircleOutlined />}>
        Add Peripheral
      </Button>
    </Form>
  );
};

export default GtwForm;
