import './App.css';
import ServiceRegistry from './forms/ServiceRegistry'
import useServiceRegistry from './hooks/useServiceRegistry'
import Header from './components/Header';
import { useTranslation } from './utils/translate'

function App() {
  const { registerService } = useServiceRegistry();
  const { translate } = useTranslation();

  return (
    <div className="App">
      <Header title={translate('app.title')} />
      <ServiceRegistry registerService={registerService} />
    </div>
  );
}

export default App;
