import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const CartContainer = styled.div`
  /* margin-right: 16px; */
  padding-right: 16px;
  margin-bottom: 16px;
  table tbody tr td input {
    width: 64px;
    text-align: right;
    cursor: default;
  }
  table tbody tr td button svg {
    transform: translateY(2px);
  }
  table tbody tr td:nth-child(4) {
    & > div > div:first-child {
      button {
        border-radius: 8px 0px 0px 8px;
      }
    }  
    & > div > div:last-child {
      button {
        border-radius: 0px 8px 8px 0px;
      }
    }  
    & > div > div {
      input {
        border-radius: 0px;
      }
    }  
  }
  .ant-table .ant-table-content .ant-table-placeholder .ant-table-expanded-row-fixed {
    & > svg {
      font-size: 48px;
    }
    & div button {
      margin-top: 16px;
      border-radius: 8px;
    }
  }
`
export const Product = styled.div`
  cursor: pointer;
  transition: all 0.4s ease 0s;
  &:hover {
    color: ${COLOR.blue3};
  }
` 
export const BillWrapper = styled.div`
  .ant-col:first-child {
    margin-bottom: 16px;
  }
  & button, input {
    width: 100%;
    border-radius: 8px;
  }
  & .ant-card {
    border-radius: 8px;
  }
  & .ant-card-head {
    background-color: ${COLOR.gray3};
  }
  & .ant-descriptions-item-content {
    justify-content: flex-end;  
  }
  .ant-row > .ant-col:first-child {
    width: 100%;
  }
`