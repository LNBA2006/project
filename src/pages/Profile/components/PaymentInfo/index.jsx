import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Descriptions } from 'antd'

import { getOrderListAction } from '../../../../redux/actions'

import * as S from './styles'

const PaymentInfo = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  const { orderList } = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderListAction({ id: userInfo.data.id }))
  }, [userInfo.data])

  const paymentInfo = orderList.data.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.payment !== 'cod'
      && t.payment === value.payment
      && t.cardNumber === value.cardNumber
    ))
  )

  const renderPaymentInfo = paymentInfo.map((item) => {
    return (
      <div key={item.id}>
        {item.payment === 'visa'
          ? (
            <S.Card>
              <Card size="small" title="Thẻ VISA">
                <Descriptions colon={false} bordered>
                  <Descriptions.Item span={3} label="Số thẻ">{item.cardNumber}</Descriptions.Item>
                  <Descriptions.Item span={3} label="Mã bảo mật CVV">{item.cvv}</Descriptions.Item>
                  <Descriptions.Item span={3} label="Ngày hết hạn">{item.expiry}</Descriptions.Item>
                </Descriptions>
              </Card>
            </S.Card>
          )
          : (
            <S.Card>
              <Card size="small" title="Thẻ ATM">
                <Descriptions colon={false} bordered>
                  <Descriptions.Item span={3} label="Ngân hàng">{item.bank.toUpperCase()}</Descriptions.Item>
                  <Descriptions.Item span={3} label="Số thẻ">{item.cardNumber}</Descriptions.Item>
                  <Descriptions.Item span={3} label="Tên chủ thẻ">{item.cardholderName}</Descriptions.Item>
                </Descriptions>
              </Card>
            </S.Card>
          )
        }
      </div>
    )
  })

  return (
    <S.PaymentInfo>
      <Card title="Thông tin thanh toán">
        {renderPaymentInfo}
      </Card>
    </S.PaymentInfo>
  )
}

export default PaymentInfo
