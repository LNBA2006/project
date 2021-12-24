import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { Steps } from 'antd';
import { FaShoppingCart, FaUserCheck, FaMoneyCheck, FaCheck } from 'react-icons/fa'

import { ROUTER } from '../../constants'
import Breadcrumb from '../../components/Breadcrumb'
import { BREADCRUMB } from './constant'

import Checkout from './components/checkout';
import Info from './components/info';
import Payment from './components/payment';
import Success from './components/success';

import * as S from './styles'

const CartPage = () => {
  const [checkoutStep, setCheckoutStep] = useState(0)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userInfo) {
    return <Navigate to={ROUTER.HOME}/>
  }

  return (
    <>
      <Breadcrumb breadcrumb={BREADCRUMB} height="104px" />
      <S.CartWrapper>
        <Steps current={checkoutStep} size="small">
          <Steps.Step title="Giỏ hàng" icon={<FaShoppingCart />} />
          <Steps.Step title="Thông tin" icon={<FaUserCheck />} />
          <Steps.Step title="Thanh toán" icon={<FaMoneyCheck />} />
          <Steps.Step title="Hoàn tất" icon={<FaCheck />} />
        </Steps>
        {checkoutStep === 0 && <Checkout setCheckoutStep={setCheckoutStep} />}
        {checkoutStep === 1 && <Info setCheckoutStep={setCheckoutStep} />}
        {checkoutStep === 2 && <Payment setCheckoutStep={setCheckoutStep} />}
        {checkoutStep === 3 && <Success setCheckoutStep={setCheckoutStep} />}
      </S.CartWrapper>
    </>
  )
}

export default CartPage