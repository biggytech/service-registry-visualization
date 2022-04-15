const host = process.env.REACT_APP_API_HOST;

export const registerService = (serviceName, serviceVersion, servicePort, serviceIp) => {
  return fetch(host + `register/${serviceName}/${serviceVersion}/${servicePort}/${serviceIp}`, { method: 'PUT' });
};