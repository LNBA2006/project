import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, Menu, Badge } from 'antd'
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaInfo,
  FaListUl,
  FaThumbsUp,
  FaAddressBook,
  FaMoneyCheck,
  FaSignOutAlt
} from 'react-icons/fa'

import { NAVBAR_ITEMS, ROUTER } from '../../constants'
import { toggleSidebarAction, logoutAction } from '../../redux/actions'

import * as S from './styles'


const Header = () => {
  const { isShowSidebar } = useSelector((state) => state.commonReducer)
  const { userInfo } = useSelector((state) => state.authReducer)
  const { cartList } = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()


  const handleLogout = () => {
    dispatch(logoutAction())
    localStorage.removeItem('userInfo')
  }

  const navbarItems = () => {
    return NAVBAR_ITEMS.map((item, index) => {
      return (
        <S.NavLink
          key={index}
          onClick={() => navigate(item.path)}
          active={item.path === location.pathname}
        >
          {item.title}
        </S.NavLink>
      )
    })
  }

  return (
    <S.Header>
      <div className="logo">
        <a onClick={() => navigate(ROUTER.HOME)}>Vrooom</a>
      </div>
      <div className="nav-toggle" onClick={() => dispatch(toggleSidebarAction())}>
        {isShowSidebar ? <FaTimes /> : <FaBars />}
      </div>
      <S.NavBar>
        {navbarItems()}
      </S.NavBar>
      <div className="auth">
        <div>
          <Badge
            size="small"
            offset={[-10, 9]}
            count={cartList.data.length}
            onClick={() => navigate(ROUTER.CART)}
          >
            <Button type="text"><FaShoppingCart /></Button>
          </Badge>
        </div>
        <div>
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
                    Th??ng tin c?? nh??n
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<FaListUl />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'orderList' })}
                  >
                    L???ch s??? ????n h??ng
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<FaThumbsUp />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'favoriteProducts' })}
                  >
                    S???n ph???m y??u th??ch
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<FaAddressBook />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'addressBook' })}
                  >
                    S??? ?????a ch???
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    icon={<FaMoneyCheck />}
                    onClick={() => navigate(ROUTER.PROFILE, { state: 'paymentInfo' })}
                  >
                    Th??ng tin thanh to??n
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() => handleLogout()}
                    icon={<FaSignOutAlt />}
                  >
                    ????ng xu???t
                  </Menu.Item>
                </Menu>
              }
            >
              <div><Button type="text" icon={<FaUser />}>{userInfo.data.username}</Button></div>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTER.LOGIN)}>????ng nh???p</Button>
          )}
        </div>
      </div>
    </S.Header>
  )
}

export default Header
