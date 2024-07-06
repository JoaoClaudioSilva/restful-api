const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")

dotenv.config()

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
  res.redirect("/docs")
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/docs", 
  swaggerUi.serve, 
  swaggerUi.setup(require("./docs/swagger_doc.json"),
  { customCssUrl: '/custom.css' }))

app.use("/users", require("./routes/route_usuario"))
app.use("/admins", require("./routes/route_admin"))
app.use("/data", require("./routes/route_data"))

app.get("/install", (req, res) => require("./models/model_database").install(res))

app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta: ${process.env.PORT}`);
});

module.exports = app
