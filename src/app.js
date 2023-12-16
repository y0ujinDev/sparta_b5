import express from 'express';
import router from './routers/index.js';
import LogMiddleware from './middlewares/log.middleware.js';
import { handleServerError } from './middlewares/handleServerError.middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(handleServerError);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
