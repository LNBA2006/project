import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Form, Space, Radio, Button, Descriptions, Input } from 'antd'
import { FaMotorcycle, FaPlane, FaMoneyBillAlt, FaCreditCard, FaCcVisa } from 'react-icons/fa'
import moment from 'moment'

import { orderCartAction } from '../../../../redux/actions'

import * as S from './styles'

const Payment = ({ setCheckoutStep }) => {
  const { orderInfo } = useSelector((state) => state.orderReducer)
  const { userInfo } = useSelector((state) => state.authReducer)
  const { selectedCarts } = useSelector((state) => state.cartReducer)
  const { discountInfo } = useSelector((state) => state.discountReducer)
  const dispatch = useDispatch()

  const [paymentForm] = Form.useForm()

  const handleConfirmPayment = (value) => {
    const newValues = {
      ...orderInfo,
      ...value,
      userId: userInfo.data.id,
      products: selectedCarts.map((cartItem) => {
        return {
          id: cartItem.product.id,
          cartId: cartItem.id,
          name: cartItem.product.name,
          price: cartItem.product.price,
          quantity: cartItem.quantity
        }
      }),
      totalPrice,
      discountValue: discountInfo.data.code ? discountInfo.data.discountValue : 0,
      priceAfterDiscount: discountInfo.data.code
        ? totalPrice - (totalPrice * discountInfo.data.discountValue) / 100
        : totalPrice
    }
    dispatch(orderCartAction({
      data: newValues,
      callback: {
        success: () => setCheckoutStep(3)
      }
    }))
  }

  const renderBill = selectedCarts.map((item) => {
    return (
      <Descriptions column={6} key={item.id}>
        <Descriptions.Item span={3}>{item.product.name}</Descriptions.Item>
        <Descriptions.Item span={1}>x {item.quantity}</Descriptions.Item>
        <Descriptions.Item span={2}>
          {(item.product.price * item.quantity).toLocaleString()}₫
        </Descriptions.Item>
      </Descriptions>
    )
  })

  let totalPrice = 0
  selectedCarts.forEach((item) => totalPrice += item.product.price * item.quantity)

  return (
    <S.Payment>
      <Row gutter={16}>
        <Col span={24} md={16}>
          <Card title="Chọn hình thức giao hàng" size="small">
            <Form
              layout="vertical"
              form={paymentForm}
              onFinish={(value) => handleConfirmPayment(value)}
            >
              <Form.Item name="ship" initialValue="giaohangtietkiem">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="giaohangtietkiem"><FaMotorcycle />Giao hàng tiết kiệm</Radio>
                    <Radio value="giaohangnhanh"><FaPlane />Giao hàng nhanh</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Chọn hình thức thanh toán" size="small">
            <Form
              layout="vertical"
              form={paymentForm}
              onFinish={(value) => handleConfirmPayment(value)}
            >
              <Form.Item name="payment" initialValue="cod">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="cod"><FaMoneyBillAlt />Thanh toán tiền mặt khi nhận hàng</Radio>
                    <Radio value="atm"><FaCreditCard />Thẻ ATM nội địa/Internet Banking</Radio>
                    <Radio value="visa"><FaCcVisa />Thanh toán bằng thẻ quốc tế VISA</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item shouldUpdate>
                {({ getFieldValue }) =>
                  getFieldValue('payment') === 'atm' ? (
                    <>
                      <Form.Item name="bank" label="Ngân hàng" rules={[{
                        required: true,
                        message: 'Bạn chưa chọn ngân hàng'
                      }]}>
                        <Radio.Group>
                          <Radio.Button value="acb">
                            <img
                              src="https://salt.tikicdn.com/assets/img/zalopaygw/ACB.jpg"
                              alt="ACB"
                              width={120}
                              height={52}
                            />
                          </Radio.Button>
                          <Radio.Button value="eib">
                            <img
                              src="https://salt.tikicdn.com/assets/img/zalopaygw/EIB.jpg"
                              alt="EIB"
                              width={120}
                              height={52}
                            />
                          </Radio.Button>
                          <Radio.Button value="tcb">
                            <img
                              src="https://salt.tikicdn.com/assets/img/zalopaygw/TCB.jpg"
                              alt="TCB"
                              width={120}
                              height={52}
                            />
                          </Radio.Button>
                          <Radio.Button value="vcb">
                            <img
                              src="https://salt.tikicdn.com/assets/img/zalopaygw/VCB.jpg"
                              alt="VCB"
                              width={120}
                              height={52}
                            />
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="cardholderName" label="Tên chủ thẻ ATM" validateFirst rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Bạn chưa nhập tên chủ thẻ'
                        },
                        {
                          pattern: /^[A-Z ]+$/,
                          message: 'Tên chủ thẻ không hợp lệ'
                        }
                      ]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="cardNumber" label="Số thẻ ATM" validateFirst rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Bạn chưa nhập số thẻ'
                        },
                        {
                          pattern: /^[0-9]{8,16}$/,
                          message: 'Số thẻ không hợp lệ'
                        }
                      ]}>
                        <Input />
                      </Form.Item>
                    </>
                  ) : null
                }
              </Form.Item>
              <Form.Item shouldUpdate>
                {({ getFieldValue }) =>
                  getFieldValue('payment') === 'visa' ? (
                    <Row gutter={8}>
                      <Col span={24} lg={12}>
                        <Form.Item name="cardNumber" label="Số thẻ VISA" validateFirst rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Bạn chưa nhập số thẻ'
                          },
                          {
                            pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
                            message: 'Thẻ không hợp lệ'
                          }
                        ]}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={6}>
                        <Form.Item name="cvv" label="Mã bảo mật CVV" validateFirst rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Bạn chưa nhập mã bảo mật CVV'
                          },
                          {
                            pattern: /^[0-9]{3,4}$/,
                            message: 'Mã bảo mật CVV không hợp lệ'
                          }
                        ]}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={6}>
                        <Form.Item name="expiry" label="Hạn sử dụng của thẻ" validateFirst rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Bạn chưa nhập hạn sử dụng của thẻ'
                          },
                          {
                            pattern: /^(?:0[1-9]|1[0-2])\/[0-9]{2}$/,
                            message: 'Hạn sử dụng thẻ của bạn không hợp lệ'
                          },
                          {
                            validator(_, value) {
                              const expiry = moment(value, 'MM/YY').unix()
                              const now = moment().startOf('month').unix()
                              if (expiry < now) {
                                return Promise.reject(new Error('Thẻ của bạn đã hết hạn sử dụng'))
                              } else {
                                return Promise.resolve()
                              }
                            }
                          }
                        ]}>
                          <Input placeholder={moment().format('MM/YY')} />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Thông tin người nhận" size="small">
            {/* <div>{orderInfo.name}</div>
            <div>{orderInfo.address}, {orderInfo.ward}, {orderInfo.district}, {orderInfo.city}</div>
            <div>Số điện thoại: {orderInfo.phone}</div> */}
            <Descriptions>
              <Descriptions.Item span={3} label="Tên">
                <div>{orderInfo.name}</div>
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Địa chỉ">
                <div>{orderInfo.address}, {orderInfo.ward}, {orderInfo.district}, {orderInfo.city}</div>
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Số điện thoại">
                <div>{orderInfo.phone}</div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Đơn hàng" size="small" extra={`${selectedCarts.length} sản phẩm`}>
            {renderBill}
            <Card.Meta description={
              <Descriptions>
                <Descriptions.Item span={3} label="Tạm tính">
                  <div>{totalPrice.toLocaleString()}₫</div>

                </Descriptions.Item>
                <Descriptions.Item span={3} label="Giảm giá">
                  <div>{discountInfo.data.code ? `${discountInfo.data.discountValue}%` : '0₫'}</div>

                </Descriptions.Item>
                <Descriptions.Item span={3} label="Tổng cộng">
                  <div>
                    {discountInfo.data.code
                      ? ` ${(totalPrice - (totalPrice * discountInfo.data.discountValue) / 100).toLocaleString()}₫`
                      : ` ${totalPrice.toLocaleString()}₫`
                    }
                  </div>
                </Descriptions.Item>
              </Descriptions>
            }>
            </Card.Meta>
          </Card>
        </Col>
      </Row>
      <Row justify="center" gutter={8}>
        <Col>
          <Button onClick={() => setCheckoutStep(1)}>Quay lại</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => paymentForm.submit()}>Thanh toán</Button>
        </Col>
      </Row>
    </S.Payment>
  )
}

export default Payment
