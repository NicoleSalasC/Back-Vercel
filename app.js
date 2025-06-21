const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000


app.use(express.json()) // Transforma el JSON a un objeto que JS entienda. Para que el controlador lo maneje bien


app.use(express.urlencoded({extended:true}))


const loginRoute = require("./src/routes/loginRoute")

const userRoute = require("./src/routes/userRoute");

const declarationRoute = require('./src/routes/declarationRoute');

const activityRoute = require('./src/routes/activityRoute');

const courseRoute = require('./src/routes/courseRoute');

const validationRoute = require('./src/routes/validationRoute');

const catalogRoute = require('./src/routes/catalogRoute');

const classroomRoute = require('./src/routes/classroomRoute');




const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: false,
}));



// Ruta base para utilizar el servicio
app.get("/api", function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('SERVIDOR SISTEMA');
});


app.use("/api/login", loginRoute)

app.use("/api/user", userRoute);

app.use('/api/declaration', declarationRoute);

app.use('/api/activity', activityRoute);

app.use('/api/course', courseRoute);

app.use('/api/validation', validationRoute);

app.use('/api/catalog', catalogRoute);

app.use('/api/classroom', classroomRoute);



app.listen(port, () => {
  console.log(`Example app listening on 
    port ${port}`)
})
