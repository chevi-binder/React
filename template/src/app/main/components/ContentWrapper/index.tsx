/**
 *
 * ContentWrapper
 *
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

export const ContentWrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  margin-left: ${StyleConstants.SIDE_BAR_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  padding: 0 1.5rem;
  box-sizing: content-box;
`;
