import HidePass from "../../../assets/hide-password.svg";
import ShowPass from "../../../assets/show-password.svg";
const Input = ({
  togglePassword,
  onChange,
  name,
  type,
  image,
  value,
  placeholder,
  password = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-center px-2 py-2 border border-grayWood rounded-lg w-full">
      {image && <img src={image} alt="mail image" className="h-5 w-5" />}
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className="border-none focus:ring-0 focus:outline-none pl-3 bg-white placeholder:text-gray-400 w-full"
      />
      {password ? (
        <button type="button" onClick={togglePassword}>
          <img
            src={type === "text" ? HidePass : ShowPass}
            alt="hide password"
            height={28}
            width={28}
          />
        </button>
      ) : null}
    </div>
  );
};

export default Input;
