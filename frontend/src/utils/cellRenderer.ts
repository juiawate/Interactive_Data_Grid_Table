import ListRenderer from "../components/ListRenderer";
import NumberRenderer from "../components/NumberRenderer";
import StringRenderer from "../components/StringRenderer";
import ColumnSchema from "../entities/ColumnSchema";
import UsersDropdown from "../entities/UsersDropdown";
import Users from "../entities/User";

const cellRenderer = (
    column: ColumnSchema,
    value: string,
    users: Users,
    availableUsers: UsersDropdown[],
    onCellUpdate: (field: string, newVal: any) => void
  ) => {
    if (value === null || value === undefined) return "";

    switch (column.type) {
        case "number": 
            return NumberRenderer(value, column, (newVal) =>
                onCellUpdate(column.key, newVal)
            )
        case "string": 
            return StringRenderer(value, column, (newVal) =>
                onCellUpdate(column.key, newVal)
            )
        case "list":
            return ListRenderer(value, column, users, availableUsers, (newVal) =>
                onCellUpdate(column.key, newVal)
            )
        case "date":
            return new Date(value).toLocaleDateString();
        default:
            return String(value);
    }

  };

  export default cellRenderer;