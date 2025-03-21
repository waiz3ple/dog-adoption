import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ForgotPassword } from './pages/ForgetPassword';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <>
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    </>
  )
}
export default App