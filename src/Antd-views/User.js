import React, { useEffect, useState } from "react";

import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Select, Modal, message, Form,Button } from "antd";

import { Role, ROLE_TYPE, Grade, GRADE_TYPE} from "./user.ts"


const { Option } = Select;
interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }


function User() {
    const [addVisible, setAddVisible] = useState(false);
    return (
        <div>
         <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddVisible(true)}>
          新增用户
        </Button>
           {/* 添加用户 */}
      <AddUserModel
        visible={addVisible}
        onClose={() => setAddVisible(false)} 
        onSuccess={() => {
          setAddVisible(false);
        //   handleQueryUserList();
        }}
      />
            <h1>用户中心</h1>
        </div>
    );
}
 

  const AddUserModel=(props:Props)=>{
    const { visible, onClose, onSuccess } = props;
    const [form] = Form.useForm();
    const roleOptions = Object.keys(ROLE_TYPE).map((key: Role) => ROLE_TYPE[key]);// Object.keys() 方法从 ROLE_TYPE 对象中提取所有的键，然后使用 map() 遍历这些键，通过键从 ROLE_TYPE 获取对应的值，构建一个角色选项数组 roleOptions
    const gradeOptions = Object.keys(GRADE_TYPE).map((key: Grade) => GRADE_TYPE[key]);  
    
   const handleConfirm = async ()=>{
      const [fromValues]=await (form.validateFields())
    }
    const handleConfirm = async () => {
      const [formValues] = await to(form.validateFields());    //表单的所有校验规则，获取验证后的表单值
      if (!formValues) return;                                //空直接返回不执行后面
      const [res] = await to(
        createUser({
          ...formValues,
          download_limit: GRADE_TYPE[formValues.grade as Grade].limit,      //下载限制规定为用户等级的限制
        })
      );
      if (res) {
        console.log('成功');
        onSuccess();
      } else {
            alert('错误')
      }
    };

    return ( //在对话框中加入表单
    <Modal
      destroyOnClose             //关闭时销毁 Modal 里的子元素
      visible={visible}
      title="新增账号"
      onCancel={onClose}
      onOk={handleConfirm}     //点击回调
    >
      <Form
        name="basic"
        autoComplete="on"             //自动提示
        preserve={false}              //当字段被删除时保留字段值。你可以通过 getFieldsValue(true) 来获取保留字段值
        labelCol={{ span: 5 }}       //前面长度占份数
        wrapperCol={{ span: 28 }}    //输入框长度占份数
        form={form}
      >
        <Form.Item
          label="昵称"
          name="name"     //输入值
          rules={[{ required: true, message: "输入昵称", max: 50 }]}
        >
          <Input size="large" placeholder="请输入" maxLength={50} />
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
          rules={[{ required: true, message: "请选择" }]}
        >
          <Select allowClear placeholder="请选择">      
          {/* allowClear自定义清除按钮 */}
            {roleOptions.map((item) => (             //自己定义的键值对遍历到下拉选择框中
              <Option key={item.key} value={item.key}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="用户等级"
          name="grade"
          rules={[{ required: true, message: "请选择" }]}
        >
          <Select allowClear placeholder="请选择">
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
};
export default User;