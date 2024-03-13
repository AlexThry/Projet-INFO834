const http = require("http");
const app = require("./app")
const server = require("socket.io").Server;

const PORT = process.env.PORT || 3000;

app.set('port', PORT)

expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

const io = new server(expressServer, {
    cors: {
        origin: "*"
    }
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on("message", data => {
        console.log(data);
        io.emit("message", `${socket.id.substring(0,5)}: ${data}`);
    });
});