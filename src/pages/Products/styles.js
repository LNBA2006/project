import styled from 'styled-components';
import { COLOR, SCREEN } from '../../constants'

export const ProductListWrapper = styled.div`
  max-width: 1280px;
  margin: 0px auto 16px;
  padding: 0px 16px;
`
export const ProductListContainer = styled.div`
  display: flex;
  gap: 16px;
`
export const FilterWrapper = styled.div`
  width: 256px;
  @media ${SCREEN.laptop} {
    width: 240px;
  }
  @media ${SCREEN.tablet} {
    display: none;
  }
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    background-color: ${COLOR.gray3}
  }
  .ant-collapse {
    border-radius: 8px;
  }
  .ant-collapse > .ant-collapse-item:first-child > .ant-collapse-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .ant-collapse > .ant-collapse-item:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    .ant-collapse-header {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .ant-collapse-content-active {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .ant-collapse > .ant-collapse-item:last-child.ant-collapse-item-active .ant-collapse-header {
    border-radius: 0px;
  }
`
export const FilterTopWrapper = styled.div`
  display: none;
  & > div:nth-child(1) {
    margin: 8px 0px;
  }
  & > div {
    & > div:nth-child(2) {
      padding: 0px 0px 0px 8px;
    }
  }
  @media ${SCREEN.tablet} {
    display: block;
    .ant-select {
      width: 100%;
    }
  }
  .ant-select .ant-select-selector {
    border-radius: 8px;
    .ant-select-selection-item {
      border-radius: 8px;
      background-color: ${COLOR.blue3};
      .ant-select-selection-item-content, .ant-select-selection-item-remove {
        color: ${COLOR.gray1}
      }
    }
  }
`
export const SearchWrapper = styled.div`
  width: calc(100% - 272px);
  @media ${SCREEN.laptop} {
    width: calc(100% - 256px)
  }
  @media ${SCREEN.tablet} {
    width: 100%;
  }
`
export const SearchContainer = styled.div`
  margin-bottom: 16px;
  & > div {
    margin-bottom: 8px;
  }
  & > span {
    margin-bottom: 4px;
  }
  @media ${SCREEN.tablet} {
    & > span {
      display: none;
    }
  }
  .ant-tag {
    border-radius: 8px;
  }
`
export const SearchContent = styled.div`
  margin: 0px 8px 0px 0px;
  .ant-input-group-addon {
    padding: 4px 11px 0px;
    color: ${COLOR.blue4}
  }
  input {
    border-radius: 8px 0px 0px 8px;
  }
  .ant-input-group-addon {
    border-radius: 0px 8px 8px 0px;
  }
`
export const SortWrapper = styled.div`
  .ant-select {
    width: 100%;
  }
  .ant-select .ant-select-selector {
    border-radius: 8px;
  }
`
export const ProductItemWrapper = styled.div`
  .ant-row button {
    border-radius: 8px;
  }
`
export const Card = styled.div`
  .ant-ribbon {
    display: ${({ isNew }) => isNew
    ? `block`
    : `none`}
  }
`
export const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`
export const ProductItemContent = styled.div`
  width: 224px;
  background-color: ${COLOR.gray3};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  & > div:nth-child(1) {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
  }
  & > div:nth-child(1) img {
    width: 100%;
    transition: all 0.4s ease 0s;
  }
  & > div:nth-child(2) {
    padding: 8px 16px;
    & > div:nth-child(1) {
      font-size: 14px;
      font-weight: 600;
      transition: all 0.4s ease 0s;
    }
    & > div:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
      color: ${COLOR.red2}
    }
    & > div:last-child {
      & > ul {
        font-size: 14px;
      }
      & > span {
        font-style: italic;
      }
    }
  }
  & .ant-rate {
    color: ${COLOR.pink2};
    transform: translateY(3px);
  }
  &:hover {
    img {
      transform: scale(1.4, 1.4);
    }
    background-color: ${COLOR.gray4};
    div:nth-child(2) {
      & > div:nth-child(1) {
        color: ${COLOR.blue4};
      }
    }
  }
`