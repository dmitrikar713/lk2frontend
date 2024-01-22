import React, { FC, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RoutePaths } from './entities/Routes';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Onboarding } from './components/Onboarding/Onboarding';
import Toast from './components/Toast';
import ToastContainer from './components/Toast/ToastContainer';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { uploadProfileFileSlice } from './pages/Profile/UploadProfileFileSlice';
import { FooterMobile } from './components/FooterMobile/FooterMobile';
import { checkToken } from './store/thunks/profile/CheckToken';
import { callbackSlice } from './pages/Callback/CallbackSlice';
import { fetchProfile } from './store/thunks/profile/FetchProfile';
import { fetchServices } from './store/thunks/services/FetchServices';
import { Auth } from './api/auth';
import { routesConfig, routesConfigGuest } from './routeConfigs';
const RepresentativeProfile = lazy(
  () => import('./pages/Profile/Representative/RepresentativeProfile')
);

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

  const { loadingError } = useAppSelector(
    (state) => state.uploadProfileFileReducer
  );
  const { correntToken, loading } = useAppSelector(
    (state) => state.callbackReducer
  );

  useEffect(() => {
    loadingError &&
      Toast(loadingError, {
        type: 'error',
      });
    dispatch(uploadProfileFileSlice.actions.uploadErrorFile(''));
  }, [loadingError]);

  useEffect(() => {
    document.title = 'МОСКОВСКИЙ ЭКСПОРТНЫЙ ЦЕНТР';

    dispatch(callbackSlice.actions.setToken(false));
    if (window.location.pathname !== RoutePaths.LOGOUT) {
      setTimeout(() => dispatch(checkToken()), 2000);
    }
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    correntToken && dispatch(fetchProfile());
  }, [correntToken]);

  const conditionalConfig = Auth.token ? routesConfig : routesConfigGuest;

  return (
    <>
      <ToastContainer position="bottom-right" />
      {window.innerWidth >= 1024 && <Onboarding />}
      <div className={styles.Layout}>
        <Header />
        <div className={styles.LayoutWrapper}>
          {/* {loading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'column',
                gap: '1rem',
              }}
            >
              <Skeleton rows={2} />
              <Skeleton rows={2} />
              <Skeleton rows={2} />
              <Skeleton rows={4} />
            </div>
          ) : ( */}
          <Suspense fallback={<div />}>
            <Routes>
              {conditionalConfig.map(
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
          {/* )} */}
        </div>
        {window.innerWidth > 1050 ? <Footer /> : <FooterMobile />}
      </div>
    </>
  );
};
