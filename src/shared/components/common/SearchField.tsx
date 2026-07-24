import type { ChangeEventHandler } from "react";

type SearchFieldProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

function SearchField({
  label,
  value,
  onChange,
  placeholder,
}: SearchFieldProps) {
  return (
    <label className="search-field">
      <span>{label}</span>

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default SearchField;
