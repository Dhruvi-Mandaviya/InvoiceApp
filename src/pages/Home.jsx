import React, { useContext, useEffect, useState } from 'react';
import { InvoiceContext } from '../context/invoiceContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const invoiceData = useContext(InvoiceContext);
  const [invoices, setInvoices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleAddInvoice = () => {
    if (currentIndex < invoiceData.length) {
      const newInvoice = invoiceData[currentIndex];
      setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
      setCurrentIndex(currentIndex + 1);
      setError(null);
    } else {
      setInvoices(prevInvoices => [...prevInvoices]);
      setError({ message: 'No more invoices to add.' });
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setShowFilterDropdown(false);  // Hide dropdown after selecting filter
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'All') {
      return true;
    }
    return invoice.status === filter;
  });

  useEffect(() => {
    if (invoices.length === 0 && currentIndex === 0) {
      setError({ message: 'No invoices available. Please add an invoice.' });
    } else {
      setError(null);
    }
  }, [invoices, currentIndex]);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center p-6 text-white">
      <div className="max-w-3xl w-full shadow overflow-hidden sm:rounded-lg">
        <header className="flex justify-between items-center p-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <div className="relative">
            <button
              className="text-white px-4 py-2 rounded-md"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              Filter by Status
            </button>
            {showFilterDropdown && (
              <div className="absolute w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange('All')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterChange('Paid')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => handleFilterChange('Pending')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleFilterChange('Draft')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Draft
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleAddInvoice}
          >
            New Invoice
          </button>
        </header>
        {error ? (
          <div className="p-6">
            <h1 className="text-sm text-center text-red-500">{error.message}</h1>
          </div>
        ) : (
          <table
            className="min-w-full divide-y divide-gray-200 border-separate"
            style={{ borderSpacing: '0 10px' }}
          >
            <tbody className="bg-gray-700 ">
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <Link to={`/${invoice.id}`} className='contents'>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                      {invoice.invoice_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <p>Due {invoice.due_date}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{invoice.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{invoice.total_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-sm text-center ${
                          invoice.status === 'Paid'
                            ? 'font-bold text-green-950'
                            : invoice.status === 'Pending'
                              ? 'font-bold text-yellow-800'
                              : 'text-white'
                        }`}
                      >
                        <svg className="relative w-3 h-3 m-1 fill-current" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        {invoice.status}
                      </span>
                    </td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
