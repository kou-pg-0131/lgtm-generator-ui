import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lgtm } from '../domain';
import { ApiClient } from '../infrastructures';

type Context = {
  lgtms: Lgtm[];
  loading: boolean;
  loadMore?: () => void;
  loadable: boolean;
};

const LgtmsContext = createContext<Context>({
  lgtms: [],
  loading: false,
  loadable: false,
});

type Props = {
  children: React.ReactNode;
};

export const LgtmsProvider: React.FC<Props> = (props: Props) => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluatedId, setEvaluatedId] = useState<string>();

  const apiClient = new ApiClient();

  const load = () => {
    setLoading(true);
    apiClient.getLgtms(evaluatedId).then(resp => {
      setEvaluatedId(resp.evaluated_id);
      setLgtms(prev => [...prev, ...resp.lgtms]);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <LgtmsContext.Provider value={{ lgtms, loading, loadable: !!evaluatedId, loadMore: load }}>
      {props.children}
    </LgtmsContext.Provider>
  );
};

export const useLgtms = (): Context => useContext(LgtmsContext);
