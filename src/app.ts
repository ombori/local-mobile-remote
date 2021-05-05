import { connect } from '@ombori/ga-module';
import http from 'http';
import express from 'express';

import { Settings } from './schema.js';
import initProxy from './ws-proxy.js';

const PORT = 8081;

const module = await connect<Settings>();

const app = express();
const server = http.createServer(app);


// handle json payload
app.use(express.json());

// serve static files from 'static' folder
app.use(express.static('static'));

initProxy({
  server,
  module,
  allowedMessages: {
    incoming: ['Test.ping'],
    outgoing: ['Test.pong'],
  }
});

server.listen(PORT);