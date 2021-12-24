import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import * as S from './styles'

const BreadcrumbContainer = ({ titlePage, breadcrumb = [], height }) => {
  const navigate = useNavigate()

  const renderBreadcrumb = () => {
    return breadcrumb.map((breadcrumbItem, breadcrumbIndex) => {
      return (
        <Breadcrumb.Item
          key={`breadcrumb-${breadcrumbIndex}`}
          // href=""
          onClick={(e) => {
            e.preventDefault()
            navigate(breadcrumbItem.path)}
          }
        >
          {breadcrumbItem.icon && breadcrumbItem.icon}
          {breadcrumbItem.title}
        </Breadcrumb.Item>
      )
    })
  }

  return (
    <S.BreadcrumbContainer height={height}>
      <Breadcrumb>
        {renderBreadcrumb()}
      </Breadcrumb>
      <S.BreadcrumbTitle>{titlePage}</S.BreadcrumbTitle>
    </S.BreadcrumbContainer>
  )
}

export default BreadcrumbContainer