import "./App.css";
import {
  Card,
  Button,
  Form,
  Input,
  Table,
  Tag,
  Space,
  Switch,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";

const { Column } = Table;

function App() {
  const [title, setTitle] = useState([]);
  const [checkId, setCheckId] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    setTitle((prev) => [
      ...prev,
      {
        id: title.length + 1,
        value: values.input,
      },
    ]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { confirm } = Modal;

  const showConfirm = (e) => {
    const id = e.currentTarget.id;
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure",
      onOk() {
        const result = title.filter((item) => Number(id) !== item?.id);
        setTitle(result);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showAlert = (value, e) => {
    const id = parseInt(e.currentTarget.id);

    if (value === false) {
      messageApi.info("Todo is disabled");
      setCheckId((prev) => [...prev, id]);
    } else if (value === true) {
      messageApi.info("Todo is enabled");
      setCheckId(checkId.filter((id2) => id2 !== id));
    }
  };

  console.log("id: ", checkId);

  return (
    <div className="App">
      <div className="container">
        <div className="head">
          <h3>Add Todo</h3>

          <span>
            To add a todo, just fill the form below and click in add todo.
          </span>
        </div>

        <Card
          title="Create a new Todo"
          bordered={false}
          style={{ width: 900, height: 200 }}
        >
          <div className="Card">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="input"
                rules={[
                  {
                    required: true,
                    message: "What needs to be done?",
                  },
                ]}
              >
                <Input className="input" placeholder="What needs to be done?" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Add Todo
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
        <Card
          title="Todo List"
          bordered={false}
          style={{ width: 900, height: 250 }}
        >
          <div className="Table">
            <Table
              size="small"
              dataSource={title}
              style={{ height: 300 }}
              pagination={{
                defaultPageSize: 3,
              }}
            >
              <Column
                dataIndex="value"
                render={(value, record) => {
                  return (
                    <Tag color={checkId?.includes(record?.id) ? "red" : "blue"}>
                      {value}
                    </Tag>
                  );
                }}
              />
              <Column
                dataIndex="id"
                render={(id) => (
                  <Space size="small">
                    {contextHolder}
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                      id={id}
                      value={id}
                      onChange={showAlert}
                    />
                    <Button
                      type="primary"
                      shape="circle"
                      id={id}
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={showConfirm}
                    />
                  </Space>
                )}
              />
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
