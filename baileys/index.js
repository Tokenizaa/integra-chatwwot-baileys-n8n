// index.js - Baileys WhatsApp Client
const { default: makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys');
const QRCode = require('qrcode-terminal');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('sessions');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            QRCode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            console.log('Conexão fechada, reconectando...');
            connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('Conexão aberta com sucesso!');
        }
    });
    
    // Escutar mensagens
    sock.ev.on('messages.upsert', async (m) => {
        console.log('Nova mensagem recebida:', JSON.stringify(m, undefined, 2));
    });
}

connectToWhatsApp().catch(err => console.error('Erro ao conectar:', err));