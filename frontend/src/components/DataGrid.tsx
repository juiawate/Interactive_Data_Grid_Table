import { useState, useEffect, ChangeEvent } from "react";
import Select, { components } from "react-select";
import ColumnSchema from "../entities/ColumnSchema";
import InputData from "../entities/InputData";
import UsersDropdown from "../entities/UsersDropdown";
import useUsers from "../hooks/useUsers";
import useData from "../hooks/useData";

const DataGrid = () => {
  //const [users, setUsers] = useState<Users>({});
  const { users, isLoading: userLoading } = useUsers();
  //const [inputData, setData] = useState<InputData[]>([]);
  //const [columns, setColumns] = useState<ColumnSchema[]>([]);
  const {
    inputData,
    columns,
    isLoading: dataLoading,
    error: dataError,
    setData,
  } = useData();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [availableUsers, setAvailableUsers] = useState<UsersDropdown[]>([]);

  useEffect(() => {
    if (Object.keys(users).length > 0) {
      let availableUsers: UsersDropdown[] = [];
      Object.keys(users).map((uId) => {
        let user = users[uId];
        availableUsers.push({
          value: uId,
          label: user.username,
          imageUrl: user.avatar,
        });
      });
      setAvailableUsers(availableUsers);
    }
  }, [users]);

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

  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <img
        src={props.data.imageUrl}
        alt={props.label}
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
      {props.label}
    </components.Option>
  );
  const CustomMultiValue = (props: any) => (
    <components.MultiValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={props.data.imageUrl}
          alt={props.data.label}
          style={{ width: 16, height: 16, marginRight: 4 }}
        />
        {props.data.label}
      </div>
    </components.MultiValue>
  );

  const handleCellUpdate = (
    rowId: string,
    column: ColumnSchema,
    newValue: any
  ) => {
    setData((prev) =>
      prev.map((p) => (p.id === rowId ? { ...p, [column.key]: newValue } : p))
    );
  };

  const columnRenderers: {
    [key: string]: (
      value: any,
      row: InputData,
      column: ColumnSchema,
      onUpdate: (newVal: any) => void
    ) => React.ReactNode;
  } = {
    number: (value, row, column, onUpdate) => {
      if (column.editable) {
        return (
          <input
            type="integer"
            key={column.key}
            value={value}
            onChange={(e) => onUpdate(e.target.value)}
          />
        );
      }
      return value;
    },
    string: (value, row, column, onUpdate) => {
      if (column.editable) {
        return (
          <input
            type="text"
            key={column.key}
            value={value}
            onChange={(e) => onUpdate(e.target.value)}
          />
        );
      }
      return value;
    },
    date: (value, row, column, onUpdate) => {
      return new Date(value).toLocaleDateString();
    },
    list: (value, row, column, onUpdate) => {
      if (Array.isArray(value)) {
        if (column.editable) {
          return (
            <Select
              isMulti
              options={availableUsers}
              value={availableUsers.filter((opt) =>
                value.includes(parseInt(opt.value))
              )}
              onChange={(selected) => {
                const values = selected.map((opt) => parseInt(opt.value));
                onUpdate(values);
              }}
              components={{
                Option: CustomOption,
                MultiValue: CustomMultiValue,
              }}
            />
          );
        }
        return (
          <div className="d-flex flex-row mb-3">
            {value.map((item: string, i: number) => (
              <span key={i} className="p-2">
                <img
                  src={users[item].avatar}
                  alt={users[item].username}
                  height="40px"
                  width="40px"
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#dee2e6",
                    padding: "5px",
                  }}
                />
                <span>{users[item].username}</span>
              </span>
            ))}
          </div>
        );
      }
      return value;
    },
  };

  const getCellRenderer = (
    column: ColumnSchema,
    value: string,
    row: InputData,
    onCellUpdate: (field: string, newVal: any) => void
  ) => {
    if (value === null || value === undefined) return "";

    if (columnRenderers[column.type]) {
      return columnRenderers[column.type](value, row, column, (newVal) =>
        onCellUpdate(column.key, newVal)
      );
    }

    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "number") return parseInt(value);
    return String(value);
  };

  return (
    <div className="table-responsive">
      {userLoading || dataLoading ? (
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
                    {getCellRenderer(
                      column,
                      data[column.key],
                      data,
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
