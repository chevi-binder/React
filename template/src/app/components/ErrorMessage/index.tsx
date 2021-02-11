import React from 'react';
import styled from 'styled-components/macro';

export function ErrorMessage() {
  return (
    <>
      <ErrorText>Error Occured</ErrorText>
    </>
  );
}
const ErrorText = styled.p`
  display: flex;
  align-items: center;
`;
