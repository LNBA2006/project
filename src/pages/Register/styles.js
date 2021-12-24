import styled from 'styled-components'
import { COLOR } from '../../constants'

export const Form = styled.div`
  background-color: white;
  .ant-form-item:last-child {
    margin: 12px 0px;
    button {
      width: 100%;
      border-radius: 8px;
    }
  }
  .ant-form-item input, .ant-select .ant-select-selector, .ant-input-password {
    border-radius: 8px;
  }
`
export const Redirect = styled.div`
  display: inline-block;
  font-size: 16px;
`
export const Link = styled.div`
  display: inline-block;
  margin-left: 8px;
  color: ${COLOR.blue2};
  cursor: pointer;
  transition: all 0.4s ease 0s;
  &:hover {
    color: ${COLOR.blue4};
  }
`