function Button({ loading, onClick, children }) {
    return (
        <button type="submit" onClick={onClick} disabled={loading}>{children}</button>
    )
}

export default Button