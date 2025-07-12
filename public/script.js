let loggedIn=false
let userName=''
const socket=io.connect(window.location.origin)
const form=document.querySelector('#form')
const messages=document.querySelector('#messages')
do{
    userName=prompt('Enter your name: ')
}while(userName.trim()==='')
if(userName){
    loggedIn=true
    socket.emit('connection',{username:userName})
}
socket.on('connection',({name})=>{
    alert(name.username,' has joined')
})
document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault()
    const input=document.getElementById('message')
    if(input.value==='')
        alert('Enter the message')
    else{
        socket.emit('chat',{message:input.value,username:userName})
        input.value=''
    }
})
socket.on('chat',(msg)=>{
    const message=document.createElement('li')
    message.style.cssText='list-style-type:none;width:100%'
    
    if (msg.username === userName) {
        message.innerText = `You: ${msg.message}`;
        message.style.cssText += `
            text-align:right;
            margin:5px 10px;
            width:200px;
            max-width:50%;
            padding:5px;
            border-radius:5px;
            background-color:#5cb85c;
            color:#ffffff;
            float:right;
            clear:both;
        `;
    } else {
        message.innerText = `${msg.username}: ${msg.message}`;
        message.style.cssText += `
            text-align:left;
            margin:5px 10px;
            width:200px;
            max-width:50%;
            padding:5px;
            border-radius:5px;
            background-color:#7d7d7d;
            color:#ffffff;
            clear:both;
        `;
    }
    messages.appendChild(message)
    messages.scrollTop = messages.scrollHeight;
})

