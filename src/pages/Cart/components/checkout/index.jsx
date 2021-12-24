import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath } from 'react-router-dom'
import {
  Checkbox,
  Button,
  Input,
  Table,
  Space,
  Image,
  Row,
  Col,
  Descriptions,
  notification,
  Card,
  Tag,
  Empty
} from 'antd'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import {
  updateCartProductAction,
  removeCartProductAction,
  setSelectedCartsAction,
  checkDiscountAction
} from '../../../../redux/actions'

import { ROUTER, COLOR } from '../../../../constants'

import * as S from './styles'

const Checkout = ({ setCheckoutStep }) => {
  const [discountCode, setDiscountCode] = useState("")

  const { userInfo } = useSelector((state) => state.authReducer)
  const { cartList, selectedCarts } = useSelector((state) => state.cartReducer)
  const { discountInfo } = useSelector((state) => state.discountReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSelectCart = (e, item) => {
    const { checked } = e.target
    if (checked) {
      dispatch(setSelectedCartsAction([
        ...selectedCarts,
        cartList.data.find((cart) => cart.id === item.id)
      ]))
    } else {
      const newSelectedCarts = selectedCarts.filter((selectedCart) => selectedCart.id !== item.id)
      dispatch(setSelectedCartsAction(newSelectedCarts))
    }
  }

  const handleSelectAll = (e) => {
    const { checked } = e.target
    if (checked) {
      dispatch(setSelectedCartsAction(cartList.data))
    } else {
      dispatch(setSelectedCartsAction([]))
    }
  }

  const handleCheckDiscount = () => {
    dispatch(checkDiscountAction({ code: discountCode }))
  }

  const handleComfirmCart = () => {
    const newSelectCarts = []
    if (!selectedCarts.length) {
      notification.error({
        message: 'Bạn chưa chọn sản phẩm để mua'
      })
    } else {
      setCheckoutStep(1)
      cartList.data.forEach((cartItem) => {
        selectedCarts.forEach((selectCartItem) => {
          if (cartItem.id === selectCartItem.id) {
            newSelectCarts.push(cartItem)
          }
        })
      })
      dispatch(setSelectedCartsAction(newSelectCarts))
    }
  }

  let totalPrice = 0
  cartList.data.forEach((cartItem) => {
    selectedCarts.forEach((selectCartItem) => {
      if (cartItem.id === selectCartItem.id) {
        totalPrice += cartItem.product.price * cartItem.quantity
      }
    })
  })

  const tableColumn = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e)}
          indeterminate={selectedCarts.length > 0 && selectedCarts.length < cartList.data.length}
          checked={selectedCarts.length === cartList.data.length}
          disabled={!cartList.data.length}
        />
      ),
      render: (text, record) => (
        <Checkbox
          onChange={(e) => handleSelectCart(e, record)}
          checked={selectedCarts.findIndex((item) => item.id === record.id) !== -1}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name',
      render: (text, record) => (
        <Space size={16}>
          <Image width={86} height={48} src={record.image[0]} />
          <S.Product onClick={() => navigate(generatePath(ROUTER.PRODUCT_DETAIL, { id: record.productId }))}>
            {text}
          </S.Product>
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
      render: (text, record) => (
        <Space size={0}>
          <Button
            onClick={() => {
              dispatch(updateCartProductAction({
                data: {
                  id: record.id,
                  quantity: record.quantity - 1
                }
              }))
            }}
            icon={<FaMinus />}
            disabled={text <= 1}
          />
          <Input value={text} />
          <Button
            onClick={() => {
              dispatch(updateCartProductAction({
                data: {
                  id: record.id,
                  quantity: record.quantity + 1
                }
              }))
            }}
            icon={<FaPlus />}
          />
        </Space>
      )
    },
    {
      title: 'Thành tiền',
      key: 'intoMoney',
      dataIndex: 'intoMoney',
      render: (text, record) => `${text.toLocaleString()}₫`
    },
    {
      title: <Row justify="center"><FaTrash /></Row>,
      key: 'delete',
      render: (text, record) => (
        <Button type="text">
          <FaTrash onClick={() => dispatch(removeCartProductAction({ id: record.id }))} />
        </Button>
      )
    }
  ]

  const tableData = cartList.data.map((item) => ({
    key: item.product.id,
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    image: item.product.image,
    price: item.product.price,
    quantity: item.quantity,
    intoMoney: item.product.price * item.quantity,
  }))

  return (
    <Row>
      <Col span={24} md={18}>
        <S.CartContainer>
          <Table
            size="small"
            scroll={{ x: true }}
            columns={tableColumn}
            dataSource={tableData}
            pagination={false}
            locale={{
              emptyText: (
                <>
                  <AiOutlineShoppingCart />
                  <div>Giỏ hàng trống</div>
                  <div>
                    <Button
                      type="primary"
                      danger
                      onClick={() => navigate(ROUTER.PRODUCT_LIST)}
                    >
                      Mua ngay
                    </Button>
                  </div>
                </>
              )
            }}
          />
        </S.CartContainer>
      </Col>
      <Col span={24} md={6}>
        <S.BillWrapper>
          <Row gutter={8}>
            <Col sm={12} md={24}>
              <Card
                title="Mã giảm giá"
                size="small"
                extra={discountInfo.data.code && (
                  <Tag color={COLOR.blue3}>{discountInfo.data.discountValue}%</Tag>
                )}
              >
                <Row>
                  <Col span={24}>
                    <Input onChange={(e) => setDiscountCode(e.target.value)} />
                  </Col>
                  <Col span={24}>
                    <Button onClick={() => handleCheckDiscount()}>Nhập</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm={12} md={24}>
              <Card title="Hóa đơn thanh toán" size="small">
                <Descriptions layout="horizontal">
                  <Descriptions.Item label="Tạm tính" span={3}>
                    {totalPrice.toLocaleString()}₫
                  </Descriptions.Item>
                  <Descriptions.Item label="Giảm giá" span={3}>
                    {discountInfo.data.code ? `${discountInfo.data.discountValue}%` : '0₫'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng cộng" span={3}>
                    {discountInfo.data.code
                      ? `${(totalPrice - (totalPrice * discountInfo.data.discountValue) / 100).toLocaleString()}₫`
                      : `${totalPrice.toLocaleString()}₫`
                    }
                  </Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={() => handleComfirmCart()}>Tiếp tục</Button>
              </Card>
            </Col>
          </Row>
        </S.BillWrapper>
      </Col>
    </Row>
  )
}

export default Checkout
