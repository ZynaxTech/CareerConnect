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
      className={`border-none text-base text-center ${cssClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
