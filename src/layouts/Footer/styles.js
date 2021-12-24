import styled from "styled-components";
import { COLOR, SCREEN } from '../../constants'

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 180px;
  padding: 16px;
  background-color: ${COLOR.gray3};
  & > div:first-child > div:nth-child(2) {
    margin-bottom: 8px;
  }
  & > div {
    width: 25%;
    padding-right: 16px;
  }
  @media ${SCREEN.tablet} {
    & > div {
      width: 50%;
      padding-right: 32px;
    }
  }
  @media ${SCREEN.mobileL} {
    & > div {
      width: 100%;
    }
  }
`
export const Logo = styled.div`
  display: inline-block;
  font-family: cursive;
  font-size: 32px;
  font-weight: bold;
  background-image: linear-gradient(to right, ${COLOR.blue4}, ${COLOR.pink3});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
`
export const Title = styled.div`
  margin: 8px 0px;
  font-weight: bold;
`
export const List = styled.div`
  ul {
    margin: 0px;
    padding: 0px;
  }
  ul li {
    list-style-type: none;
    cursor: pointer;
    transition: all 0.4s ease 0s;
  }
  ul li:hover {
    color: ${COLOR.blue3}
  }
`
export const Connect = styled.div`
  svg {
    font-size: 24px;
    margin: 12px 8px;
    cursor: pointer;
    transition: all 0.4s ease 0s;
  }
  svg:nth-child(1) {
    margin-left: 0px;
  }
  svg:nth-child(1):hover {
    color: ${COLOR.facebook}
  }
  svg:nth-child(2):hover {
    color: ${COLOR.instagram}
  }
  svg:nth-child(3):hover {
    color: ${COLOR.twitter}
  }
  svg:nth-child(4):hover {
    color: ${COLOR.youtube}
  }
`
