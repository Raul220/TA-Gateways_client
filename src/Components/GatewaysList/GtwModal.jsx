import { Modal } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import PeripheralSwiper from "./PeripheralSwiper";
import { Field, Data, ModalInfo } from "./styles";

const GtwModal = (item, type, visible) => {
  console.log(item);
  const [showModal, setShowModal] = useState(visible);
  const [typeModal, setTypeModal] = useState(type);

  const modal_name = () => {
    if (type === "show") {
      return item.item.name;
    } else if (type === "edit") {
      return `Edit ${item.item.name}`;
    } else {
      return "Add Gateway";
    }
  };

  return (
    <Modal
      id="modalShow"
      title={modal_name}
      visible={showModal}
      onOk={() => {
        showModal = false;
      }}
      onCancel={() => setShowModal(false)}
      okButtonProps={{
        children: "Custom OK",
      }}
      cancelButtonProps={{
        children: "Custom cancel",
      }}
      okText="Edit"
      cancelText="Cancel"
      width={800}
    >
      <ModalInfo>
        <Field>Serial: </Field>
        <Data>{item.serial}</Data>
      </ModalInfo>
      <ModalInfo>
        <Field>Ipv4: </Field>
        <Data>{item.ipv4}</Data>
      </ModalInfo>
      <PeripheralSwiper items={item.peripherals} />
    </Modal>
  );
};

export default GtwModal;
