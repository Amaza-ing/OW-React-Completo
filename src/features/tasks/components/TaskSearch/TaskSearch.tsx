import { memo } from "react";
import type { ChangeEventHandler } from "react";

type TaskSearchProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};

function TaskSearch({
  value,
  onChange,
  label = "Buscar por título",
  placeholder = "Ej. diseño",
}: TaskSearchProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
  };

  return (
    <label>
      <span>{label}</span>

      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default memo(TaskSearch);
