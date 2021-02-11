/**
 *
 * Main
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { mainSaga } from './saga';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyTree } from '../MyTree';
import { TestContent } from '../TestContent';
import { SideBar } from 'app/main/components/SideBar';
import { ContentWrapper } from 'app/main/components/ContentWrapper';
import { useSelector } from 'react-redux';
import { selectLoading } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import useErrorBoundary from 'app/components/use-error-boundary';

interface Props {}

export const Main = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: mainSaga });

  const { path } = useRouteMatch();
  const isLoading = useSelector(selectLoading);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {});
  const { ErrorBoundary, didCatch, error } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      console.warn('ErrorBoundary Main onDidCatch: ' + error.message);
    },
  });
  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Description of Main" />
      </Helmet>
      {isLoading && <LoadingIndicator />}
      {didCatch ? (
        <p>An error has been catched: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <SideBar>
            <MyTree hasError={didCatch} />
          </SideBar>
          <ContentWrapper>
            <Switch>
              <Route path={`${path}`} component={TestContent} />
            </Switch>
          </ContentWrapper>
        </ErrorBoundary>
      )}
    </>
  );
});
