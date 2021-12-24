import styled from 'styled-components'
import { COLOR, SCREEN } from '../../../../constants'

export const Payment = styled.div`
  .ant-card {
    margin-bottom: 16px;
    border-radius: 8px;
    input {
      border-radius: 8px;
    }
  }
  .ant-card-head {
    background-color: ${COLOR.gray3}
  }
  .ant-card-body svg {
    margin-left: 2px;
    margin-right: 8px;
    font-size: 20px;
    transform: translateY(5px);
  }
  .ant-descriptions-item:last-child > div > span{
    display: inline-block;
    text-align: right;
  }
  & .ant-row > .ant-col:first-child > .ant-card:last-child > .ant-card-body {
    & form > .ant-row:nth-child(2) .ant-radio-group {
      width: 100%;
      label {
        & > span:last-child {
          display: flex;
          align-content: center;
          justify-content: center;
        }
        width: 25%;
        height: 64px;
        img {
          margin: 6px 0px;
        }
      }
      @media ${SCREEN.laptop} {
        label {
          width: 50%;
        }
      }
    }
  }
  & .ant-row:last-child button {
    border-radius: 8px;
  }
  & .ant-card-body > .ant-card-meta {
    padding-top: 8px;
    border-top: 1px solid ${COLOR.gray10};
  }
  & .ant-descriptions-item-label {
    font-weight: 500;
  }
`