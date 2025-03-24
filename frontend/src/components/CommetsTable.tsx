import { Commet } from '@/types/commet';

interface CommetsTableProps {
  commets: Commet[];
  summary: {
    totalDeals: number;
    totalAmount: number;
    totalCommissions: number;
  };
}

export const CommetsTable = ({ commets, summary }: CommetsTableProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Deals</h3>
          <p className="text-2xl font-bold text-blue-600">{summary.totalDeals}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Commissions</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${summary.totalCommissions.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Salesperson
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Commission
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {commets.map((commet) => (
              <tr key={commet.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {commet.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ${commet.amount.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {commet.salesperson}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {new Date(commet.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ${commet.commission.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
