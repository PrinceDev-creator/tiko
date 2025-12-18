import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyPass() {
    const { id } = useParams();
    const [status, setStatus] = useState("Vérification en cours...");
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"))


    useEffect(() => {
        console.log('token : ', token)
        // if (!token) {
        //     setError("Utilisateur non authentifié");
        //     return;
        // }

        fetch(`https://192.168.1.196:3000/api/pass/verify-pass/6941cc25a8bee16d89d9cd26`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setResponse(data);

                if (data.success) {
                    setStatus("✅ Pass valide");
                } else {
                    setStatus("❌ Pass invalide");
                }
            })
            .catch(() => {
                setError("Erreur serveur");
            });
    }, [id, token]);

    if (error) return <p>{error}</p>;
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
