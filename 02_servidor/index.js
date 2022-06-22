const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on('connection',(socket)=>{
  console.log('Nuevo usuario conectado');
  socket.on('test',()=>{
    console.log('Escuchano cliente');
    socket.emit('test2')
  })
})

app.get("/", (req, res) => {
  res.send("<h1>HolaMundo</h1>");
});

http.listen(3000, () => {
  console.log("escuchando en puerto 3000");
});
