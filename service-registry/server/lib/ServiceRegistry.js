class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 30;
    }

    register(name, version, ip, port) {
        const key = name + version + ip + port;

        if (!this.services[key]) {
            this.services[key] = {
                timestamp: Math.floor(new Date() / 1000),
                ip,
                port,
                name,
                version
            };
            this.log.debug(`Added a service with name ${name}, version ${version} at ${ip}:${port}`);
            return key;
        }

        this.services[key].timestamp = Math.floor(new Date() / 1000);
        this.log.debug(`Updated a service with name ${name}, version ${version} at ${ip}:${port}`);
        return key;
    }
}

export default ServiceRegistry;