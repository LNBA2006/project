import styled from 'styled-components'
import { COLOR, SCREEN } from '../../constants'

export const Header = styled.div`
  /* position: fixed; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  max-width: 100%;
  height: 64px;

  padding: 0 16px;

  background-color: ${COLOR.gray3};

  .nav-toggle {
    display: none;
  }

  .logo {
    display: inline-block;

    margin: 0;
    padding: 0;

    font-family: cursive;
    font-size: 32px;
    font-weight: bold;
    background-image: linear-gradient(to right, ${COLOR.blue4}, ${COLOR.pink3});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
  }

  .auth {
    display: flex;
    flex-direction: row;
    div:first-child {
      margin-right: 8px;
    }
    svg {
      margin-right: 0px;
      transform: translate(-3px,3px);
      font-size: 16px;
    }
    div:last-child svg {
      margin-right: 8px;
    }
  }

  @media ${SCREEN.laptop} {
    .nav-toggle {
      display: block;
      font-size: 20px;
      color: ${COLOR.gray10};
      cursor: pointer;
      order: 1;
    }
    .logo {
      order: 2;
    }
    .menu-link {
      display: none;
    }
    .auth {
      order: 3;
      div:first-child {
        margin: 0px;
      }
      div:last-child {
        display: none;
      }
    }
  }
`
export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  @media ${SCREEN.laptop} {
    display: none;
  }
`
export const NavLink = styled.div`
  margin: 0px 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ active }) =>
    active
      ? `${COLOR.blue4}`
      : `${COLOR.gray10}`};
  cursor: pointer;
  transition: all 0.4s ease 0s;
  &:hover {
    color: ${COLOR.blue4}
  }
`