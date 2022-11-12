const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  socket.on("sendMessage", (messageInfo) => {
    console.log("Enviando mensaje");
    socket.broadcast.emit("reciveMessage", messageInfo);
  });
});

io.emit("test2", { servidor: "servidor 1616" });

app.get("/", (req, res) => {
  res.send("<h1>HolaMundo</h1>");
});

http.listen(3000, () => {
  console.log("escuchando en puerto 3000");
});
