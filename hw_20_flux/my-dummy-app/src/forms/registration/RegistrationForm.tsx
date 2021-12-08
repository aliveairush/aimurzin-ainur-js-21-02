import React, { ChangeEvent, useState } from 'react';
import {
  Button, DatePicker, Form, Input, Select,
} from 'antd';
import './RegistrationForm.scss';
import { useNavigate } from 'react-router-dom';
import { postCreateUser } from '../../api/dummyApi';
import { Gender, IUserRegistrationFormType } from '../../types/dummyApiResponses';

const { Option } = Select;

// Source https://emailregex.com/
const emailRegex = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:'
  + '[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:'
  + '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9'
  + ']|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-'
  + '\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

const renderEmailInput = (updateEmail : (e: ChangeEvent<HTMLInputElement>) => void) => (
  <Form.Item
    name="email"
    label="E-mail"
    hasFeedback
    rules={[
      { required: true, message: 'Please enter you Email' },
      { pattern: new RegExp(emailRegex), message: 'Please check if your email address is correct' },
    ]}
  >
    <Input
      onChange={(e) => updateEmail(e)}
    />
  </Form.Item>
);

const renderFirstNameInput = (updateFirstname : (e: ChangeEvent<HTMLInputElement>) => void) => (
  <Form.Item
    required
    name="firstName"
    label="Firstname"
    hasFeedback
    rules={[
      { required: true, message: 'Please enter your first name' },
      { min: 2, message: 'Minimal length 2 symbols ' },
      { max: 50, message: 'Maximum length 50 simbols ' }]}
  >
    <Input onChange={((e) => updateFirstname(e))} />
  </Form.Item>
);

const renderLastNameInput = (updateLastName : (e: ChangeEvent<HTMLInputElement>) => void) => (
  <Form.Item
    name="lastName"
    label="Lastname"
    hasFeedback
    rules={[
      { required: true, message: 'Please enter your last name' },
      { whitespace: true, message: 'Please enter your last name' },
      { min: 2, message: 'Minimal length 2 symbols ' },
      { max: 50, message: 'Maximum length 50 simbols ' }]}
  >
    <Input onChange={((e) => updateLastName(e))} />
  </Form.Item>
);

const RegistrationForm = () => {
  const [userForm, setUserForm] = useState({
    picture: 'https://randomuser.me/api/portraits/women/58.jpg',
  } as IUserRegistrationFormType);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
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

  const navigate = useNavigate();

  const onFormSubmit = () => {
    postCreateUser(userForm, (resp) => {
      navigate(`/user/${resp.id}`);
    }, (error) => {
      alert(error);
    }, () => {});
  };

  return (
    <Form
      onFinish={onFormSubmit}
      wrapperCol={formItemLayout.wrapperCol}
      labelCol={formItemLayout.labelCol}
      className="registration-form"
      fields={[
        { name: ['picture'], value: userForm.picture },
      ]}
    >

      {renderEmailInput(
        (e : ChangeEvent<HTMLInputElement>) => setUserForm({ ...userForm, email: e.target.value }),
      )}
      {renderFirstNameInput(
        (e : ChangeEvent<HTMLInputElement>) => setUserForm({ ...userForm, firstName: e.target.value }),
      )}
      {renderLastNameInput(
        (e : ChangeEvent<HTMLInputElement>) => setUserForm({ ...userForm, lastName: e.target.value }),
      )}
      {/* { Остальные инпуты не так много занимают кода поэтому решил не выносить в константы} */}
      <Form.Item name="phone" label="Phone" rules={[{ min: 5, message: 'Minimal length 5 symbols ' }]}>
        <Input onChange={((e) => setUserForm({ ...userForm, phone: e.target.value }))} />
      </Form.Item>

      <Form.Item name="dateOfBirth" label="Date of birth">
        <DatePicker
          disabledDate={(current) => current.valueOf() > Date.now()}
          onChange={((date) => {
            setUserForm({ ...userForm, dateOfBirth: date ? date.valueOf().toString() : '' });
          })}
        />
      </Form.Item>

      <Form.Item name="gender" label="Gender">
        <Select
          placeholder="Select gender"
          // onSelect={(e) => setUserForm({ ...userForm, gender: e ? Gender[e.valueOf().toString() as keyof Gender] : Gender.OTHER })}
          onSelect={(e) => {
            setUserForm({ ...userForm, gender: e ? Gender[e.valueOf() as keyof Gender] : Gender.nothing });
          }}
        >
          {Object.values(Gender)
            .map((value, index) => <Option key={index} value={value}>{value}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item name="picture" label="Picture">
        <Input onChange={((e) => setUserForm({ ...userForm, picture: e.target.value }))} />
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
