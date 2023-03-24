import { Application, Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const reminderRoute = require('./app/route/reminder');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app: Application = express();
var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', reminderRoute);

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter);

const PORT = process.env.PORT || 8080;
const db = require('./app/models');
db.sequelize.sync();

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Welcome to the reminder API! \n Endpoints available at http://localhost:${PORT}/api/v1`,
  });
});
db.sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err: any) => {
    console.log('Unable to connect to the database' + err.message);
  });
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
