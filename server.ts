import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import http from 'http';
import app from './app';

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.on('listening', () => console.log('Listening on port: ', port));

server.listen(port);
