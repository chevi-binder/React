/**
 *
 * SideBar
 *
 */
import styled from 'styled-components/macro';

export const SideBar = styled.div`
  left: 0;
  position: fixed;
  width: 250px;
  height: 100%;
  z-index: 999;
  overflow-y: auto;
  transition: left 0.2s;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  display: block;
`;
