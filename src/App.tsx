import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useBreeds, useLogin } from './api/hooks/useDog';
import { ForgotPassword } from './components/pages/ForgetPassword';
import { Login } from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';

function App() {
    const { mutate } = useLogin();
    console.log(mutate);
    const { data, isLoading } = useBreeds();
    console.log(data, isLoading);
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