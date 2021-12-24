import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Descriptions } from 'antd'

import { getOrderListAction } from '../../../../redux/actions'

import * as S from './styles'

const AddressBook = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  const { orderList } = useSelector((state) => state.orderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderListAction({ id: userInfo.data.id }))
  }, [userInfo.data])

  const addressBook = orderList.data.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.address === value.address
      && t.ward === value.ward
      && t.district === value.district
      && t.city === value.city
    ))
  )

  const renderAddressBook = addressBook.map((item) => {
    return (
      <div key={item.id}>
        <S.Card>
          <Card size="small" title={<>Tên người nhận: {item.name}</>}>
            <Descriptions colon={false} bordered>
              <Descriptions.Item span={3} label="Số điện thoại">{item.phone}</Descriptions.Item>
              <Descriptions.Item span={3} label="Địa chỉ">
                {item.address}, {item.ward}, {item.district}, {item.city}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </S.Card>
      </div>
    )
  })

  return (
    <S.AddressBook>
      <Card title="Sổ địa chỉ">
        {renderAddressBook}
      </Card>
    </S.AddressBook>
  )
}

export default AddressBook
