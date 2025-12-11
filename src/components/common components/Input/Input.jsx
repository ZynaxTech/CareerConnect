import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Input = ({
  togglePassword,
  onChange,
  name,
  type,
  icon,
  value,
  placeholder,
  password = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-center px-3 py-2 border border-grayWood rounded-lg w-full">
      {icon && icon}
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className="border-none focus:ring-0 focus:outline-none pl-3 pr-3 bg-white placeholder:text-gray-400 w-full"
      />
      {password ? ( 
        <button type="button" onClick={togglePassword}>
          {type === "text" ? <IoEyeOff className="text-gray-500 text-lg"/> : <IoEye className="text-gray-500 text-lg"/>}
        </button>
      ) : null}
    </div>
  );
};

export default Input;
