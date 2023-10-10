<template>
  <div id="app">

    <ul id="messages">
      Usuario
      <li v-for="message in messages" :key="message._id">{{ message.user }}: {{ message.message }}</li>
    </ul>
    <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Escribe un mensaje..." />
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      messageText: '',
      messages: []
    }
  },
  mounted () {
    // Configura la conexión con el servidor de Socket.io
    const socket = io('http://localhost:3000/v1/message')
  
    // Escucha eventos de chat desde el servidor
    socket.on('chat message', msg => {
      console.log(msg)
      this.messages.push(msg)
    })
  },
  methods: {
    sendMessage () {
      // Envia el mensaje al servidor
      if (this.messageText.trim() !== '') {
        const message = { user: 'Usuario', message: this.messageText }
        const socket = io('http://localhost:3000/v1/message/create')
        socket.emit('chat message', message)

        // Limpia el campo de entrada
        this.messageText = ''
      }
    }
  }
}
</script>

<style>
#messages {
  list-style-type: none;
}
</style>
