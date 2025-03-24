import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ForgotPassword } from './components/pages/ForgetPassword';
import { Login } from './components/pages/Login';
import { Search } from './components/pages/Search';
import { SignUp } from './components/pages/SignUp';

function App() {
  return (
      <>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    </>
  )
}
export default App;