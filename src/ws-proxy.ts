import ws from 'ws';
import { Server } from 'http';
import { Module } from '@ombori/ga-module';

type CreateParams = {
  server: Server,
  module: Module<any>,
  allowedMessages: {
    incoming: string[],
    outgoing: string[],
  },
};

const createProxy = ({ server, module, allowedMessages: { incoming = [], outgoing = [] } }: CreateParams) => {
  const wss = new ws.Server({ server });

  wss.on('connection', (sock: ws) => {
    sock.on('message', (message: string) => {
      try {
        const { type, data = {} } = JSON.parse(message) as { type: string, data: any };
        if (!type) throw new Error('Message has no type');
        if (incoming.indexOf(type) === -1) throw new Error(`Message type ${type} not allowed, ignoring`);

        module.broadcast(type, data);
      } catch (e) {
        console.error('Cannot receive message', e.toString());
      }
    });
  });

  outgoing.forEach(type => {
    module.onEvent(type, (data: any) => wss.clients.forEach(client => {
      if (client.readyState !== ws.OPEN) return;
      client.send(JSON.stringify({ type, data }));
    }));
  });
}

export default createProxy;
