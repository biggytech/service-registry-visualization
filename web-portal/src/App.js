import './App.css';
import ServiceRegistry from './forms/ServiceRegistry'
import useServiceRegistry from './hooks/useServiceRegistry'
import Header from './components/Header';
import { useTranslation } from './utils/translate';
import ServicesList from './lists/ServicesList';
import Divider from '@mui/material/Divider';
import GetService from './forms/GetService';

function App() {
  const { registerService, services, unregisterService, getService } = useServiceRegistry();
  const { translate } = useTranslation();

  return (
    <div className="App">
      <Header title={translate('app.title')} />
      <Divider />
      <ServiceRegistry registerService={registerService} showHelp={!services.length} />
      <Divider />
      <ServicesList services={services} unregisterService={unregisterService} />
      <Divider />
      <GetService getService={getService} />
    </div>
  );
}

export default App;
