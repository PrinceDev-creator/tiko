function Input({ className, ...props }) {
    return (
        <input
            className={className}
            type="text"
            {...props}
            required
        />
    )
}

export default Input;

