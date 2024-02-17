import buttonStyle from "./Button.module.css";

const Button = ({ icon, name, isOutline, ...rest }) => {
  return (
    <div>
      <button
        {...rest}
        className={
          isOutline
            ? `${buttonStyle.outline_btn}`
            : `${buttonStyle.primary_btn}`
        }
      >
        {icon} {name}
      </button>
    </div>
  );
};

export default Button;
