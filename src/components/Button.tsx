import React, { useEffect, useState } from "react";
import "../style/Button.css";

type ButtonProps = {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isRed?: boolean;
  otherClasses?: string;
};

const Button = ({ title, icon, onClick, isRed, otherClasses }: ButtonProps) => {
  const [safeOtherClasses, setSafeOtherClasses] = useState(
    "m-ho8 custom-button " + (isRed ? "bg-danger " : "bg-success ")
  );

  useEffect(() => {
    if (otherClasses) {
      setSafeOtherClasses(
        (safeOtherClasses) => safeOtherClasses + otherClasses
      );
    }
  }, [otherClasses]);

  return (
    <button className={safeOtherClasses} onClick={onClick}>
      {icon} {title}
    </button>
  );
};

export default Button;
