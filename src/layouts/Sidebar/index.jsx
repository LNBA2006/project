import { useNavigate, useLocation } from 'react-router-dom'
import { NAVBAR_ITEMS } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, Menu, Drawer } from 'antd'
import {
  FaUser,
  FaInfo,
  FaListUl,
  FaThumbsUp,
  FaAddressBook,
  FaMoneyCheck,
  FaSignOutAlt
} from 'react-icons/fa'

import { ROUTER } from '../../constants'
import { logoutAction, toggleSidebarAction } from '../../redux/actions'

import * as S from './styles'

const Sidebar = () => {
  const { isShowSidebar } = useSelector((state) => state.commonReducer)
  const { userInfo } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logoutAction())
    localStorage.removeItem('userInfo')
  }

  const sidebarItems = () => {
    return NAVBAR_ITEMS.map((item, index) => {
      return (
        <S.SidebarItems
          key={index}
          onClick={() => navigate(item.path)}
          active={item.path === location.pathname || `/${item.path}` === location.pathname}
        >
          {item.title}
        </S.SidebarItems>
      )
    })
  }
  return (
    <S.Sidebar>
      <Drawer
        placement="left"
        visible={isShowSidebar}
        onClose={() => dispatch(toggleSidebarAction())}
        contentWrapperStyle={{ width: 260, height: 'calc(100vh - 64px)', marginTop: 64 }}
        headerStyle={{ display: 'none' }}
      >
        <S.Auth>
          {userInfo.data.username ? (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    icon={<FaInfo />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'personalInfo' })}
                  >
                    Thông tin cá nhân
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<FaListUl />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'orderList' })}
                  >
                    Lịch sử đơn hàng
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<FaThumbsUp />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'favoriteProducts' })}
                  >
                    Sản phẩm yêu thích
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<FaAddressBook />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'addressBook' })}
                  >
                    Sổ địa chỉ
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    icon={<FaMoneyCheck />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'paymentInfo' })}
                  >
                    Thông tin thanh toán
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() => handleLogout()}
                    icon={<FaSignOutAlt />}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              }
            >
              <div><Button type="text" icon={<FaUser />}>{userInfo.data.username}</Button></div>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTER.LOGIN)}>Đăng nhập</Button>
          )}
        </S.Auth>
        <S.SidebarWrapper>
          {sidebarItems()}
        </S.SidebarWrapper>
        <S.ImageWrapper>
        </S.ImageWrapper>
      </Drawer>
    </S.Sidebar >
  )
}

export default Sidebar