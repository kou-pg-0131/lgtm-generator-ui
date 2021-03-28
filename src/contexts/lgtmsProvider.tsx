import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lgtm } from '../domain';
import { ApiClient } from '../infrastructures';

type Context = {
  lgtms: Lgtm[];
};

const LgtmsContext = createContext<Context>({
  lgtms: [],
});

type Props = {
  children: React.ReactNode;
};

export const LgtmsProvider: React.FC<Props> = (props: Props) => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  const apiClient = new ApiClient();

  useEffect(() => {
    apiClient.getLgtms().then(resp => {
      setLgtms(resp.lgtms);
    });
  }, []);

  return (
    <LgtmsContext.Provider value={{ lgtms }}>
      {props.children}
    </LgtmsContext.Provider>
  );
};

export const useLgtms = (): Context => useContext(LgtmsContext);
