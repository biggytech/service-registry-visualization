import bunyan from 'bunyan';

import pjs from '../package.json';

const { name, version } = pjs;

const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({
    name: `${serviceName}:${serviceVersion}:${level}`
});

export default {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info')
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'debug')
    }
};