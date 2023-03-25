import React from "react";

const Table = ({ rows, columns, hasEdit = false, handleOnEdit }) => {
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
    <table className="min-w-full divide-y divide-x divide-gray-200">
      <thead className="px-6 bg-gray-200 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
          {hasEdit && <th>Edit</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-x divide-gray-200">
        {rows.map((row, index) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column} className="border-l-2">
                {renderColumnItem(column, row, index)}
              </td>
            ))}
            {hasEdit && (
              <td
                onClick={() => handleOnEdit(row)}
                className="cursor-pointer border-l-2"
              >
                edit
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
