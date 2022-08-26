import { Button, Input, Space, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { baseService } from "../../../api/baseService";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  let navigate = useNavigate();
  const searchInput = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    baseService.getAll("/products").then((data) => {
      setProduct(data);
      setLoading(false);
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const deleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: "Irreversible!!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        baseService.delete("/products", id).then(() => {
          getData();
        });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const updateConfirm = (id) => {
    navigate("/admin/products/update/" + id);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      title: "Units In Stock",
      dataIndex: "unitsInStock",
      sorter: (a, b) => a.unitsInStock - b.unitsInStock,
    },
    {
      title: "Update",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => updateConfirm(id)} type="primary" ghost>
          Update
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => deleteConfirm(id)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}></Spin>
      <Table columns={columns} dataSource={product} rowKey="id"></Table>
    </>
  );
}

export default ProductList;
