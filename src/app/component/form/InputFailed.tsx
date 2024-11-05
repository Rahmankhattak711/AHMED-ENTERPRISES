import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder = '',
  type = 'text',
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border p-2 w-full"
        {...rest}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
