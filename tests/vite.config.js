import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // nécessaire pour accéder via IP locale ou Ngrok
        port: 5173,
        allowedHosts: [
            '*'
            //'intramuscular-angelena-subdendroid.ngrok-free.dev'
        ],
        //si tu utilises HTTPS local :
        https: {
            key: fs.readFileSync('./certs/localhost-key.pem'),
            cert: fs.readFileSync('./certs/localhost.pem'),
        }
    }
})
