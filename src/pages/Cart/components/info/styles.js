import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const InfoWrapper = styled.div`
  .ant-card {
    margin-bottom: 16px;
    border-radius: 8px;
    input, .ant-select-selector {
      border-radius: 8px;
    }
  }
  .ant-table-footer {
    font-weight: 500;
  }
  & .ant-card-head {
    background-color: ${COLOR.gray3}
  }
  & > .ant-row:last-child button {
    border-radius: 8px;
  }
`