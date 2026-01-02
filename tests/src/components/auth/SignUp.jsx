import { useState } from "react";
import Input from "../Form";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import "../../styles/form.css"

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        try {
            const response = await fetch(
                "https://tiko-1-z4eh.onrender.com/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            if (!response.ok) {
                throw new Error("Identifiants invalide")
            }

            if (response.status === 201) {
                setFirstConnection(true)
                navigate("/login", {
                    state: { firstConnection: true }
                });
            }

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />

            {error && <p className="error">{error}</p>}

            <Button type="submit" disabled={loading}>
                {loading ? "Inscription..." : "S'inscrire"}
            </Button>

        </form>
    )

}

export default SignUp