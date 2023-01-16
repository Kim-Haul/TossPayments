import { Routes, Route } from 'react-router-dom';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Fail from './pages/Fail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Fail />} />
    </Routes>
  );
}

export default App;
