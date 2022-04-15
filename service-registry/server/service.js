import express from 'express';
import ServiceRegistry from './lib/ServiceRegistry.js';
import cors from 'cors';
import grabSocketIp from '../utils/grab-socket-ip.js';

const service = express();

service.use(cors());

export default (config) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);

  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.put('/register/:serviceName/:serviceVersion/:servicePort/:serviceIp?', (req, res) => {
    const { serviceName, serviceVersion, servicePort, serviceIp = grabSocketIp(req.socket) } = req.params;

    const serviceKey = serviceRegistry.register(serviceName, serviceVersion, serviceIp, servicePort);

    return res.json({
      result: serviceKey
    });
  });

  service.delete('/unregister/:serviceName/:serviceVersion/:servicePort/:serviceIp?', (req, res) => {
    const { serviceName, serviceVersion, servicePort, serviceIp = grabSocketIp(req.socket) } = req.params;

    const serviceKey = serviceRegistry.unregister(serviceName, serviceVersion, serviceIp, servicePort);

    return res.json({
      result: `Deleted ${serviceKey}`
    });
  });

  service.get('/find/:serviceName/:serviceVersion', (req, res) => {
    const { serviceName, serviceVersion } = req.params;

    const service = serviceRegistry.get(serviceName, serviceVersion);
    if (!service) {
      return res.status(404).json({
        result: 'Service not found'
      });
    }

    return res.json(service);
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    log.error(error);
    return res.json({
      error: {}
    });
  });

  return service;
};