import React, { useEffect, useState } from 'react';
import { usePublish, useSubscribe, useStatus } from '@ombori/ga-messaging';

export default () => {
  const status = useStatus();
  const publish = usePublish();

  // send pings every 3 seconds
  useEffect(() => {
    const i = setInterval(() => {
      publish('Test.ping', {})
    }, 3000);
    return () => clearInterval(i);
  }, [publish]);

  // subscribe for pongs
  useSubscribe('Test.pong', (msg) => {
    console.log('Pong!', msg);
  }, [useState]);

  return <div>{status ? 'connected' : 'connecting'}</div>
}

// let ws = new WebSocket(document.location.href.replace(/^http/, 'ws'));
    // const log = text => document.querySelector('#logs').innerHTML += '<div>' + text + '</div>';
    // ws.onopen = () => log('connected, tap screen to send message to server');
    // ws.onclose = () => log('disconnected'); // TODO: add reconnection logic
    // ws.onmessage = ({ data }) => {
    //   try {
    //     console.log('received', JSON.parse(data));
    //     log('> ' + data.toString());
    //   } catch (e) {
    //     console.error('Cannot process packet', e.toString());
    //   }
    // }
    // ws.onerror = () => log('error');

    // document.querySelector('body').onclick = () => {
    //   if (ws.readyState !== ws.OPEN) return;
    //   const message = { type: 'Test.ping', data: { from: window.navigator.userAgent } };
    //   log('< ' + JSON.stringify(message));
    //   ws.send(JSON.stringify(message));
    //   console.log('sending', message);
    // }