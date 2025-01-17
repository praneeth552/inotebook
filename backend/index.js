const connectToMongo = require("./db");
const cors = require('cors')

connectToMongo();

const express = require('express')
const app = express()
const port = 4000

app.use(cors())

app.use(express.json())

app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))  

app.listen(port, () => {
  console.log(`inotebook app listening at http://localhost:${port}`)
})