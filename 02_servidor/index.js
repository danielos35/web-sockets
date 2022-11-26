const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});


// <<<<<<< DRAW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

io.on("connection", (socket) => {
  // Capturar id que se genera por cada conexión
  const idHandShake = socket.id;

  // Nombre de la sala que estamos pasando por el socket
  let { nameRoom } = socket.handshake.query;

  // Crear grupo
  socket.join(nameRoom);

  socket.on("event", (res) => {
    const data = res;
    console.log(res);

    // Emitir a todos los dispositivos de una sala, excepto al autor
    socket.to(nameRoom).emit("event", data);
  });

  console.log(`Dispositivo ${idHandShake} ${nameRoom}`);
});





















// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// CODE GRAPH
/*
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
  socket.on("sendMessage", (messageInfo) => {
    console.log("Enviando mensaje");
    socket.broadcast.emit("reciveMessage", messageInfo);
  });

  let i = 200;
  setInterval(() => {
    i++;
    socket.emit("data_graph", [
      {
        name: "BTC",
        series: [
          {
            name: "200",
            value: 25000,
          },
          {
            name: i,
            value: 32000 + i,
          },
        ],
      },
      {
        name: "ETH",
        series: [
          {
            name: "200",
            value: 25000,
          },
          {
            name: 300,
            value: 32000,
          },
        ],
      },
    ]);
  }, 2000);
});
*/

// io.emit("test2", { servidor: "servidor 1616" });

// app.get("/", (req, res) => {
//   res.send("<h1>HolaMundo</h1>");
// });

http.listen(3000, () => {
  console.log("escuchando en puerto 3000");
});
