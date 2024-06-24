import React, { useContext, useEffect, useState } from 'react';
import { InvoiceContext } from '../context/invoiceContext';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Home() {
  const invoiceData = useContext(InvoiceContext);
  const [invoices, setInvoices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddInvoice = () => {
    if (currentIndex < invoiceData.length) {
      const newInvoice = invoiceData[currentIndex];
      setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
      setCurrentIndex(currentIndex + 1);
      // setError(null);
      toggleCart();
    } else {
      setInvoices(prevInvoices => [...prevInvoices]);
      // setError({ message: 'No more invoices to add.' });
    }
  };

  const handleFilterChange = status => {
    setFilter(status);
    setShowFilterDropdown(false);
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'All') {
      return true;
    }
    return invoice.status === filter;
  });

  const toggleCart = () => {
    setOpen(val => !val);
  };

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
            onClick={toggleCart}
          >
            New Invoice
          </button>
        </header>
        {invoices.length <= 0 && (
          <div className="p-6">
            <h1 className="text-sm text-center text-red-500">No Invoices Avilable</h1>
          </div>
        )}

        <Transition show={open}>
          <Dialog className="relative z-10" onClose={toggleCart}>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <DialogPanel className="flex w-full justify-center transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative flex max-w-5xl items-center overflow-hidden bg-gray-900 text-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={toggleCart}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <div className="border-b border-gray-900/10 pb-12">
                        {/* <h2 className="text-3xl font-bold leading-7">
                          Edit {invoice.invoice_number}
                        </h2> */}
                        <p className="pt-6 text-sm leading-6 text-blue-700">Bill To</p>

                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-sm font-normal">
                          {/*---First Name---*/}
                          <div className="sm:col-span-full">
                            <label htmlFor="first-name" className="block  leading-6">
                              Enter Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/*---Street Address---*/}
                          <div className="col-span-full">
                            <label htmlFor="street-address" className="block leading-6">
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/*---City---*/}
                          <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block leading-6">
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/*---Postal Code---*/}
                          <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block leading-6">
                              Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/*---Country---*/}
                          <div className="sm:col-span-2">
                            <label htmlFor="country" className="block leading-6">
                              Country
                            </label>
                            <div className="mt-2">
                              <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              >
                                <option>India</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                                <option>Duabi</option>
                              </select>
                            </div>
                          </div>
                          <p className="text-sm leading-6 text-blue-700">Bill From</p>
                          {/*---First Name---*/}
                          <div className="sm:col-span-full">
                            <label htmlFor="first-name" className="block leading-6">
                              Enter Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          {/*---Email Address---*/}
                          <div className="sm:col-span-full">
                            <label htmlFor="email" className="block leading-6">
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-sm py-1.5 bg-gray-500 text-black sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-white"
                            onClick={toggleCart}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleAddInvoice}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
        <table
          className="min-w-full divide-y divide-gray-200 border-separate"
          style={{ borderSpacing: '0 10px' }}
        >
          <tbody className="bg-gray-700 ">
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <Link to={`/${invoice.id}`} className="contents">
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
      </div>
    </div>
  );
}

export default Home;
