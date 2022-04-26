import express from 'express';

const service = express();

export default (config) => {
  const log = config.log();

  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.get('/', (req, res, next) => {
    return next('Not Implemented');
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