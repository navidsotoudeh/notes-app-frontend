import React from "react";

const Table = ({ rows, columns }) => {
  const renderColumnItem = (Column, Row, idx) => {
    if (Row.isLoading) return "is loading ...";

    if (typeof Row[Column] === "string")
      return <p variant="subtitle1">{Row[Column]}</p>;

    if (typeof Column === "function") return <Column item={Row} idx={idx} />;
    if (Array.isArray(Row[Column])) {
      const data = Row[Column].map((ele, idx) => {
        return <p key={idx}>{ele}</p>;
      });
      return data;
    }

    return "";
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, index) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td
                key={column}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {renderColumnItem(column, row, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
