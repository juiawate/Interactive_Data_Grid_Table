import ColumnSchema from "../entities/ColumnSchema";
import Select, { components } from "react-select";
import UsersDropdown from "../entities/UsersDropdown";
import Users from "../entities/User";

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

const ListRenderer = (
  value: any,
  column: ColumnSchema,
  users: Users,
  availableUsers: UsersDropdown[],
  onUpdate: (newVal: any) => void
) => {
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
};

export default ListRenderer;
