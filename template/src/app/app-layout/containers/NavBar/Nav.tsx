import React from 'react';
import styled from 'styled-components/macro';

import { useDispatch } from 'react-redux';
import { actions } from 'app/main/containers/Main/slice';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Button, Icon } from '@material-ui/core';

export function Nav() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onLoadTreeData = () => {
    dispatch(actions.loadTreeData());
  };

  return (
    <Wrapper>
      <Button
        onClick={onLoadTreeData}
        color="primary"
        variant="contained"
        endIcon={<Icon>send</Icon>}
      >
        {t(translations.toolbar.loadTreeData)}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
