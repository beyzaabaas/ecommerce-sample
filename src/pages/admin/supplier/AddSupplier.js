import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { baseService } from "../../../api/baseService";
import confirm from "antd/lib/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function AddSupplier() {
  const [supplier, setSupplier] = useState([]);

  const onFinish = (values) => {
    baseService.add("/suppliers", values).then(() => {
      alert("Success!!");
    });
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 4,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            {
              required: true,
              message: "Please input company name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Name"
          name="contactName"
          rules={[
            {
              required: true,
              message: "Please input contact name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Title"
          name="contactTitle"
          rules={[
            {
              required: true,
              message: "Please input contact title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            dataSource={supplier}
            onClick={() => confirm()}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddSupplier;
