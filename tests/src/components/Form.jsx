function Input({ ...props }) {
    return (
        <input
            className={className}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input;

