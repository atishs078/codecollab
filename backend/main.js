const express = require('express')
const mongoose = require('mongoose')
const jsonweb = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const AuthRouter = require('./router/Auth')
const codesessionrouter = require('./router/CodeSession')
const runRouter = require('./router/run')
require('dotenv').config()
const http = require("http");
const registerSocketServer = require("./router/Socket");
app.use(cors())
app.use(express.json())
const port = 5000
const connectDb=async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected')
    } catch (error) {
        console.log("Something went wrong while connecting database", error)
    }
}
connectDb()
const server = http.createServer(app);
registerSocketServer(server);
app.use('/api/auth', AuthRouter)
app.use('/api/code', codesessionrouter)
app.use('/api', runRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port, () => {
  console.log(`✅ Server running with Socket.io on port ${port}`);
});

