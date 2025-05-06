import ColumnSchema from "../entities/ColumnSchema";

const StringRenderer = (
  value: any,
  column: ColumnSchema,
  onUpdate: (newVal: any) => void
) => {
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
};

export default StringRenderer;
