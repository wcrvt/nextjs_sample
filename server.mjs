import next from 'next'
import http from 'http'
import os from 'os';

import express from 'express';
import apolloServer from './packages/graphql/index.mjs';

process.on('unhandledRejection', (reason, _promise) => {
  console.error(reason);
  process.exit(1);
});

const showOriginIP = port => {
  const ifacesObj = {ipv4: [], ipv6: []};
  const interfaces = os.networkInterfaces();
  for(let dev in interfaces) interfaces[dev].forEach((item) => {
    if(!item.internal) ifacesObj[item.family.toLowerCase()].push({name:dev, address:item.address});
  });
  const ipList = ifacesObj.ipv4.map(e => {return e.address});
  ipList.unshift('localhost');
  console.log("Listening at:");
  for(let i = 0; i < ipList.length; i++) console.log("http://" + ipList[i] + ":" + port);
}

const nextInDev = true;
const port = 4000;

const expressApp = express();
const nextApp = next({dev: nextInDev});
const nextHandler = nextApp.getRequestHandler();

const main = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: expressApp });

  await nextApp.prepare();
  const httpServer = http.createServer(expressApp);
  expressApp.get('*', nextHandler);
  httpServer.listen(port, err => {
    if (err) throw err;
    showOriginIP(port);
  });
};

main();

