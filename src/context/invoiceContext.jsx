import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState([]);

  const loadInvoiceData = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/invoiceData');
      setInvoiceData(res.data);
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    loadInvoiceData();
  }, []);

  const value = useMemo(() => ({ invoiceData }), [invoiceData]);

  return <InvoiceContext.Provider value={invoiceData}>{children}</InvoiceContext.Provider>;
};

export const useInvoiceData = () => useContext(InvoiceContext);