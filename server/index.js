const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is Runnig"));

io.on("connection", (socket) => {
  console.log(`socket.id`, socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log(`disconnect`);
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userTocall, signalData, from, name }) => {
    console.log(`calluser`, userTocall, signalData, from, name);
    io.to(userTocall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    console.log(`answercall`, data);
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
