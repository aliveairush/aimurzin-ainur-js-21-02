import React, { useState } from 'react';
import {
  Form, Input, Button, DatePicker, Select,
} from 'antd';
import './RegistrationForm.scss';
import { postCreateUser } from '../../api/dummyApi';
import { Gender, IUserRegistrationFormType } from '../../types/dummyApiResponses';

const { Option } = Select;

const RegistrationForm = () => {
  const [userForm, setUserForm] = useState({
    picture: 'https://randomuser.me/api/portraits/women/58.jpg',
  } as IUserRegistrationFormType);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

  const onFormSubmit = () => {
    postCreateUser(userForm, (resp) => console.log(resp), () => {}, () => {});
  };

  return (
    <Form
      onFinish={onFormSubmit}
      wrapperCol={formItemLayout.wrapperCol}
      labelCol={formItemLayout.labelCol}
      className="registration-form"
    >
      <Form.Item name="email" label="E-mail">
        <Input onChange={((e) => setUserForm({ ...userForm, email: e.target.value }))} />
      </Form.Item>
      {/* TODO Validation length: 2-50 */}
      <Form.Item name="firstName" label="Firstname">
        <Input onChange={((e) => setUserForm({ ...userForm, firstName: e.target.value }))} />
      </Form.Item>
      {/* TODO Validation length: 2-50 */}
      <Form.Item name="lastName" label="Lastname">
        <Input onChange={((e) => setUserForm({ ...userForm, lastName: e.target.value }))} />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input onChange={((e) => setUserForm({ ...userForm, phone: e.target.value }))} />
      </Form.Item>
      <Form.Item name="dateOfBirth" label="Date of birth">
        <DatePicker onChange={((date) => {
          setUserForm({ ...userForm, dateOfBirth: date ? date.valueOf().toString() : '' });
        })}
        />
        {/* <Input  /> */}
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select autoClearSearchValue onSelect={(e) => console.log(e)} placeholder="Select gender">
          {Object.values(Gender)
            .map((value, index) => <Option key={index} value={value}>{value}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item name="picture" label="Picture">
        <Input defaultValue={userForm.picture} onChange={((e) => setUserForm({ ...userForm, picture: e.target.value }))} />
      </Form.Item>
      <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
