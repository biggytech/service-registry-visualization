import http from 'http';
import configs from '../config/index.js';
import getService from '../server/service.js';
import dotenv from 'dotenv';


dotenv.config();
const config = configs[process.env.NODE_ENV || 'development'];

const log = config.log();
const service = getService(config);

const server = http.createServer(service);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
  log.info(`service-registry is listening on port: ${server.address().port} in ${service.get('env')} mode`);
});