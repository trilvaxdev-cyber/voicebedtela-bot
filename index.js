const { createClient } = require('bedrock-protocol')

const client = createClient({
  host: 'Voice-WD27.aternos.me',
  port: 56379,
  username: 'VoiceBot',
  offline: true
})

client.on('join', () => {
  console.log('✅ Bot entrou no PocketMine!')
})

client.on('disconnect', (packet) => {
  console.log('❌ Bot desconectado:', packet?.reason)
})

client.on('error', (err) => {
  console.error('Erro:', err)
})
