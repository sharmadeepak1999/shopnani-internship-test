const express = require("express")
const helmet = require("helmet")
const path = require("path")
const ejs = require("ejs")

const searchRoute = require("./routes/searchRoute")

// Creates an Express app
const app = express()

// Sets the Development/Production port number
const port = process.env.port || 3000

// Specifies the path of the views folder
const viewsPath = path.join(__dirname, "/views")

// Sets the view engine to ejs
app.set("view engine", "ejs")

// Sets the view's folder path
app.set("views", viewsPath)


// Redirects to https on production environment
if(process.env.NODE_ENV === "production")
{ 
  app.use((req, res, next) => {
    if(!req.secure) {
      res.redirect(`https://${req.headers.host}${req.url}`)
    }
    next()
  })
}

// Specifies the path to the public folder
app.use('/public',express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({ extended: true}))
app.use(helmet())

// Includes the search route
app.use("/search", searchRoute)

// Sets up the home route
app.get("/", (req, res) => {
  res.render("index.ejs", {
    pageTitle: "Home | ShopNani"
  })
})

// Starts the server to listen for requests
app.listen(port, (req, res) => {
  console.log(`Server started at port ${port}..`)
})
