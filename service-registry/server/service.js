import express from 'express';
import ServiceRegistry from './lib/ServiceRegistry.js';
import cors from 'cors';

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

    service.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res) => {
        const { serviceName, serviceVersion, servicePort } = req.params;
        
        // grab either v6 or v4 ip address
        const serviceIp = req.socket.remoteAddress.includes('::') ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress;

        const serviceKey = serviceRegistry.register(serviceName, serviceVersion, serviceIp, servicePort);

        return res.json({
            result: serviceKey
        });
    });

    service.delete('/register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
        return next('Not Implemented');
    });

    service.get('/register/:serviceName/:serviceVersion', (req, res, next) => {
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