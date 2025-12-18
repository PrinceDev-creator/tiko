import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { Fragment } from "react"

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(
                "tiko-699g-1mkrk1hdm-princedev-creators-projects.vercel.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            setResponse(response);

            if (!response.ok) {
                throw new Error("Identifiants invalides");
            }

            const data = await response.json();

            // 1️⃣ Stockage du token
            localStorage.setItem("token", data.token);

            // 2️⃣ Redirection immédiate vers la page de scan
            navigate("/scan");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        form: {
            maxWidth: "300px",
            margin: "50px auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        error: {
            color: "red",
            fontSize: "14px",
        },
    };


    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Connexion</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <p>Response : {response}</p>
            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
            </button>
        </form>
    );
}

export default Login;





// function Login() {
//     return <Fragment>
//         <div>Bonjour</div>
//     </Fragment>
// }

// export default Login

