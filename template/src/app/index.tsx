/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { NotFoundPage } from './app-layout/containers/NotFoundPage/Loadable';
import { AppLayout } from './app-layout/containers/AppLayout';
import useErrorBoundary from 'app/components/use-error-boundary';

export function App() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <BrowserRouter basename="/reactbase">
      {didCatch ? (
        <p>An error has been catched: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <Helmet
            titleTemplate="%s - React Boilerplate"
            defaultTitle="React Boilerplate"
          >
            <meta
              name="description"
              content="A React Boilerplate application"
            />
          </Helmet>
          <Switch>
            <Route path="/" component={AppLayout} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </ErrorBoundary>
      )}
    </BrowserRouter>
  );
}
