const express=require('express')
const app=express()
const server=require('http').createServer(app)
const socketIo=require('socket.io')
const path = require('path');
const io=new socketIo.Server(server)
app.use(express.static(path.join(__dirname,'../public')));
io.on('connection',(socket)=>{
    //console.log('New client connected');
    socket.on('connection',(name)=>{
        io.emit('connection',name)
        console.log(name,' has joined')
    })
    socket.on('chat',(payload)=>{
        console.log(payload.username,payload.message)
        io.emit('chat',payload)
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})
server.listen(3000,()=>console.log('listening on 3000'))