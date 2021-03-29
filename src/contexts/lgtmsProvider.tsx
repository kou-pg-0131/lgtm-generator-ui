import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lgtm } from '../domain';
import { ApiClient } from '../infrastructures';

type Context = {
  lgtms: Lgtm[];
  loading: boolean;
};

const LgtmsContext = createContext<Context>({
  lgtms: [],
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const LgtmsProvider: React.FC<Props> = (props: Props) => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const apiClient = new ApiClient();

  useEffect(() => {
    setLoading(true);
    apiClient.getLgtms().then(resp => {
      setLgtms(resp.lgtms);
      setLoading(false);
    });
  }, []);

  return (
    <LgtmsContext.Provider value={{ lgtms, loading }}>
      {props.children}
    </LgtmsContext.Provider>
  );
};

export const useLgtms = (): Context => useContext(LgtmsContext);
