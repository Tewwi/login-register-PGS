import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import Navbar from './modules/common/components/Navbar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const UserPage = lazy(() => import('./modules/home/pages/UserInfoPage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage'));
const ListItemPage = lazy(() => import('./modules/list/pages/ListItemPage'));
const PhotoDetail = lazy(() => import('./modules/list/pages/PhotoDetail'));
const TablePage = lazy(() => import('./modules/table/page/TablePage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Navbar />
      <Switch location={location}>
        <Route path={ROUTES.list} component={ListItemPage} />
        <Route path={`${ROUTES.photo}/:id`} component={PhotoDetail} />
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.register} component={RegisterPage} />
        <Route path={ROUTES.table} component={TablePage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.userInfo} component={UserPage} />
        <Route path={ROUTES.contact} component={ContactPage} />

        <ProtectedRoute path="/" component={HomePage} />
      </Switch>
    </Suspense>
  );
};
