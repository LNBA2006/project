import styled from 'styled-components'
import LamborghiniCountach from '../../assets/images/lamborghini_countach.jpg'
import { COLOR } from '../../constants'

export const BreadcrumbContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  height: ${({ height }) => height ? `${height}` : '192px'};
  margin-bottom: 16px;
  padding: 0px 16px;
  background-image: url(${LamborghiniCountach});
  background-size: cover;
  background-position: 50% 55%;
  background-repeat: no-repeat;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .ant-breadcrumb-link, .ant-breadcrumb-separator {
    position: relative;
    color: ${COLOR.gray1};
    z-index: 1;
    svg {
      margin: 0px 4px 0px 0px;
      transform: translateY(1px);
    }
  }
  .ant-breadcrumb-link {
    cursor: pointer;
    transition: all 0.4s ease 0s;
    &:hover {
      color: ${COLOR.blue4}
    }
  }
  .ant-breadcrumb > span:last-child a {
    color: ${COLOR.gray1};
  }
`
export const BreadcrumbTitle = styled.div`
  font-size: 16px;
  color: ${COLOR.gray1};
  z-index: 1;
`