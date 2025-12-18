import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { SelectFilterProps } from "~/types/common/interfaces";

const SelectFilter = ({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps) => {
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="inline-flex items-center gap-2 me-4 mb-2">
      <label className="text-sm font-medium">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="flex items-center justify-between gap-2 bg-white border rounded-xl px-4 py-2 text-sm cursor-pointer focus:outline-none min-w-35">
            <span>{selectedOption?.label}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `px-4 py-2 text-sm cursor-pointer flex items-center justify-between
                   ${active ? "bg-[#D4D4FA]" : ""}
                   ${selected ? "text-[#1C1E87] font-medium" : "text-gray-700"}`
                }
              >
                {({ selected }) => (
                  <>
                    <span>{option.label}</span>
                    {selected && (
                      <CheckIcon className="w-4 h-4 text-[#1C1E87]" />
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectFilter;
