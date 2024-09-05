import { createContext, useState, useContext } from 'react';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('light'); 

  const trocarTema = () => {
    setTema((prevTema) => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <TemaContext.Provider value={{ tema, trocarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  return useContext(TemaContext);
};
