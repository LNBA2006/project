import styled from 'styled-components';
import Countach from '../../assets/images/lamborghini_countach_background.jpg'
import { COLOR, SCREEN } from '../../constants';

export const Background = styled.div`
  display: flex;
  justify-content: ${({ position }) => position};
  height: 100vh;
  background-image: url(${Countach});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.4);
`
export const Main = styled.div`
  width: 50%;
  padding: 16px;
  background-color: ${COLOR.gray1};
  @media ${SCREEN.tablet} {
    width: 100%;
  }
`