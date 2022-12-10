import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { loadSocket } from './lib/socket.js';
import router from './routes.js';


const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*',
  },
});

app.use(morgan('tiny'));

app.use(express.json());

app.use(express.static('public'));

app.use(router);

app.post('/terminal', async (req, res) => {
  const host = req.body;

  const channel = `data${host.id}`;
  
  await loadSocket(io, host, channel);

  res.json({ message: 'terminal opened', channel });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
