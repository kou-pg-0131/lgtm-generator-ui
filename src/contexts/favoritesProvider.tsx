import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lgtm } from '../domain';
import { DataStore } from '../infrastructures';

type Context = {
  favorites: Lgtm[];
  add?: (lgtm: Lgtm) => void;
  remove?: (id: string) => void;
};

const FavoritesContext = createContext<Context>({
  favorites: [],
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = (props: Props) => {
  const [favorites, setFavorites] = useState<Lgtm[]>([]);

  const dataStore = new DataStore();

  const add = (lgtm: Lgtm) => {
    const after = [lgtm, ...favorites];
    setFavorites(after);
    dataStore.setFavorites(after);
  };

  const remove = (id: string) => {
    const after = favorites.filter(lgtm => lgtm.id !== id);
    setFavorites(after);
    dataStore.setFavorites(after);
  };

  useEffect(() => {
    const lgtms = dataStore.getFavorites();
    setFavorites(lgtms);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): Context => useContext(FavoritesContext);
