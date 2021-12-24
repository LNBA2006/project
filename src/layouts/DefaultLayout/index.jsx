import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackTop } from 'antd'
import { useSelector } from 'react-redux'

import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

import * as S from './styles'

const DefaultLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <S.Main>
        <BackTop />
        <Sidebar />
        <Outlet />
      </S.Main>
      <Footer />
    </>
  )
}

export default DefaultLayout