import styled from 'styled-components'
import { COLOR } from '../../constants'
import LamborghiniCountach from '../../assets/images/lamborghini_countach_background.jpg'

export const Sidebar = styled.div`
  position: absolute;
  top: 64px;
  left: 0px;

  width: 240px;
  height: ${({ active }) =>
    active
      ? `calc(100vh - 64px)`
      : `0px`};

  padding: 0px 16px;
  background-color: ${COLOR.gray6};
  overflow: hidden;
  transition: all 0.6s ease 0s;
  z-index: 2;
`
export const Auth = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding: 16px;
  border-bottom: 1px solid ${COLOR.gray10};
  svg {
    margin-right: 8px;
    font-size: 16px;
    transform: translateY(3px);
  }
`
export const SidebarWrapper = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR.gray10};
`
export const SidebarItems = styled.div`
  margin: 8px 0px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ active }) =>
    active
      ? `${COLOR.blue4}`
      : `${COLOR.gray10}`};
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  &:hover {
    color: ${COLOR.blue4}
  }
`
export const ImageWrapper = styled.div`
  height: 160px;
  background-image: url(${LamborghiniCountach});
  background-size: cover;
  background-position: center;
`