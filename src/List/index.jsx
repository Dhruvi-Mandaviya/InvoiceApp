import React from 'react';

function list() {
  return (
    <div>
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
    </div>
  )
}

export default list;