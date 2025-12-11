const Button = ({
  children,
  cssClasses,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`flex justify-center gap-2 items-center border-none text-base ${cssClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
