import { Button, Form, Input } from "antd";
import React from "react";
import { baseService } from "../../../api/baseService";

function AddProduct() {
  const onFinish = (values) => {
    baseService.add("/products", values).then(() => {
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unit Price"
          name="unitPrice"
          rules={[
            {
              required: true,
              message: "Please input unit price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Unit Stock"
          name="unitsInStock"
          rules={[
            {
              required: true,
              message: "Please input unit stock!",
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
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddProduct;
