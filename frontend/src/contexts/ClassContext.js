// src/contexts/ClassContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ClassContext = createContext();

export const useClassContext = () => useContext(ClassContext);

export const ClassProvider = ({ children }) => {
  const [currentClassId, setCurrentClassId] = useState(() => {
    return localStorage.getItem('currentClassId') || null;
  });

  useEffect(() => {
    if (currentClassId) {
      localStorage.setItem('currentClassId', currentClassId);
    } else {
      localStorage.removeItem('currentClassId');
    }
  }, [currentClassId]);

  return (
    <ClassContext.Provider value={{ currentClassId, setCurrentClassId }}>
      {children}
    </ClassContext.Provider>
  );
};