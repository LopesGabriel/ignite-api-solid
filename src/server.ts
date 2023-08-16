import { app } from './app'
import { env } from './env'

app.ready().then(() => {
  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT,
    })
    .then(() => {
      console.info(`🚀 HTTP Server Running on port ${env.PORT}`)
    })
})
