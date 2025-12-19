import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyPass() {
    const { id } = useParams();
    const [status, setStatus] = useState("Vérification en cours...");
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            setError("Utilisateur non authentifié");
            return;
        }

        console.log("TOKEN VALUE:", token, typeof token);

        fetch(
            `https://intramuscular-angelena-subdendroid.ngrok-free.dev/api/pass/verify-pass/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                //body: JSON.stringify()
            }
        )
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Erreur ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setResponse(data);
                setStatus(data.success ? "✅ Pass valide" : "❌ Pass invalide");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }, [id]);


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
