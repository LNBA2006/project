import { useEffect } from 'react'
import { Table, Tag, Descriptions, Button, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath } from 'react-router-dom'
import moment from 'moment'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ROUTER } from '../../../../constants'

import { getOrderListAction } from '../../../../redux/actions'

import * as S from './styles'

const OrderList = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  const { orderList } = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListAction({ id: userInfo.data.id }))
    }
  }, [userInfo.data])

  const tableColumn = [
    {
      title: 'Mã đơn hàng',
      key: 'id',
      dataIndex: 'id',
      width: '15%'
    },
    {
      title: 'Ngày mua',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text, record) => moment(text).format('DD/MM/YYYY HH:mm'),
      width: '15%'
    },
    {
      title: 'Các sản phẩm',
      key: 'products',
      dataIndex: 'products',
      render: (text, record) => text.map((item) => {
        return (
          <>
            <S.ProductList>{item.name}</S.ProductList>
            <span> x {item.quantity}, </span>
          </>
        )
      }),
      ellipsis: true
    },
    {
      title: 'Tổng tiền',
      key: 'priceAfterDiscount',
      dataIndex: 'priceAfterDiscount',
      render: (text, record) => `${text.toLocaleString()}₫`,
      width: '15%',
      align: 'right'
    },
    {
      title: 'Tình trạng',
      key: 'payment',
      dataIndex: 'payment',
      render: (text, record) => text === 'cod'
        ? <Tag color="red">Chưa thanh toán</Tag>
        : <Tag color="blue">Đã thanh toán</Tag>,
      width: '20%',
      align: 'right'
    }
  ]

  const tableData = orderList.data.map((item) => ({
    ...item,
    key: item.id
  }))

  const expandedRowRender = (record) => {
    const subColumn = [
      {
        title: 'Mã sản phẩm',
        key: 'id',
        dataIndex: 'id',
        width: '15%',
      },
      {
        title: 'Tên sản phẩm',
        key: 'product',
        dataIndex: 'product',
        render: (text, record) => (
          <S.Product onClick={() => navigate(generatePath(ROUTER.PRODUCT_DETAIL, { id: record.id }))}>
            {text}
          </S.Product>
        )
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'quantity',
        width: '15%',
      },
      {
        title: 'Giá',
        key: 'price',
        dataIndex: 'price',
        render: (text, record) => `${text.toLocaleString()}₫`,
        width: '15%',
        align: 'right'
      },
      {
        title: 'Thành tiền',
        key: 'intoMoney',
        dataIndex: 'intoMoney',
        render: (text, record) => `${text.toLocaleString()}₫`,
        width: '15%',
        align: 'right'
      }
    ]

    const subData = record.products.map((item) => ({
      key: item.id,
      id: item.id,
      product: item.name,
      quantity: item.quantity,
      price: item.price,
      intoMoney: item.price * item.quantity
    }))

    return (
      <Table
        columns={subColumn}
        dataSource={subData}
        pagination={false} size="small"
        footer={() => (
          <S.TableFooter>
            <Descriptions layout="horizontal">
              {record.discountValue && (
                <>
                  <Descriptions.Item label="Tạm tính" span={3}>
                    {record.totalPrice.toLocaleString()}₫
                  </Descriptions.Item>
                  <Descriptions.Item label="Giảm giá" span={3}>
                    {record.discountValue}%
                  </Descriptions.Item>
                </>
              )}
              <Descriptions.Item label="Tổng cộng" span={3}>
                {record.priceAfterDiscount.toLocaleString()}₫
              </Descriptions.Item>
            </Descriptions>
          </S.TableFooter>
        )}
      />
    )
  }

  return (
    <S.OrderList>
      <Card title="Lịch sử đơn hàng">
        <Table
          columns={tableColumn}
          dataSource={tableData}
          expandable={{ expandedRowRender }}
          pagination={false}
          scroll={{ x: true }}
          locale={{
            emptyText: (
              <S.Empty>
                <AiOutlineShoppingCart />
                <div>Danh sách đơn hàng trống</div>
                <div>
                  <Button
                    type="primary"
                    danger
                    onClick={() => navigate(ROUTER.PRODUCT_LIST)}
                  >
                    Mua ngay
                  </Button>
                </div>
              </S.Empty>
            )
          }}
        />
      </Card>
    </S.OrderList>
  )
}

export default OrderList
