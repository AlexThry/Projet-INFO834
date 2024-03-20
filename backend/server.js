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

    socket.on("join_room", chatroomId => {
        socket.join(chatroomId)
    })

    socket.on('leave_room', () => {
        socket.leaveAll()
    })

    socket.on("message", data => {
        io.to(data.chatroomId).emit("message", data);
    });

    socket.on('user_login', userId => {
        io.emit('user_login', userId);
    })

    socket.on('user_logout', userId => {
        io.emit('user_logout', userId)
    })
});