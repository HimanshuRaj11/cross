
import { app, server } from "./socket/socket.js"

app.get("/", (req, res) => {
    res.send("Server is Running...");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {

    console.log(`Server is Running On POST: ${PORT}`);
})