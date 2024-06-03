import React from 'react';

const invoiceData = [
  {
    invoice_number: '#RT3080',
    due_date: '19 Aug 2021',
    customer: 'Jensen Huang',
    total_amount: '£1,800.90',
    status: 'Paid',
    id: '4259',
  },
  {
    invoice_number: '#XM9141',
    due_date: '20 Sep 2021',
    customer: 'Alex Grim',
    total_amount: '£556.00',
    status: 'Pending',
    id: '4912',
  },
  {
    invoice_number: '#RG0314',
    due_date: '01 Oct 2021',
    customer: 'John Morrison',
    total_amount: '£14,002.33',
    status: 'Paid',
    id: 'c711',
  },
  {
    invoice_number: '#RT2080',
    due_date: '12 Oct 2021',
    customer: 'Alysa Werner',
    total_amount: '£102.04',
    status: 'Pending',
    id: '2e45',
  },
  {
    invoice_number: 'AA1449',
    due_date: '14 Oct 2021',
    customer: 'Mellisa Clarke',
    total_amount: '£4,032.33',
    status: 'Pending',
    id: 'f9e5',
  },
  {
    invoice_number: 'TY9141',
    due_date: '31 Oct 2021',
    customer: 'Thomas Wayne',
    total_amount: '£ 6,155.91',
    status: 'Pending',
    id: 'e69c',
  },
  {
    invoice_number: '#V2353',
    due_date: '12 Nov 2021',
    customer: 'Anita Wainwright',
    total_amount: '£ 3,102.04',
    status: 'Draft',
    id: '1c21',
  },
];

export default function Home() {
  console.log(invoiceData);
  return (
    <>
      <main className="bg-gray-900 min-h-screen">
        <div className="flex gap-x-60">
          <p className="font-extrabold text-white text-3xl">Invoices</p>
          <div className="text-white text-sm">
            <p>Filter by status</p>
            <button className="rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <button className="rounded-full bg-white text-blue-900">+</button>
              New Invoice
            </button>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100 border rounded-lg p-10 m-10 text-white">
          {invoiceData.map(data => (
            <li key={data.invoice_number} className="flex justify-between py-5 rounded-md gap-5 text-white">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex gap-6">
                  <p className="text-lg font-semibold leading-6">{data.invoice_number}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.due_date}</p>
                  <p className="text-sm leading-6 ">{data.customer}</p>
                  <p className="text-lg font-bold">{data.total_amount}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                {data.status ? (
                  <p className="mt-1 text-xs leading-5 text-yellow-700">
                    <time dateTime={data.lastSeenDateTime}>{data.status}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
