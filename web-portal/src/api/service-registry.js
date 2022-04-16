const host = process.env.REACT_APP_API_HOST;

export const registerService = (serviceName, serviceVersion, servicePort, serviceIp) => {
  return fetch(host + `register/${serviceName}/${serviceVersion}/${servicePort}/${serviceIp}`, { method: 'PUT' });
};

export const getAllServices = () => {
  return fetch(host + `find/all`);
};

export const unregisterService = (serviceName, serviceVersion, servicePort, serviceIp) => {
  return fetch(host + `unregister/${serviceName}/${serviceVersion}/${servicePort}/${serviceIp}`, { method: 'DELETE' });
};

export const getService = (serviceName, serviceVersion) => {
  return fetch(host + `find/${serviceName}/${serviceVersion}`);
};