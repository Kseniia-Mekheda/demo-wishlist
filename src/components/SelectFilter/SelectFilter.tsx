import type { SelectFilterProps } from "~/types/common/interfaces";

const SelectFilter = ({ label, value, options, onChange }: SelectFilterProps) => {
  return (
    <div className="relative inline-block w-48">
      <label htmlFor={label}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;