import { useState, useEffect } from 'react'
import { Button, Card, Form, Input, Select, Space, Table, Image, Row, Col } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import {
  setOrderInfoAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction
} from '../../../../redux/actions'

import * as S from './styles'

const Info = ({ setCheckoutStep }) => {
  const { selectedCarts } = useSelector((state) => state.cartReducer)
  const { orderInfo } = useSelector((state) => state.orderReducer)
  const { cityList, districtList, wardList } = useSelector((state) => state.commonReducer)
  const { discountInfo } = useSelector((state) => state.discountReducer)
  const dispatch = useDispatch()

  const [districtOption, setDistrictOption] = useState([])
  const [wardOption, setWardOption] = useState([])

  useEffect(() => {
    dispatch(getCityListAction())
    dispatch(getDistrictListAction())
    dispatch(getWardListAction())
  }, [])

  const [infoForm] = Form.useForm()

  const handleConfirmInfo = (values) => {
    const city = cityList.data.find((city) => city.code === values.city)
    const district = districtOption.find((district) => district.code === values.district)
    const ward = wardOption.find((ward) => ward.code === values.ward)
    const newValues = {
      ...values,
      city: city.name,
      district: district.name,
      ward: ward.name
    }
    dispatch(setOrderInfoAction(newValues))
    setCheckoutStep(2)
  }

  const tableColumn = [
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name',
      render: (text, record) => (
        <Space size={16}>
          <Image src={record.image} alt={text} width={86} height={48} />
          <div>{text}</div>
        </Space>
      )
    },
    {
      title: 'Đơn giá',
      key: 'price',
      dataIndex: 'price',
      render: (text, record) => `${text.toLocaleString()}₫`
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Thành tiền',
      key: 'intoMoney',
      dataIndex: 'intoMoney',
      render: (text, record) => `${text.toLocaleString()}₫`
    }
  ]

  const tableData = selectedCarts.map((item) => ({
    key: item.id,
    name: item.product.name,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
    intoMoney: item.product.price * item.quantity
  }))

  let totalPrice = 0
  selectedCarts.forEach((item) => totalPrice += item.product.price * item.quantity)

  const renderCityOption = cityList.data.map((city) => {
    return (
      <Select.Option key={city.id} value={city.code}>
        {city.name}
      </Select.Option>
    )
  })

  const renderDistrictOption = districtOption.map((district) => {
    return (
      <Select.Option key={district.id} value={district.code}>
        {district.name}
      </Select.Option>
    )
  })

  const renderWardOption = wardOption.map((ward) => {
    return (
      <Select.Option key={ward.id} value={ward.code}>
        {ward.name}
      </Select.Option>
    )
  })

  return (
    <S.InfoWrapper>
      <Card title="Thông tin đơn hàng" size="small">
        <Table
          size="small"
          scroll={{ x: true }}
          pagination={false}
          columns={tableColumn}
          dataSource={tableData}
          footer={() => (
            <>
              <div>Tạm tính: {totalPrice.toLocaleString()}₫</div>
              <div>Giảm giá: {discountInfo.data.code ? `${discountInfo.data.discountValue}%` : '0₫'}</div>
              <div>Tổng cộng: 
                {discountInfo.data.code
                  ? ` ${(totalPrice - (totalPrice * discountInfo.data.discountValue) / 100).toLocaleString()}₫`
                  : ` ${totalPrice.toLocaleString()}₫`
                }
              </div>
            </>
          )}
        />

      </Card>
      <Card title="Thông tin khách hàng" size="small">
        <Form
          form={infoForm}
          name="infoForm"
          layout="vertical"
          onFinish={(values) => handleConfirmInfo(values)}
        >
          <Form.Item
            label="Tên khách hàng"
            name="name"
            hasFeedback
            rules={[{
              required: true,
              whitespace: true,
              message: 'Bạn chưa nhập tên'
            }]}
            initialValue={orderInfo?.name}
          >
            <Input />
          </Form.Item>
          <Row gutter={8}>
            <Col span={24} sm={12}>
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
                initialValue={orderInfo?.email}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                hasFeedback
                validateFirst
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Bạn chưa nhập số điện thoại'
                  },
                  {
                    pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                    message: 'Số điện thoại không đúng định dạng'
                  }
                ]}
                initialValue={orderInfo?.phone}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24} sm={8}>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="city"
                rules={[{
                  required: true,
                  message: 'Bạn chưa chọn tỉnh/thành phố'
                }]}
              >
                <Select
                  onChange={(value) => {
                    const newDistrictList = districtList.data.filter(
                      (district) => district.parentcode === value
                    )
                    setDistrictOption(newDistrictList)
                  }}
                >
                  {renderCityOption}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} sm={8}>
              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[{
                  required: true,
                  message: 'Bạn chưa chọn quận/huyện'
                }]}
              >
                <Select
                  onChange={(value) => {
                    const newWardList = wardList.data.filter(
                      (ward) => ward.parentcode === value
                    )
                    setWardOption(newWardList)
                  }}
                >
                  {renderDistrictOption}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} sm={8}>
              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[{
                  required: true,
                  message: 'Bạn chưa chọn phường/xã'
                }]}
              >
                <Select>
                  {renderWardOption}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Địa chỉ cụ thể"
            name="address"
            hasFeedback
            rules={[{
              required: true,
              whitespace: true,
              message: 'Bạn chưa nhập địa chỉ'
            }]}
            initialValue={orderInfo?.address}
          >
            <Input />
          </Form.Item>
        </Form>
      </Card>
      <Row justify="center" gutter={8}>
        <Col>
          <Button onClick={() => setCheckoutStep(0)}>Quay lại</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => infoForm.submit()}>Tiếp tục</Button>
        </Col>
      </Row>
    </S.InfoWrapper>
  )
}

export default Info
