import { Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Flex } from "./styles";

const ModalPer = (item) => {
  const [modal, setModal] = useState(false);

  const validateMessages = {
    required: "${label} is required!",
    pattern: "${label} must be an IPv4!",
  };

  return (
    <Flex>        
      <Button icon={<PlusCircleOutlined />} type="ghost" onClick={() => setModal(true)}>
        Add Peripheral
      </Button>
      <Modal
        id="modalPeripheral"
        title="Add Peripheral"
        visible={modal}
        onOk={() => {
          setModal(false);
        }}
        onCancel={() => setModal(false)}
        okButtonProps={{
          children: "Custom OK",
        }}
        cancelButtonProps={{
          children: "Custom cancel",
        }}
        okText="Add"
        cancelText="Cancel"
        width={800}
      >
        <h1>Peripheral</h1>
      </Modal>
    </Flex>
  );
};

export default ModalPer;
