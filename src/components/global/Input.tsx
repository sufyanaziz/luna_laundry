import React from "react";

import styled from "styled-components";

interface SelecProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  values: string[];
  value: string;
  sort?: {
    value: string[] | "num";
    by: "ASC" | "DEC";
  };
  label?: string;
  isRemoveLabel?: boolean;
}

export const SelectInput: React.FC<SelecProps> = ({
  onChange,
  values,
  value,
  sort,
  label,
  isRemoveLabel = false,
}) => {
  const sortedInput: string[] =
    sort?.value === "num"
      ? sort?.by === "DEC"
        ? values.sort((a: any, b: any) => b - a)
        : values.sort((a: any, b: any) => a - b)
      : [];

  return (
    <StyledSelect onChange={onChange} value={value}>
      {!isRemoveLabel && <option value="">{label}</option>}
      {sort === undefined
        ? values.map(value => {
            return (
              <React.Fragment key={value}>
                <option value={value}>{value}</option>
              </React.Fragment>
            );
          })
        : sortedInput.map(value => {
            return (
              <React.Fragment key={value}>
                <option value={value}>{value}</option>
              </React.Fragment>
            );
          })}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

interface PropsTextField {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  type: "text" | "password";
  placeholder?: string;
}

export const TextField: React.FC<PropsTextField> = ({
  onChange,
  value,
  className,
  style,
  type,
  placeholder,
}) => {
  return (
    <StyledTextField
      onChange={onChange}
      value={value}
      className={className}
      style={style}
      type={type}
      placeholder={placeholder}
    />
  );
};

const StyledTextField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

interface RadioInputProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  label?: string;
  checked?: boolean | undefined;
  id: string;
  onClickLabel?: () => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  value,
  onChange,
  style,
  className,
  label,
  checked,
  id,
  onClickLabel,
}) => {
  return (
    <StyledRadioInput>
      <input
        id={id}
        className={className}
        type="radio"
        value={value}
        onChange={onChange}
        style={style}
        checked={checked}
      />
      <label onClick={onClickLabel}>{label}</label>
    </StyledRadioInput>
  );
};

const StyledRadioInput = styled.div`
  input {
    margin-right: 10px;
  }
`;
