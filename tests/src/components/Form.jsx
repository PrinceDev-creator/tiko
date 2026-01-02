function Input({ className, type = "text", ...props }) {
    return (
        <input
            className={className}
            type={type}
            {...props}
            required
        />
    )
}

export default Input;

