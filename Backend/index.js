const connectToMongo = require("./db");
connectToMongo().catch(er => console.log(er));



const express = require('express')
const notesRouter = require("./routes/notes-route");
const authRouter = require("./routes/auth-route");
const app = express()
const port = 3000


app.use("/api/notes",notesRouter);
app.use("/api/auth",authRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})




