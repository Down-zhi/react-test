import React from "react";
import { Input, Select, Modal, message, Form } from "antd";

import { Role, ROLE_TYPE, Grade, GRADE_TYPE} from "../user"

const { Option } = Select;
interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }

  const AddUserModel=(props:Props)=>{
    const { visible, onClose, onSuccess } = props;
    const [form] = Form.useForm();
    const roleOptions = Object.keys(ROLE_TYPE).map((key: Role) => ROLE_TYPE[key]);// Object.keys() 方法从 ROLE_TYPE 对象中提取所有的键，然后使用 map() 遍历这些键，通过键从 ROLE_TYPE 获取对应的值，构建一个角色选项数组 roleOptions
    const gradeOptions = Object.keys(GRADE_TYPE).map((key: Grade) => GRADE_TYPE[key]);  
    
    function handleConfirm(): void {
      alert('创建成功')
    }

    return (
      <Modal
        destroyOnClose
        visible={visible}
        title="新增账号"
        onCancel={onClose}
        onOk={handleConfirm}
      >
        <Form
          name="basic"
          autoComplete="off"
          preserve={false}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 28 }}
          form={form}
        >
          <Form.Item
            label="昵称"
            name="name"
            rules={[{ required: true, message: "请输入昵称", max: 50 }]}
          >
            <Input size="large" placeholder="请输入昵称" maxLength={50} />
          </Form.Item>
          <Form.Item
            label="邮箱地址"
            name="email"
            rules={[
              {
                type: "email",
                message: "请输入正确邮箱地址",
              },
              { required: true, message: "请输入邮箱地址" },
            ]}
          >
            <Input size="large" placeholder="请输入邮箱地址" />
          </Form.Item>
  
          <Form.Item
            label="用户角色"
            name="role"
            rules={[{ required: true, message: "请选择模用户角色" }]}
          >
            <Select allowClear placeholder="请选择模用户角色">
              {roleOptions.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
  
          <Form.Item
            label="用户等级"
            name="grade"
            rules={[{ required: true, message: "请选择模用户等级" }]}
          >
            <Select allowClear placeholder="请选择模用户等级">
              {gradeOptions.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
  export default AddUserModel;