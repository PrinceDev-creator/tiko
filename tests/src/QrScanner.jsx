import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QrScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: 250,
                rememberLastUsedCamera: true,
            },
            false
        );

        scanner.render(
            (decodedText) => {
                console.log("QR détecté :", decodedText);

                scanner.clear();

                // redirection vers l’URL scannée
                window.location.href = decodedText;
            },
            (error) => {
                // erreurs silencieuses (normal)
            }
        );

        return () => {
            scanner.clear().catch(() => { });
        };
    }, []);

    return (
        <div>
            <h2>Scanner un QR Code</h2>
            <div id="qr-reader" style={{ width: "300px" }} />
        </div>
    );
}

export default QrScanner;
