import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewRequest } from './new/NewRequest';
import { ExistingRequest } from './existing/ExistingRequest';
import { useAppSelector } from 'src/hooks/redux';

const Request: FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { request } = useAppSelector((state) => state.requestReducer);

  useEffect(() => {
    if (requestId === 'add' && request.serviceId === null) {
      navigate('/services');
    }
  }, []);

  return requestId === 'add' ? <NewRequest /> : <ExistingRequest />;
};

export default Request;
