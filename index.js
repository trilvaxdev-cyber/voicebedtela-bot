const { createClient } = require('bedrock-protocol')

const client = createClient({
  host: process.env.MC_HOST || 'Voice-WD27.aternos.me',
  port: Number(process.env.MC_PORT) || 56379,
  username: 'VoiceBot'
})

client.on('join', () => {
  console.log('✅ Bot entrou no servidor!')

  // Mensagem ao entrar
  client.queue('text', {
    type: 'chat',
    needs_translation: false,
    source_name: 'VoiceBot',
    message: '🤖 VoiceBot online!'
  })

  startAntiAFK()
})

/* =========================
   📩 RESPONDER CHAT
========================= */
client.on('text', (packet) => {
  if (!packet.message || packet.source_name === 'VoiceBot') return

  const msg = packet.message.toLowerCase()
  const player = packet.source_name

  console.log(`[CHAT] ${player}: ${packet.message}`)

  if (msg.includes('oi') || msg.includes('olá')) {
    sendChat(`👋 Olá, ${player}!`)
  }

  if (msg.includes('bot')) {
    sendChat(`🤖 Estou ativo e funcionando!`)
  }

  if (msg.includes('hora')) {
    sendChat(`⏰ Hora atual: ${new Date().toLocaleTimeString()}`)
  }
})

function sendChat(text) {
  client.queue('text', {
    type: 'chat',
    needs_translation: false,
    source_name: 'VoiceBot',
    message: text
  })
}

/* =========================
   🏃‍♂️ ANTI-AFK (ANDAR + PULAR)
========================= */
function startAntiAFK() {
  let direction = 1

  setInterval(() => {
    // Anda para frente / trás
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: direction === 1 ? 0 : 180,
      position: client.position,
      move_vector: { x: 0, y: 0, z: direction },
      head_yaw: 0,
      input_data: {
        forward: true
      }
    })

    direction *= -1
  }, 4000)

  setInterval(() => {
    // Pular
    client.queue('player_auth_input', {
      pitch: 0,
      yaw: 0,
      position: client.position,
      move_vector: { x: 0, y: 1, z: 0 },
      input_data: {
        jump: true
      }
    })
  }, 7000)

  console.log('🟢 Anti-AFK ativado')
}

/* =========================
   ❌ ERROS / DISCONNECT
========================= */
client.on('disconnect', (packet) => {
  console.log('❌ Bot desconectado:', packet?.reason)
})

client.on('error', (err) => {
  console.error('Erro:', err)
})
