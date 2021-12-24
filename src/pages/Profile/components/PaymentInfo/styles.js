import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const PaymentInfo = styled.div`
  & > .ant-card > .ant-card-head {
    background-color: ${COLOR.gray3};
    text-align: center;
  }
  & > .ant-card > .ant-card-body {
    padding: 16px;
  }
  & > .ant-card > .ant-card-body > div:last-child > div {
    margin-bottom: 0px;
  }
`
export const Card = styled.div`
  margin-bottom: 16px;
  .ant-card .ant-card-head {
    background-color: ${COLOR.gray3};
  }
  .ant-card .ant-card-body .ant-descriptions table tbody tr th {
    width: 20%;
  }
`