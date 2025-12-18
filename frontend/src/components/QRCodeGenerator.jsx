import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, CheckCircle, Scan } from 'lucide-react';

function QRCodeGenerator() {
    const [url] = useState('http://localhost:3000/api/pass/verify-pass/693d7140a9cc10c7630c02c5');
    const [copied, setCopied] = useState(false);
    const qrRef = useRef(null);
    const [qrSize, setQrSize] = useState(256);
    const [qrColor, setQrColor] = useState('#007AFF');
    const [bgColor, setBgColor] = useState('#FFFFFF');

    const handleDownloadSVG = () => {
        const svg = document.getElementById('qr-code-svg');
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'qr-code.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPNG = () => {
        const canvas = document.getElementById('qr-code-canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const handleCopyURL = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handlePrint = () => {
        const printContent = `
      <html>
        <head>
          <title>QR Code - Vérification Pass</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              text-align: center; 
              padding: 40px;
            }
            .qr-code { 
              margin: 20px auto; 
            }
            .url { 
              color: #666; 
              margin-top: 20px;
              font-size: 12px;
              word-break: break-all;
            }
            h1 { color: #1d1d1f; }
          </style>
        </head>
        <body>
          <h1>QR Code de vérification</h1>
          <div class="qr-code">${document.getElementById('qr-code-svg').outerHTML}</div>
          <p class="url">${url}</p>
          <p>Scannez ce QR code pour vérifier le pass</p>
        </body>
      </html>
    `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.headerIcon}>
                        <Scan size={24} />
                    </div>
                    <div>
                        <h1 style={styles.title}>QR Code Generator</h1>
                        <p style={styles.subtitle}>Générateur de QR code pour vérification de pass</p>
                    </div>
                </div>

                <div style={styles.mainContent}>
                    <div style={styles.qrSection}>
                        <div style={styles.qrContainer}>
                            {/* SVG pour téléchargement vectoriel */}
                            <QRCodeSVG
                                id="qr-code-svg"
                                value={url}
                                size={qrSize}
                                level="H"
                                includeMargin={true}
                                bgColor={bgColor}
                                fgColor={qrColor}
                                style={{ display: 'none' }}
                            />

                            {/* Canvas pour téléchargement PNG */}
                            <QRCode
                                id="qr-code-canvas"
                                value={url}
                                size={qrSize}
                                level="H"
                                includeMargin={true}
                                bgColor={bgColor}
                                fgColor={qrColor}
                                style={styles.qrCode}
                            />
                        </div>

                        <div style={styles.controls}>
                            <div style={styles.controlGroup}>
                                <label style={styles.controlLabel}>Taille : {qrSize}px</label>
                                <input
                                    type="range"
                                    min="128"
                                    max="512"
                                    step="32"
                                    value={qrSize}
                                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                                    style={styles.slider}
                                />
                            </div>

                            <div style={styles.colorControls}>
                                <div style={styles.colorControl}>
                                    <label style={styles.controlLabel}>Couleur QR</label>
                                    <input
                                        type="color"
                                        value={qrColor}
                                        onChange={(e) => setQrColor(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                </div>

                                <div style={styles.colorControl}>
                                    <label style={styles.controlLabel}>Fond</label>
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.infoSection}>
                        <div style={styles.urlSection}>
                            <div style={styles.sectionHeader}>
                                <h3 style={styles.sectionTitle}>URL de redirection</h3>
                                <button
                                    onClick={handleCopyURL}
                                    style={styles.copyButton}
                                >
                                    {copied ? (
                                        <CheckCircle size={16} />
                                    ) : (
                                        <Copy size={16} />
                                    )}
                                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                                </button>
                            </div>
                            <div style={styles.urlBox}>
                                <code style={styles.urlText}>{url}</code>
                            </div>
                        </div>

                        <div style={styles.details}>
                            <h3 style={styles.sectionTitle}>Détails techniques</h3>
                            <div style={styles.detailsGrid}>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Méthode HTTP</span>
                                    <span style={styles.detailValue}>GET</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Correction erreur</span>
                                    <span style={styles.detailValue}>Haute (30%)</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Version QR</span>
                                    <span style={styles.detailValue}>Auto</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Format</span>
                                    <span style={styles.detailValue}>URL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.actions}>
                    <button
                        onClick={handleDownloadPNG}
                        style={styles.buttonPrimary}
                    >
                        <Download size={18} />
                        Télécharger PNG
                    </button>

                    <button
                        onClick={handleDownloadSVG}
                        style={styles.buttonSecondary}
                    >
                        <Download size={18} />
                        Télécharger SVG
                    </button>

                    <button
                        onClick={handlePrint}
                        style={styles.buttonTertiary}
                    >
                        Imprimer
                    </button>
                </div>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        <Scan size={14} style={{ marginRight: 8 }} />
                        Scannez ce QR code avec l'appareil photo de votre téléphone pour être redirigé automatiquement
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        padding: '40px',
        maxWidth: '900px',
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.04)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '40px',
    },
    headerIcon: {
        backgroundColor: '#007AFF',
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1d1d1f',
        margin: '0',
        letterSpacing: '-0.5px',
    },
    subtitle: {
        fontSize: '16px',
        color: '#86868b',
        margin: '4px 0 0 0',
        fontWeight: '400',
    },
    mainContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '40px',
    },
    qrSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    qrContainer: {
        backgroundColor: '#fbfbfd',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #e1e1e6',
        minHeight: '350px',
    },
    qrCode: {
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    controlGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    controlLabel: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1d1d1f',
    },
    slider: {
        width: '100%',
        height: '6px',
        borderRadius: '3px',
        backgroundColor: '#e1e1e6',
        outline: 'none',
        appearance: 'none',
    },
    colorControls: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    colorControl: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    colorPicker: {
        width: '100%',
        height: '40px',
        borderRadius: '8px',
        border: '2px solid #e1e1e6',
        cursor: 'pointer',
        padding: '0',
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
    },
    urlSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1d1d1f',
        margin: '0',
    },
    copyButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#f5f5f7',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#007AFF',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    urlBox: {
        backgroundColor: '#f5f5f7',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e1e1e6',
        overflow: 'hidden',
    },
    urlText: {
        fontSize: '13px',
        color: '#1d1d1f',
        margin: '0',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        lineHeight: '1.6',
        wordBreak: 'break-all',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    detailItem: {
        backgroundColor: '#fbfbfd',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #e1e1e6',
    },
    detailLabel: {
        display: 'block',
        fontSize: '12px',
        color: '#86868b',
        fontWeight: '500',
        marginBottom: '4px',
    },
    detailValue: {
        display: 'block',
        fontSize: '16px',
        fontWeight: '600',
        color: '#1d1d1f',
    },
    actions: {
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
    },
    buttonPrimary: {
        flex: 1,
        backgroundColor: '#007AFF',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '16px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s',
    },
    buttonSecondary: {
        flex: 1,
        backgroundColor: 'white',
        color: '#007AFF',
        border: '2px solid #007AFF',
        borderRadius: '12px',
        padding: '16px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s',
    },
    buttonTertiary: {
        backgroundColor: '#f5f5f7',
        color: '#1d1d1f',
        border: 'none',
        borderRadius: '12px',
        padding: '16px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        minWidth: '120px',
    },
    footer: {
        paddingTop: '24px',
        borderTop: '1px solid #e1e1e6',
    },
    footerText: {
        fontSize: '14px',
        color: '#86868b',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

// Ajout des styles pour le slider
const sliderStyles = document.createElement('style');
sliderStyles.textContent = `
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007AFF;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007AFF;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
  }
  
  button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  .copyButton:hover {
    background-color: #e5e5ea;
  }
  
  .buttonPrimary:hover {
    background-color: #0056CC;
  }
  
  .buttonSecondary:hover {
    background-color: #f0f7ff;
  }
  
  .buttonTertiary:hover {
    background-color: #e5e5ea;
  }
`;
document.head.appendChild(sliderStyles);

export default QRCodeGenerator;