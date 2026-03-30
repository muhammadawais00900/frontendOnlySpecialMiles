
const TableCard = ({ title, columns, rows, emptyMessage = 'No records found.' }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
    <div className="border-b border-slate-200 px-5 py-4">
      <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-3 font-medium">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={row.id || index} className="border-t border-slate-100">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 align-top text-slate-700">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-5 py-6 text-slate-500" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableCard;
