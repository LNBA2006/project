import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const PersonalInfo = styled.div`
  .ant-card .ant-card-head {
    background-color: ${COLOR.gray3};
    border-radius: 8px 8px 0px 0px;
    text-align: center;
  }
  .ant-card .ant-card-body .ant-descriptions .ant-descriptions-item-label {
    background-color: ${COLOR.gray3};
  }
`