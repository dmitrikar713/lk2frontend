import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { RoutePaths } from './entities/Routes';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Onboarding } from './components/Onboarding/Onboarding';
import Toast from './components/Toast';
import ToastContainer from './components/Toast/ToastContainer';

import styles from './Layout.module.scss';
import { PageStatus } from './components/PageStatus/PageStatus';
import { StatusCode } from './api/StatusCode';
// import { NavBar, NavBarProps } from './components/Navbar/NavBar';
import {
  ProfileInfo,
  ProfileSegments,
} from './components/Cards/ProfileInfo/ProfileInfo';
import { useAppDispatch, useAppSelector } from './hooks/redux';
// import { EventsIcon } from './styles/icons/events';
import CallbackAuth from './pages/Callback/Callback';
import Profile from './pages/Profile/Profile';
import { uploadProfileFileSlice } from './pages/Profile/UploadProfileFileSlice';
import { FooterMobile } from './components/FooterMobile/FooterMobile';
import { checkToken } from './store/thunks/profile/CheckToken';
import { callbackSlice } from './pages/Callback/CallbackSlice';
import { fetchProfile } from './store/thunks/profile/FetchProfile';
// TODO: Onboarding incorrect work while trying navigate to Profile page component

// const Profile = lazy(() => import('./pages/Profile/Profile'));
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
// const Settings = lazy(() => import('./pages/Settings/Settings'));

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  // const ComponentWithNavbar = (component: React.ReactElement) => (
  //   <>
  //     <NavBar {...navBarConfig} />
  //     <div className={styles.LayoutBody}>{component}</div>
  //   </>
  // );

  // const navBarConfig: NavBarProps = {
  //   sections: routesConfig
  //     .filter((route) => route.inMenu)
  //     .map(({ title, path, mobileIcon, className }) => ({
  //       title,
  //       path,
  //       mobileIcon,
  //       className,
  //     })),
  // };

  interface RouteConfig {
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

  const routesConfig: Array<RouteConfig> = [
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
              ]}
            />
          }
        />
      ),
    },
    {
      name: 'profile',
      isIndex: true,
      path: RoutePaths.REPRESENTATIVE_PROFILE,
      title: 'Профиль представителя',
      component: <RepresentativeProfile />,
    },
    {
      name: 'requests',
      path: RoutePaths.REQUESTS,
      title: 'Заявки',
      component: (
        <Requests
          profileCard={
            <ProfileInfo segmentsIncluded={[ProfileSegments.Notifications]} />
          }
        />
      ),
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
      component: (
        <Services
          profileCard={
            <ProfileInfo segmentsIncluded={[ProfileSegments.Notifications]} />
          }
        />
      ),
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
      name: 'exit',
      path: RoutePaths.EXIT,
      title: 'Выход',
      component: <CallbackAuth />,
      className: styles.Exit,
    },
  ];

  const { loadingError } = useAppSelector(
    (state) => state.uploadProfileFileReducer
  );

  const { correntToken } = useAppSelector((state) => state.callbackReducer);

  useEffect(() => {
    loadingError &&
      Toast(loadingError, {
        type: 'error',
      });

    dispatch(uploadProfileFileSlice.actions.uploadErrorFile(''));
  }, [loadingError]);

  useEffect(() => {
    dispatch(callbackSlice.actions.setToken(false));

    if (window.location.pathname !== RoutePaths.LOGOUT) {
      setTimeout(() => dispatch(checkToken()), 2000);
    }
  }, []);

  useEffect(() => {
    correntToken && dispatch(fetchProfile());
  }, [correntToken]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      {window.innerWidth >= 1024 && <Onboarding />}
      <div className={styles.Layout}>
        <Header />
        <div className={styles.LayoutWrapper}>
          <Suspense fallback={<div />}>
            <Routes>
              {routesConfig.map(
                ({ name, isIndex, path, component, withNavbar }) => (
                  <Route
                    key={name}
                    index={isIndex}
                    path={path}
                    element={
                      component
                      // withNavbar ? ComponentWithNavbar(component) : component
                    }
                  />
                )
              )}
            </Routes>
          </Suspense>
        </div>
        {window.innerWidth > 1050 ? <Footer /> : <FooterMobile />}
      </div>
    </>
  );
};
