import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'

import { ROUTER } from '../../constants'
import { loginAction } from '../../redux/actions'

import * as S from './styles'

const LoginPage = () => {
  const navigate = useNavigate()

  const { responseAction } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const [loginForm] = Form.useForm()

  if (responseAction.login?.error) {
    loginForm.setFields([
      {
        name: 'email',
        errors: [responseAction.login.error]
      },
      {
        name: 'password',
        errors: [responseAction.login.error]
      }
    ])
  }

  const handleSubmit = (value) => {
    dispatch(loginAction({
      data: {
        email: value.email,
        password: value.password
      },
      callback: {
        redirectHome: () => navigate(ROUTER.HOME)
      }
    }))
  }

  return (
    <>
      <S.Form>
        <Form form={loginForm} layout="vertical" onFinish={(value) => handleSubmit(value)}>
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
          <Form.Item name="rememberMe" valuePropName="checked" initialValue={true}>
            <Checkbox>Ghi nhớ tài khoản</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={responseAction.login.loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </S.Form>
      <S.Redirect>
        Bạn chưa có tài khoản?
        <S.Link onClick={() => navigate(ROUTER.REGISTER)}>Đăng ký</S.Link>
      </S.Redirect>
    </>
  )
}

export default LoginPage
