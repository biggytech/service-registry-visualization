import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import CircuitBreaker from './lib/CircuitBreaker.js';

dotenv.config();
const service = express();

service.use(cors());

export default (config) => {
  const log = config.log();
  const cache = {};
  const circuitBreaker = new CircuitBreaker(log);

  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  // handle all incoming requests
  service.use(async (req, res) => {
    const url = process.env.SERVICE_REGISTRY_URL + req.originalUrl;
    const cacheKey = crypto.createHash('md5').update(req.method + url).digest('hex');

    const result = await circuitBreaker.callService(url, {
      method: req.method,
      data: req.body,
      headers: req.headers
    });

    if (!result) {
      if (cache[cacheKey]) return res.json(cache[cacheKey]);
      return res.status(404).end();
    }

    cache[cacheKey] = result;
    res.json(result);
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