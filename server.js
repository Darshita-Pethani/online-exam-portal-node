const express = require('express') // NODE FRAMEWORK
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
const fs = require('fs');
const cron = require('node-cron');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./config/global');
const app = express();
const http = require('http');
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())
app.use('/online-exam-portal/images', express.static(__dirname + '/Assets/images'))

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
//response handler
app.use((req, res, next) => {
  const ResponseHandler = require('./config/response_handler')
  res.handler = new ResponseHandler(req, res);
  next()
})

// // for all api security call common function
// app.use( async (req, res, next) => {

//     const Authenticator = (new (require('./middleware/authentication'))());

// })
// routers
try {
  const appRoutes = require('./routes')
  appRoutes(app)
} catch (error) {
  console.log("Route Crash -> ", error)
}

// //port
// const { Server } = require("socket.io");
// const io = new Server(server,{
//     cors:{
//         origin:"*"
//     }
// });

// const onConnection = require('./utils/socket')
// io.on('connection', (socket) => {
//     console.log(`User Connected: ${socket.id}`);
//     onConnection(socket);
// });

const PORT = process.env.PORT || 9000
const BACKEND_SERVER = process.env.BACKEND_SERVER_LINK
//swagger-doc
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'HRM API Documentation',
      description: `Server is running on ${BACKEND_SERVER}`,
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:5000`,
        description: 'This is my local Server',
      },
    ],
    securityDefinitions: {
      AuthToken: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Set Authorization Token it will be applied wherever Authorization is defined',
      },
      AuthResetPasswordToken: {
        type: 'apiKey',
        name: 'admin_reset_token',
        in: 'header',
        description: 'Set token admin_reset_token for admin reset password',
      },
    },
  },
  apis: ['./Routes/*.js'], // Specify the path to your route file(s)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//server

server.listen(PORT, () => {
  // new (require('./Models/modules'))().checkModuleChanges();
  console.log(`server is running on port ${PORT}`)
})

// cron.schedule('*/1 * * * *', () => {
//   console.log('running a task every minute');
// });