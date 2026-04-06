import { DashboardProvider } from './context/DashboardContext';
import Dashboard from './Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
