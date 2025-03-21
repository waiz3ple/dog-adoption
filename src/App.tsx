import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ForgotPassword } from './pages/ForgetPassword';
import { Login } from './pages/Login';

function App() {
  return (
    <>
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    </>
  )
}
export default App