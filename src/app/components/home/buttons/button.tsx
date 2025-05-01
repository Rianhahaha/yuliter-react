import { ButtonHTMLAttributes } from "react";

interface ButtonDangerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonDanger({ children, className = "", ...props }: ButtonDangerProps) {
  return (
    <button
      {...props}
      className={`main-button ${className}`}
    >
      {children}
    </button>
  );
}
