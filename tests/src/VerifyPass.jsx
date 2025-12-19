import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyPass() {
    const { id } = useParams();
    const [status, setStatus] = useState("Vérification en cours...");
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const verifyPass = async () => {
            try {
                if (!token) {
                    setError("Utilisateur non authentifié");
                    return;
                }

                const res = await fetch(
                    `https://intramuscular-angelena-subdendroid.ngrok-free.dev/api/pass/verify-pass/${id}`,
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Erreur ${res.status}`);
                }

                const data = await res.json();

                setResponse(data);
                setStatus(data.success ? "✅ Pass valide" : "❌ Pass invalide");

            } catch (error) {
                console.error("VerifyPass error:", error);
                setError(error.message);
            }
        };

        verifyPass();
    }, [id, token]);



    if (error) return <p>Error : {error}, Token : {token}, typeof : {typeof token}</p>;
    if (!response) return <p>Chargement...</p>;

    return (
        <div>
            <pre>Token : {token}</pre>
            <h2>{status}</h2>

            {/* DEBUG UNIQUEMENT */}
            <pre>Response : {JSON.stringify(response, null, 2)}</pre>
        </div>
    );
}

export default VerifyPass;
