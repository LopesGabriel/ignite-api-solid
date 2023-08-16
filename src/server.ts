import { app } from "./app";

const PORT = process.env.PORT !== undefined
  ? Number(process.env.PORT)
  : 3333

app.ready()
  .then(() => {
    app.listen({
      host: '0.0.0.0',
      port: PORT,
    }).then(() => {
      console.info(`🚀 HTTP Server Running on port ${PORT}`)
    })
  })
