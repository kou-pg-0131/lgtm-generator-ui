import React, { useContext, createContext, useState } from 'react';
import { Image } from '../domain';

type Context = {
  images: Image[];
  setImages?: (images: Image[]) => void;
};

const ImagesContext = createContext<Context>({
  images: [],
});

type Props = {
  children: React.ReactNode;
};

export const ImagesProvider: React.FC<Props> = (props: Props) => {
  const [images, setImages] = useState<Image[]>([]);

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      {props.children}
    </ImagesContext.Provider>
  );
};

export const useImages = (): Context => useContext(ImagesContext);
