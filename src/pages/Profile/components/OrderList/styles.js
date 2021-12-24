import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const OrderList = styled.div`
  .ant-card .ant-card-head {
    background-color: ${COLOR.gray3};
    text-align: center;
  }
  .ant-card .ant-card-body {
    padding: 8px;
  }
`
export const ProductList = styled.span`
  font-weight: 500;
`
export const Product = styled.div`
  cursor: pointer;
  transition: all 0.4s ease 0s;
  &:hover {
    color: ${COLOR.blue3}
  }
`
export const TableFooter = styled.div`
  & .ant-descriptions-item-content {
    justify-content: flex-end;
    font-weight: 500;
  }
  & {
    position: relative;
    &::after {
      position: absolute;
      content: '';
      top: -8px;
      right: -8px;
      width: 128px;
      height: 100%;
      border-top: 1px solid ${COLOR.gray10}
    }
  }
`
export const Empty = styled.div`
  & > svg {
    font-size: 48px;
  }
  & div button {
    margin-top: 16px;
    border-radius: 8px;
  }
`