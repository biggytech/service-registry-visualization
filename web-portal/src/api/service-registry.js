const host = process.env.REACT_APP_API_HOST;

export const registerService = (serviceName, serviceVersion, servicePort) => {
  return fetch(host + `register/${serviceName}/${serviceVersion}/${servicePort}`, { method: 'PUT' });
};