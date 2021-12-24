import styled from 'styled-components'
import { COLOR, SCREEN } from '../../constants'
import McLarenP1 from '../../assets/images/mclaren_p1.jpg'

export const HomePageWrapper = styled.div`
  /* max-width: 1280px;
  margin: 0px auto 16px;
  padding: 0px 16px; */
`;
export const BannerWrapper = styled.div`
  margin-bottom: 32px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
  .slick-slider .slick-arrow {
    color: ${COLOR.gray10};
    z-index: 1;
    transition: all 0.4s ease 0s;
    @media ${SCREEN.laptop} {
      width: 16px;
      height: 16px;
    }
    &:hover {
      color: ${COLOR.blue3};
    }
  }
  .slick-arrow.slick-prev {
    left: 16px;
  }
  .slick-arrow.slick-next {
    right: 16px;
  }
`
export const NewProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  .ant-row {
    width: 100%;
    button {
      border-radius: 8px;
    }
  }
`
export const CarMakersWrapper = styled.div`
  margin-bottom: 32px;
  overflow: hidden;
  h2 {
    margin-bottom: 16px;
    text-align: center;
    text-decoration: underline;
    text-underline-position: under;
  }
  `
export const CarMakersContainer = styled.div`
  background-color: ${COLOR.gray3};
  img {
    height: 192px;
    margin: 0px auto;
    padding: 32px 0px;
  }
`
export const Card = styled.div`
  .ant-ribbon {
    display: ${({ isNew }) => isNew
      ? 'block'
      : 'none'};
  }
`
export const ProductsWrapper = styled.div`
  max-width: 1280px;
  margin: 0px auto 32px;
  padding: 0px 16px;
  overflow: hidden;
  h2 {
    margin-bottom: 16px;
    text-align: center;
    text-decoration: underline;
    text-underline-position: under;
  }
  .ant-ribbon-wrapper {
    width: 224px;
    margin: 0px auto;
  }
  .slick-list {
    margin: 0px 32px;
  }
  .slick-slider > svg {
    color: ${COLOR.gray10};
    transition: all 0.4s ease 0s;
    @media ${SCREEN.laptop} {
      width: 16px;
      height: 16px;
    }
    @media ${SCREEN.tablet} {
      width: 14px;
      height: 14px;
    }
    &:hover {
      color: ${COLOR.blue3};
    }
  }
  .slick-slider .slick-arrow.slick-prev {
    left: 0px;
  }
  .slick-slider .slick-arrow.slick-next {
    right: 0px;
  }
`
export const ProductsContainer = styled.div`
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
export const SubscribeWrapper = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  background-image: url(${McLarenP1});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  @media ${SCREEN.tablet} {
    background-attachment: unset;
  }
`
export const SubscribeContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0px 16px;
  h2 {
    margin-bottom: 16px;
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${COLOR.gray1};
  }
  h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: ${COLOR.gray1};
  }
  .ant-form {
    .ant-row {
      width: 100%;
    }
    input {
      width: 100%;
      border-radius: 8px 0px 0px 8px;
    }
    button {
      width: 100%;
      border-radius: 0px 8px 8px 0px;
    }
  }
`