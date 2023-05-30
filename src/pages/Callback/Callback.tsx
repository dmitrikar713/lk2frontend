import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseQuery } from 'src/common/utils/parseQuery';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchAuth } from 'src/store/thunks/authorization/FetchAuth';

const CallbackAuth = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const search = parseQuery(window.location.search);
  const { pageBack, correntToken } = useAppSelector(
    (state) => state.callbackReducer
  );

  useEffect(() => {
    dispatch(fetchAuth(search));
  }, []);

  useEffect(() => {
    if (correntToken) {
      if (pageBack) {
        if (pageBack == '/callback') {
          setTimeout(() => navigate('/'));
        } else setTimeout(() => navigate(pageBack));
      } else setTimeout(() => navigate('/'));
    }
  }, [correntToken]);
  return <></>;
};

export default CallbackAuth;
