import styled from 'styled-components';
import { COLOR, SCREEN } from '../../constants';

export const ProductWrapper = styled.div`
  max-width: 1280px;
  margin: 0px auto 16px;
  padding: 0px 16px;
`
export const ProductInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  overflow: hidden;
  & > div {
    width: 50%;
    img {
      width: 100%;
    }
  }
  @media ${SCREEN.laptop} {
    flex-direction: column;
    & > div {
      width: 100%;
    }  
  }
`
export const ProductImageWrapper = styled.div`
`
export const ImageSliderWrapper = styled.div`
`
export const ImageNavWrapper = styled.div`
  & div .slick-slide {
    padding: 0px 4px;
    opacity: 0.6;
    transition: all 0.4 ease 0s;
  }
  & div .slick-current {
    transition: all 0.4 ease 0s;
    opacity: 1;
  }
`
export const ProductInfoContainer = styled.div`
  padding: 0px 16px;
  @media ${SCREEN.laptop} {
    padding: 16px 0px;
  }
  & > div:nth-child(1) {
    margin-bottom: 16px;
    font-size: 28px;
    font-weight: bold;
  }
  & > div:nth-child(3) {
    margin: 16px 0px;
    font-size: 24px;
    font-weight: 500;
    color: ${COLOR.red2}
  }
  & > div:nth-child(4).ant-row {
    margin-bottom: 16px;
    button:nth-child(1) {
      border-radius: 8px 0px 0px 8px;
      svg {
        transform: translateY(2px);
      }
    }
    input {
      width: 64px;
      margin-bottom: 8px;
      border-radius: 0px;
      cursor: default;
      text-align: right;
    };
    button:nth-child(3) {
      margin-right: 4px;
      border-radius: 0px 8px 8px 0px;
      svg {
        transform: translateY(2px);
      }
    }
    button:nth-child(4) {
      border-radius: 8px;
      svg {
        font-size: 16px;
        margin-right: 12px;
        transform: translateY(2px);
      }
    }
  }
  & > div:nth-child(5).ant-row {
    margin-bottom: 8px;
    button {
      margin-right: 8px;
      border-radius: 8px;
      svg {
        margin-right: 12px;
        transform: translateY(2px);
      }
    }
  }
  & > div:nth-child(6).ant-row {
    margin-bottom: 16px;
  }
  .ant-list-header {
    font-size: 16px;
    font-weight: 600;
  }
  .ant-space .ant-space-item .ant-rate {
    color: ${COLOR.pink2}
  }
`
export const ProductDetailWrapper = styled.div`
  & .ant-tabs .ant-descriptions {
    margin-bottom: 16px;
  }
`
export const ProductIntroduceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    width: 100%;
    padding: 8px 0px;
  }
  & img {
    width: 100%;
  }
`
export const ProductCommentWrapper = styled.div`
  & form div button {
    border-radius: 8px;
    svg {
      margin-right: 12px;
      transform: translateY(2px);
    }
  }
  & .ant-form textarea {
    border-radius: 8px;
  }
  & .ant-list .ant-list-items .ant-comment-avatar svg {
    font-size: 16px;
  }
  & .ant-comment .ant-comment-content .ant-comment-content-author .ant-comment-content-author-name {
    color: ${COLOR.gray10};
    font-size: 14px;
    font-weight: 500; 
  }
  & .ant-comment .ant-comment-content .ant-comment-content-detail .ant-rate svg {
    font-size: 14px;
  }
  & .ant-rate {
    color: ${COLOR.pink2}
  }
  & .ant-list .ant-list-empty-text svg {
    font-size: 24px;
  }
`