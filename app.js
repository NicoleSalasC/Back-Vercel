const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const loginRoute = require("../src/routes/loginRoute")

const userRoute = require("../src/routes/userRoute");

const declarationRoute = require('../src/routes/declarationRoute');

const activityRoute = require('../src/routes/activityRoute');

const courseRoute = require('../src/routes/courseRoute');

const validationRoute = require('../src/routes/validationRoute');

const catalogRoute = require('../src/routes/catalogRoute');

const classroomRoute = require('../src/routes/classroomRoute');




//const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
const allowedOrigins = [
  "https://front-bueno-vercel.vercel.app/","https://localhost:5173" // tu frontend en Vercel
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.options("*", cors(corsOptions)); // Responde a preflight

app.use(cors(corsOptions));
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
  console.log(`Example app listening on port ${port}`)
});