import ColumnSchema from "../entities/ColumnSchema";

const NumberRenderer = (
  value: any,
  column: ColumnSchema,
  onUpdate: (newVal: any) => void
) => {
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
};

export default NumberRenderer;
