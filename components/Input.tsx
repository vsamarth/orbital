import React from "react";

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => (
    <div>
      <input
        ref={ref}
        className="bg-transparent border px-4 h-12 w-80 outline-none text-slate-700"
        placeholder={label}
        {...props}
      />
    </div>
  )
);

export default Input;
