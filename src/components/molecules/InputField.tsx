import React, { FC, ReactNode } from "react";

interface InputFieldProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const InputField: FC<InputFieldProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex items-center gap-5">
      <div className="w-1/3 space-y-2">
        <h2 className="font-bold text-xl text-primary">{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="w-2/3">{children}</div>
    </div>
  );
};

export default InputField;
