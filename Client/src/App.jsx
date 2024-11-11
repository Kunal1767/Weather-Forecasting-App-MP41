import './App.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast'; // Ensure correct import


function App() {
  return (
    <div className="mx-auto w-full py-5  bg-[url('./assets/image.png')] bg-cover bg-center min-h-screen h-screen shadow-xl shadow-grey-400">
      <TopButtons />
      <Inputs />
      <TimeAndLocation />
      <TemperatureAndDetails />
      <Forecast />
    </div>
  );
}

export default App;