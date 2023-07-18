import React from "react";

function Input({
  label,
  placeholder,
  value,
  cb,
  type,
  name,
  leftIcon,
  rightIcon,
  options,
  disabled,
  defaultValue,
  required,
}) {
  return (
    <div className={`space-y-2 ${type === 'textarea' && 'col-span-2'}`}>
      <label className="font-semibold">{label}{required && <span className="text-red-600 ">*</span>}</label>
      <div className="w-full input-div">
        {leftIcon}
        {type === "select" ? (
          <select
            required={required}
            defaultValue={defaultValue}
            value={value}
            onChange={(e) => cb((prev) => e.target.value)}
            name={name}
            type={type}
            className=" w-full outline-none text-black"
            id={name}
            placeholder={placeholder}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            required={required}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onChange={(e) => cb((prev) => e.target.value)}
            name={name}
            type={type}
            className=" w-full outline-none"
            id={name}
            placeholder={placeholder}
          />
        ) : (
          <input
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onChange={(e) => cb((prev) => e.target.value)}
            name={name}
            type={type}
            className=" w-full outline-none"
            id={name}
            placeholder={placeholder}
            required={required}
          />
        )}
        {rightIcon}
      </div>
    </div>
  );
}

export default Input;
