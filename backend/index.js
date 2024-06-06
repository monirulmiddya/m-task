const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(require("./core/helper/http/response"));

const userRoutes = require("./users/routes");
const taskRoutes = require("./tasks/routes");
const projectRoutes = require("./projects/routes");

app.use(express.json());

// Use the CORS middleware
app.use(cors());

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";
const APP_NAME = process.env.APP_NAME || "MTask";
const MONGODB_URI = process.env.MONGODB_URI;

// Import the http module from helpers and use it as middleware

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: APP_NAME,
      version: "1.0.0",
      description: "API documentation for MTask application",
    },
  },
  apis: ["./users/routes.js", "./tasks/routes.js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Optionally configure CORS with specific options
// const corsOptions = {
//   origin: "http://127.0.0.1:3000", // Allow only this origin
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specific HTTP methods
//   credentials: true, // Allow cookies and other credentials
//   optionsSuccessStatus: 204, // Some legacy browsers choke on 204
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// databse connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// use response middleware
// app.use(responseHandler);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);

app.get("/", (req, res) => {
  //   res.send("Hello World!");
  // res.Resp.status(400).json(200, "Hello World!");
  //   res.Resp.error();
  res.Resp.json(200, "Hello World!");
});

app.listen(PORT, HOST, () => {
  console.log(` ${APP_NAME} listening on port http://${HOST}:${PORT}`);
});
