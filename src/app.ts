import bodyParser from 'body-parser';
import express from 'express';
import controllers from './contexts';
import authenticator from './middlewares/authenticator.middleware';

const jsonParser = bodyParser.json();
const app = express();
const port = 5050;

app.use(authenticator);
app.use(jsonParser);
app.use(controllers);

app.listen(port, () => {
  console.log(`서버 가동 / 포트 넘버 : ${port}`);
});
