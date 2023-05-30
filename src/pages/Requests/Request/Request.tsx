import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { NewRequest } from './new/NewRequest';
import { ExistingRequest } from './existing/ExistingRequest';

const Request: FC = () => {
  const { requestId } = useParams();

  return requestId === 'add' ? <NewRequest /> : <ExistingRequest />;
};

export default Request;
