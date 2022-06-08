import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

var initData = [
  {
    key: "1",
    name: "林志凌",
    age: 32,
    address: "上海市普陀区金沙江路 1518 号 ",
    prefession: ["程序员"],
  },
  {
    key: "2",
    name: "刘德华",
    age: 42,
    address: "上海市普陀区金沙江路 1517 号",
    prefession: ["无业"],
  },
  {
    key: "3",
    name: "郭富城",
    age: 32,
    address: "上海市普陀区金沙江路 1516 号",
    prefession: ["教师"],
  },
];
const HorizontalLoginForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isAdd, setIsAdd] = useState(true);
  const [currentIndex, setCurrentIndex] = useState();
  const [name, setName] = useState("");
  const [data, setData] = useState([...initData]);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  function confirmAudit(e) {
    console.log(e);
  }
  function confirm(e) {
    console.log(e);
    deleteData(e);
    // message.success("删除成功");
  }

  function cancel(e) {
    console.log(e);
    message.error("已取消删除");
  }
  function deleteData(index) {
    let arr = [...data];
    arr.splice(index, 1); //删除数据
    setData(arr);
    message.success("删除成功");
  }

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "职业",
      key: "prefession",
      dataIndex: "prefession",
      render: (prefession) => (
        <Fragment>
          {prefession.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Fragment>
      ),
    },
    {
      title: "操作",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button type="primary" onClick={() => showModal2(record, index)}>
              编辑
            </button>
            <Popconfirm
              title="此操作将永久删除这条信息，是否继续？"
              onConfirm={() => confirm(index)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button>删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const showModal = () => {
    setIsAdd(true);
    setIsModalVisible(true);
  };

  const showModal2 = (obj, index) => {
    setCurrentIndex(index);
    setUserInfo(obj);
    setIsAdd(false);
    setIsModalVisible(true);
  };

  const onModalOk = () => {
    isAdd ? addHandle() : editHandle();
  };

  const editHandle = () => {
    let arr = [...data];
    {
      /*定义数组*/
    }
    arr[currentIndex] = userInfo;
    {
      /*获取下标*/
    }
    setData(arr);
    setIsModalVisible(false);
    setUserInfo({});
    /*更新数组*/
  };

  const addHandle = () => {
    let newKey = data[data.length - 1]["key"]; /*获取最后一个元素key*/
    const info = {
      ...userInfo,
      key: ++newKey,
    };
    setData([...data, info]);
    setIsModalVisible(false);
    setUserInfo({});
  };

  const onModalCancel = () => {
    console.log("cancel");
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const search = () => {
    let arr = [];
    if (name) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.name === name) {
          console.log(element);
          arr.push(element);
        }
      }
      setData(arr);
    } else {
      setData(initData);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "请输入你要查询的姓名",
            },
          ]}
        >
          <Input
            onChange={(v) => setName(v.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户姓名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        ></Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" onClick={search}>
              查询
            </Button>
          )}
        </Form.Item>
        <Form.Item shouldUpdate>
          <Button type="primary" onClick={showModal}>
            +新建
          </Button>
          <Modal
            title="添加信息"
            visible={isModalVisible}
            onOk={onModalOk}
            okText={isAdd ? "保存" : "确定"}
            cancelText="取消"
            onCancel={onModalCancel}
          >
            <Form
              {...layout}
              name="nest-messages"
              validateMessages={validateMessages}
            >
              <Form.Item label="姓名" rules={[{ required: true }]}>
                <Input
                  value={userInfo.name}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="年龄"
                rules={[{ type: "number", min: 0, max: 99 }]}
              >
                <InputNumber
                  value={userInfo.age}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, age: e });
                  }}
                />
              </Form.Item>
              <Form.Item label="地址" rules={[{ type: "any" }]}>
                <Input
                  value={userInfo.address}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, address: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item label="职业">
                <Input
                  value={userInfo.prefession}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, prefession: [e.target.value] });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default HorizontalLoginForm;
