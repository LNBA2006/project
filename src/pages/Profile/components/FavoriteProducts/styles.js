import styled from 'styled-components'
import { COLOR } from '../../../../constants'

export const FavoriteProductsWrapper = styled.div`
  .ant-card .ant-card-head {
    background-color: ${COLOR.gray3};
    text-align: center;
  }
`
export const FavoriteProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  .ant-ribbon-wrapper {
    width: 224px;
  }
`
export const Card = styled.div`
  .ant-ribbon {
    display: ${({ isNew }) => isNew
    ? 'block'
    : 'none'};
  }
`
export const FavoriteProductsContent = styled.div`
  width: 224px;
  background-color: ${COLOR.gray3};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  & > div:first-child {
    border-radius: 4px 4px 0px 0px;
    overflow: hidden;
    img {
      margin: 0px auto;
      width: 100%;
      transition: all 0.4s ease 0s;
    }
  }
  & > div:last-child {
    padding: 8px 16px;
    & > div:first-child {
      font-size: 14px;
      font-weight: 600;
      transition: all 0.4s ease 0s;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
      color: ${COLOR.red2};
    }
    & > div:last-child {
      ul {
        font-size: 14px;
      }
      span {
        font-style: italic;
      }
      .ant-rate {
        color: ${COLOR.pink2};
        transform: translateY(3px);
      }
    }
  }
  &:hover {
    img {
      transform: scale(1.4);
    }
    background-color: ${COLOR.gray4};
    & > div:last-child > div:first-child {
      color: ${COLOR.blue4}
    }
  }
`