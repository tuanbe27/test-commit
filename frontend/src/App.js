import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';

function App() {
  const { authenticate } = useSelector((state) => state.auth);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Messenger />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          {!authenticate && (
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
