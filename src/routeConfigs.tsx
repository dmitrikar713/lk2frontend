import { RoutePaths } from './entities/Routes';
import React, { lazy } from 'react';
import styles from './Layout.module.scss';
import { PageStatus } from './components/PageStatus/PageStatus';
import { StatusCode } from './api/StatusCode';
import {
  ProfileInfo,
  ProfileSegments,
} from './components/Cards/ProfileInfo/ProfileInfo';
import CallbackAuth from './pages/Callback/Callback';
import Profile from './pages/Profile/Profile';
import Testrouter from './pages/Testrouter/Testrouter';
import { Settings } from './pages/Settings/Settings';
const RepresentativeProfile = lazy(
  () => import('./pages/Profile/Representative/RepresentativeProfile')
);
const Requests = lazy(() => import('./pages/Requests/Requests'));
const DetailsRequest = lazy(
  () => import('./pages/Requests/Request/details/DetailsRequest')
);
const Request = lazy(() => import('./pages/Requests/Request/Request'));
const Services = lazy(() => import('./pages/Services/Services'));
const Exports = lazy(() => import('./pages/Exports/Exports'));
const Service = lazy(() => import('./pages/Services/Service/Service'));
const Notifications = lazy(() => import('./pages/Notifications/Notifications'));

export interface RouteConfig {
  name: string;
  isIndex?: boolean;
  path: RoutePaths;
  title: string;
  component: JSX.Element;
  withNavbar?: boolean;
  inMenu?: boolean;
  mobileIcon?: JSX.Element;
  className?: string;
}

export const routesConfig: any = [
  {
    name: 'profile',
    isIndex: true,
    path: RoutePaths.PROFILE,
    title: 'Профиль компании',
    component: (
      <Profile
        profileCard={
          <ProfileInfo
            withLogoUploading
            segmentsIncluded={[
              ProfileSegments.Notifications,
              ProfileSegments.Settings,
              ProfileSegments.Exports,
            ]}
          />
        }
      />
    ),
  },
  {
    name: 'settings',
    isIndex: true,
    path: RoutePaths.SETTINGS,
    title: 'Настройки',
    component: <Settings />,
  },
  {
    name: 'profile',
    isIndex: true,
    path: RoutePaths.REPRESENTATIVE_PROFILE,
    title: 'Профиль представителя',
    component: <RepresentativeProfile />,
  },
  {
    name: 'Testrouter',
    isIndex: true,
    path: RoutePaths.TESTROUTER,
    title: 'Профиль представителя',
    component: <Testrouter />,
  },

  {
    name: 'requests',
    path: RoutePaths.REQUESTS,
    title: 'Заявки',
    component: <Requests profileCard={<ProfileInfo segmentsIncluded={[]} />} />,
  },
  {
    name: 'details',
    path: RoutePaths.REQUEST_DETAIL,
    title: 'Детали заявки',
    component: <DetailsRequest />,
  },
  {
    name: 'request',
    path: RoutePaths.REQUEST,
    title: 'Заявка',
    component: <Request />,
  },
  {
    name: 'services',
    path: RoutePaths.SERVICES,
    title: 'Услуги',
    component: <Services />,
  },
  {
    name: 'service',
    path: RoutePaths.SERVICE,
    title: 'Услуга',
    component: <Service />,
  },
  {
    name: 'exports',
    path: RoutePaths.EXPORTS,
    title: 'Экспортная готовность',
    component: <Exports />,
  },
  {
    name: 'notifications',
    path: RoutePaths.NOTIFICATIONS,
    title: 'Уведомления',
    component: <Notifications />,
  },
  {
    name: '404',
    path: RoutePaths.ALL,
    title: 'Not found page',
    component: <PageStatus status={StatusCode.NotFound} />,
  },
  {
    name: 'logout',
    path: RoutePaths.LOGOUT,
    title: 'logout',
    component: <PageStatus status={StatusCode.ResetContent} />,
  },
  {
    name: 'callback',
    path: RoutePaths.CALLBACK,
    title: 'Auth callback',
    component: <CallbackAuth />,
  },
  {
    name: 'login',
    path: RoutePaths.LOGIN,
    title: 'Auth callback',
    component: <CallbackAuth />,
  },
  {
    name: 'exit',
    path: RoutePaths.EXIT,
    title: 'Выход',
    component: <CallbackAuth />,
    className: styles.Exit,
  },
];

export const routesConfigGuest: Array<RouteConfig> = [
  {
    isIndex: true,
    name: 'services',
    path: RoutePaths.BASE,
    title: 'Услуги',
    component: <Services />,
  },
  {
    isIndex: true,
    name: 'services',
    path: RoutePaths.SERVICES,
    title: 'Услуги',
    component: <Services />,
  },
  {
    name: 'service',
    path: RoutePaths.SERVICE,
    title: 'Услуга',
    component: <Service />,
  },
  {
    name: '404',
    path: RoutePaths.ALL,
    title: 'Not found page',
    component: <PageStatus status={StatusCode.NotFound} />,
  },
  {
    name: 'callback',
    path: RoutePaths.CALLBACK,
    title: 'Auth callback',
    component: <CallbackAuth />,
  },
  {
    name: 'login',
    path: RoutePaths.LOGIN,
    title: 'Auth callback',
    component: <CallbackAuth />,
  },
];
