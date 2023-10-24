import { useEffect, useState } from 'react';

export interface SelectProps {
  options: { value: string; label: string | JSX.Element }[];
  defaultValue: string;
  onChange: (value: string) => void;
}

export default function Select(props: SelectProps) {
  const [value, setValue] = useState(props.defaultValue);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <select
      className="mt-1 bg-bg"
      value={value}
      defaultValue={props.defaultValue}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange(e.target.value);
      }}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
