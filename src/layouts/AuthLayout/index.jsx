import { Outlet, Navigate, useLocation } from 'react-router'

import { ROUTER } from '../../constants'

import * as S from './styles'

const AuthLayout = () => {
  const { pathname } = useLocation()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (userInfo) {
    return <Navigate to={ROUTER.HOME} />
  }

  return (
    <S.Background position={pathname === '/register' ? 'flex-start' : 'flex-end'}>
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Background>
  )
}

export default AuthLayout
