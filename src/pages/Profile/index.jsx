import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Avatar } from 'antd'
import { FaRegUser, FaInfo, FaListUl, FaThumbsUp, FaAddressBook, FaMoneyCheck, FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { ROUTER } from '../../constants'
import BreadcrumbContainer from '../../components/Breadcrumb'
import { BREADCRUMB } from './constant'

import OrderList from './components/OrderList'
import PersonalInfo from './components/PersonalInfo'
import FavoriteProducts from './components/FavoriteProducts'
import AddressBook from './components/AddressBook'
import PaymentInfo from './components/PaymentInfo'

import * as S from './styles'

const ProfilePage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.authReducer)

  const userData = JSON.parse(localStorage.getItem('userInfo'))
  if (!userData) {
    return <Navigate to={ROUTER.HOME} />
  }


  return (
    <>
      <BreadcrumbContainer breadcrumb={BREADCRUMB} />
      <S.ProfileWrapper>
        <S.SideTab>
          <Tabs
            tabPosition="left"
            defaultActiveKey={state ? state : 'personalInfo'}
            size="small"
            onTabClick={(key) => navigate(ROUTER.PROFILE, { state: key })}
            activeKey={state ? state : 'personalInfo'}
          >
            <Tabs.TabPane disabled tab={
              <S.UserSide>
                <Avatar icon={<FaRegUser />} />
                <S.UsernameSide>{userInfo.data.username}</S.UsernameSide>
              </S.UserSide>}>
            </Tabs.TabPane>
            <Tabs.TabPane key="personalInfo" tab={<><FaInfo /><span>Thông tin cá nhân</span></>}>
              <PersonalInfo />
            </Tabs.TabPane>
            <Tabs.TabPane key="orderList" tab={<><FaListUl /><span>Lịch sử đơn hàng</span></>}>
              <OrderList />
            </Tabs.TabPane>
            <Tabs.TabPane key="favoriteProducts" tab={<><FaThumbsUp /><span>Sản phẩm yêu thích</span></>}>
              <FavoriteProducts />
            </Tabs.TabPane>
            <Tabs.TabPane key="addressBook" tab={<><FaAddressBook /><span>Sổ địa chỉ</span></>}>
              <AddressBook />
            </Tabs.TabPane>
            <Tabs.TabPane key="paymentInfo" tab={<><FaMoneyCheck /><span>Thông tin thanh toán</span></>}>
              <PaymentInfo />
            </Tabs.TabPane>
          </Tabs>
        </S.SideTab>
        <S.TopTab>
          <Tabs
            defaultActiveKey={state ? state : 'personalInfo'}
            size="small"
            onTabClick={(key) => navigate(ROUTER.PROFILE, { state: key })}
            activeKey={state}
          >
            <Tabs.TabPane disabled tab={
              <S.UserTop>
                <Avatar icon={<FaRegUser />} />
                <S.UsernameTop>{userInfo.data.username}</S.UsernameTop>
              </S.UserTop>}>
            </Tabs.TabPane>
            <Tabs.TabPane key="personalInfo" tab={<><FaInfo /><span>Thông tin cá nhân</span></>}>
              <PersonalInfo />
            </Tabs.TabPane>
            <Tabs.TabPane key="orderList" tab={<><FaListUl /><span>Lịch sử đơn hàng</span></>}>
              <OrderList />
            </Tabs.TabPane>
            <Tabs.TabPane key="favoriteProducts" tab={<><FaThumbsUp /><span>Sản phẩm yêu thích</span></>}>
              <FavoriteProducts />
            </Tabs.TabPane>
            <Tabs.TabPane key="addressBook" tab={<><FaAddressBook /><span>Sổ địa chỉ</span></>}>
              <AddressBook />
            </Tabs.TabPane>
            <Tabs.TabPane key="paymentInfo" tab={<><FaMoneyCheck /><span>Thông tin thanh toán</span></>}>
              <PaymentInfo />
            </Tabs.TabPane>
          </Tabs>
        </S.TopTab>
      </S.ProfileWrapper>
    </>
  )
}

export default ProfilePage
