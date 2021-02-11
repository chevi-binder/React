import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Main } from 'app/main/containers/Main';
import { PageWrapper } from 'app/components/PageWrapper';

export function AppLayout() {
  let { path } = useRouteMatch();
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React Boilerplate application " />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Switch>
          <Route path={`${path}home`} component={Main} />
          <Route>
            <Redirect to={`${path}home`} />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
}
