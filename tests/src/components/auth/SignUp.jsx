import { useState } from "react";
import { response } from "../../../../src/app";
import Login from "./Login";
import { firstConnection, setFirstConnection } from "../../datas/sharingDatas";
import Input from "../Form";
import "../styles/form.css"

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

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

            if (response.status == 200) {
                setFirstConnection(true)
                navigate("/login");
            }

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <form action="submit" className="form-container">
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

                <Button disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </Button>

            </form>
        </Fragment>
    )

}

export default SignUp