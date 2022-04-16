import { useEffect, useState, useCallback } from 'react';
import { registerService as registerServiceApi, getAllServices, unregisterService as unregisterServiceApi } from '../api/service-registry'

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

  return { registerService, services, unregisterService }
};

export default useServiceRegistry;