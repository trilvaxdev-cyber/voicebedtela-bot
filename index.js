const { createClient } = require('bedrock-protocol')

const client = createClient({
  host: process.env.MC_HOST || 'SEU_IP_AQUI',
  port: Number(process.env.MC_PORT) || 19132,
  username: 'VoiceBot'
})

client.on('join', () => {
  console.log('✅ Bot entrou no servidor!')
})

client.on('disconnect', (packet) => {
  console.log('❌ Bot desconectado:', packet?.reason)
})

client.on('error', (err) => {
  console.error('Erro:', err)
})
