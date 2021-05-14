import * as express from 'express';
import apiRouter from './routes';
const https = require('https');
const fs = require('fs');

const app = express();

const httpsServer = https.createServer({
    key: fs.readFileSync('/home/ec2-user/project/example.key'),
    cert: fs.readFileSync('/home/ec2-user/project/example.crt'),
  }, app);

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
httpsServer.listen(port, () => console.log(`Server listening on port: ${port}`));
