import { memo } from "react";
import type { ChangeEventHandler } from "react";

type TaskSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function TaskSearch({ value, onChange }: TaskSearchProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
  };

  return (
    <label>
      <span>Buscar por título</span>

      <input
        data-cy="task-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Ej. diseño"
      />
    </label>
  );
}

export default memo(TaskSearch);
