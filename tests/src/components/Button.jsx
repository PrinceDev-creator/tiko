function Button({ loading, children }) {
    return (
        <button type="submit" disabled={loading}>{children}</button>
    )
}

export default Button