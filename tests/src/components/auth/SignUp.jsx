import { useState } from "react";
import Input from "../Form";
import Button from "../Button";
import DotsLoader from "../DotsLoader";
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
                setEmail("")
                setPassword("")
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
        <form onSubmit={handleSubmit} className="form">

            <h2>Inscription</h2>

            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />

            {error && <p className="error">{error}</p>}

            {loading
                ? <DotsLoader />
                : <Button type="submit" disabled={loading}>
                    S'inscrire
                </Button>
            }

        </form>
    )

}

export default SignUp