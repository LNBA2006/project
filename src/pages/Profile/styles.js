import styled from 'styled-components'
import { COLOR, SCREEN } from '../../constants'

export const ProfileWrapper = styled.div`
  max-width: 1280px;
  margin: 0px auto 16px;
  padding: 0px 16px;
  .ant-tabs-tab-disabled {
    cursor: default;
  }
  .ant-tabs-tabpane {
    padding: 0px 12px !important;
  }
  .ant-tabs .ant-tabs-nav-list .ant-tabs-tab .ant-tabs-tab-btn {
    & > svg {
      margin-right: 8px;
      transform: translateY(1px);
    }
  }
`
export const SideTab = styled.div`
  display: block;
  @media ${SCREEN.laptop} {
    display: none;
  }
`
export const UserSide = styled.div`
  margin: 16px;
  .ant-avatar {
    width: 128px;
    height: 128px;
  }
  svg {
    font-size: 64px;
    transform: translateY(32px);
  }
`
export const UsernameSide = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.gray10};
`
export const TopTab = styled.div`
  display: none;
  .ant-tabs .ant-tabs-nav .ant-tabs-nav-operations {
    display: none;
  }
  @media ${SCREEN.laptop} {
    display: block;
  }
`
export const UserTop = styled.div`
  .ant-avatar {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  svg {
    font-size: 16px;
  }
`
export const UsernameTop = styled.div`
  display: inline-block;
  color: ${COLOR.gray10};
  font-size: 16px;
  font-weight: 500;
`