import React, { useContext, createContext } from 'react';
import { ApiClient } from '../infrastructures/apiClient';

type Context = {
  apiClient?: ApiClient;
};

const ApiContext = createContext<Context>({});

type Props = {
  children: React.ReactNode;
};

export const ApiProvider: React.FC = (props: Props) => {
  const apiClient = new ApiClient();

  return (
    <ApiContext.Provider value={{ apiClient }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export const useApi = (): Context => useContext(ApiContext);
