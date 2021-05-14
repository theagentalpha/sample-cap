import * as express from 'express';
import apiRouter from './routes';
const https = require('https');
const fs = require('fs');

const app = express();

const httpsServer = https.createServer({
    key: fs.readFileSync('./example.key'),
    cert: fs.readFileSync('./example.cert'),
  }, app);

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
httpsServer.listen(port, () => console.log(`Server listening on port: ${port}`));
