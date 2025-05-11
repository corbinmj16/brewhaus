import express from 'express'
import breweryRoutes from './routes/breweries.routes.js'
import cors from 'cors'

const app = express()
const port = 9000

// URL-encoded payloads
app.use(express.urlencoded({ extended: true }))
// Allow frontend specific origin
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/breweries', breweryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
