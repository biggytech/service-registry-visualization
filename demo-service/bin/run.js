import http from 'http';
import axios from 'axios';

import configs from '../config/index.js';

import getService from '../server/service.js';

const config = configs[process.env.NODE_ENV || 'development'];

const log = config.log();
const service = getService(config);

const server = http.createServer(service);

// Important - a service should not have a fixed port but should randomly choose one
server.listen(0);

server.on('listening', () => {
  const host = process.env.SERVICE_REGISTRY_HOST || 'http://localhost:3000';

  const registerService = () => axios.put(`${host}/register/${config.name}/${config.version}/${server.address().port}`);
  const unregisterService = () => axios.delete(`${host}/unregister/${config.name}/${config.version}/${server.address().port}`);

  registerService();

  const interval = setInterval(registerService, 20 * 1000);
  const cleanUp = async () => {
    clearInterval(interval);
    await unregisterService();
  };

  process.on('uncaughtException', async () => {
    await cleanUp();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await cleanUp();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await cleanUp();
    process.exit(0);
  });

  log.info(`Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode`);
});