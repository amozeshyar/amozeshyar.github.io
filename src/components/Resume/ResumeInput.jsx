import CustomDatePicker from '../custom/CustomDatePicker/CustomDatePicker';

export default function ResumeInput({
  label,
  name,
  onChange,
  type,
  className,
  placeholder,
  innerRef,
  value,
  defaultValue,
  ...props
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      {type === 'date' ? (
        <CustomDatePicker
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          aria-label={name}
          className={`py-2 px-4 text-sm rounded-xl bg-gray-400 focus:outline-none focus:outline-gray-500 placeholder-gray-800 ${className}`}
          onChange={onChange}
          value={value}
          {...props}
          ref={innerRef}
        />
      )}
    </div>
  );
}
