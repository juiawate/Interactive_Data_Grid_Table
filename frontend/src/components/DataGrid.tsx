import { useState, ChangeEvent } from "react";
import ColumnSchema from "../entities/ColumnSchema";
import useUsers from "../hooks/useUsers";
import useData from "../hooks/useData";
import cellRenderer from "../utils/cellRenderer";

const DataGrid = () => {
  const { users, availableUsers, isLoading: userLoading } = useUsers();
  const {
    inputData,
    columns,
    isLoading: dataLoading,
    error: dataError,
    setData,
  } = useData();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedRows = new Set<string>();

    if (event.target.checked) {
      inputData.forEach((data) => {
        newSelectedRows.add(data.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectChange = (id: string) => {
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }

    setSelectedRows(newSelectedRows);
  };

  const handleCellUpdate = (
    rowId: string,
    column: ColumnSchema,
    newValue: any
  ) => {
    setData((prev) =>
      prev.map((p) => (p.id === rowId ? { ...p, [column.key]: newValue } : p))
    );
  };

  return (
    <div className="table-responsive">
      {(Object.keys(users).length > 0 && userLoading) || dataLoading ? (
        <p>Loading data...</p>
      ) : (
        <table className="table caption-top table-striped table-fixed table-bordered table-hover">
          <caption>Interactive Data Grid</caption>
          <thead className="thead-dark">
            <tr>
              <th className="text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={inputData.length === selectedRows.size}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={
                    column.type === "list" ? "text-center w-25" : "text-center"
                  }
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inputData.map((data, index) => (
              <tr key={index}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectChange(data.id)}
                    checked={selectedRows.has(data.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={
                      column.type === "list"
                        ? "text-center w-25"
                        : "text-center"
                    }
                  >
                    {cellRenderer(
                      column,
                      data[column.key],
                      users,
                      availableUsers,
                      (key, newVal) => handleCellUpdate(data.id, column, newVal)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataGrid;
