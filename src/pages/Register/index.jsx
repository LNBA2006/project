import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Checkbox } from 'antd'

import { ROUTER } from '../../constants'
import { registerAction } from '../../redux/actions'

import * as S from './styles'

const RegisterPage = () => {
  const navigate = useNavigate()

  const { responseAction } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const [registerForm] = Form.useForm()

  // useEffect(() => {
  if (responseAction.register?.error) {
    registerForm.setFields([{
      name: 'email',
      errors: [responseAction.register.error]
    }])
  }
  // }, [responseAction.register.error])

  const handleSubmit = (value) => {
    dispatch(registerAction({
      data: {
        username: value.username,
        email: value.email,
        gender: value.gender,
        password: value.password,
        term: value.term
      },
      callback: {
        redirectLogin: () => navigate(ROUTER.LOGIN)
      }
    }))
  }

  return (
    <>
      <S.Form>
        <Form form={registerForm} layout="vertical" onFinish={(value) => handleSubmit(value)}>
          <Form.Item
            label="Tên"
            name="username"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Bạn chưa nhập tên'
              },
              {
                min: 4,
                message: 'Độ dài tên phải bằng hoặc lớn hơn 4 kí tự'
              },
              {
                max: 20,
                message: 'Độ dài tên phải bằng hoặc nhỏ hơn 20 kí tự'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Bạn chưa nhập email'
              },
              {
                type: 'email',
                message: 'Email không đúng định dạng'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Bạn chưa chọn giới tính'
              }
            ]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Bạn chưa nhập mật khẩu'
              },
              {
                min: 6,
                message: 'Độ dài mật khẩu phải bằng hoặc lớn hơn 6 kí tự'
              },
              {
                max: 24,
                message: 'Độ dài mật khẩu phải bằng hoặc nhỏ hơn 24 kí tự'
              }
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="rePassword"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Bạn chưa xác nhận mật khẩu'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="term" valuePropName="checked" rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các điều khoản'))
            }
          ]}>
            <Checkbox>Đồng ý với các điều khoản</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={responseAction.register.loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </S.Form>
      <S.Redirect>
        Bạn đã có tài khoản?
        <S.Link onClick={() => navigate(ROUTER.LOGIN)}>Đăng nhập</S.Link>
      </S.Redirect>
    </>
  )
}

export default RegisterPage
