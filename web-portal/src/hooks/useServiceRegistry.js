import { useEffect, useState, useCallback } from 'react';
import { registerService as registerServiceApi, getAllServices, unregisterService as unregisterServiceApi, getService as getServiceApi } from '../api/service-registry'

const useServiceRegistry = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServices().then(res => res.json()).then(setServices);
  }, []);

  const registerService = useCallback((...args) => {
    return registerServiceApi(...args).then(getAllServices).then(res => res.json()).then(setServices);
  }, []);

  const unregisterService = useCallback((...args) => {
    return unregisterServiceApi(...args).then(getAllServices).then(res => res.json()).then(setServices);
  }, []);

  const getService = useCallback((...args) => {
    return getServiceApi(...args).then(res => res.status === 200 ? res.json() : null);
  }, []);

  return { registerService, services, unregisterService, getService }
};

export default useServiceRegistry;