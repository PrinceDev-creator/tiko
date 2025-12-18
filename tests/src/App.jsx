import { QRCodeCanvas } from "qrcode.react";

const token = localStorage.getItem("token")

function App() {
    return (
        <div style={styles.container}>
            <pre>Token: {token}</pre>
            {/* <QRCodeCanvas
                value={`${window.location.origin}/verify-pass/${passId}`}
                size={250}
            /> */}
            <QRCodeCanvas
                value="https://intramuscular-angelena-subdendroid.ngrok-free.dev/api/verify-pass/6941cc25a8bee16d89d9cd26"
                size={250}
            />


            <p style={styles.text}>Scannez-moi</p>
        </div>
    );
}


const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        marginTop: '20px',
        color: '#666',
        fontSize: '14px'
    }
};

export default App;