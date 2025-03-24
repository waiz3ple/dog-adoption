import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../api/hooks/useLogin';
import { Button } from "../atoms/Button";
import { Checkbox } from '../atoms/CheckBox';
import { Input } from "../atoms/Input";

export const Login = () => {
  const [credentials, setCredentials] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
    const [isChecked, setIsChecked] = useState(false); 

    const onChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const navigate = useNavigate();
    const loginMutation = useLogin(); 
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ credentials, loginMutation }); 
    loginMutation.mutate(credentials, {
      onSuccess: () => navigate('/search'),
      onError: (error: Error) => alert(`Login failed: ${error.message}`),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Sign in to your account to continue.
        </p>

        <form  onSubmit={handleSubmit}>
          <div className="mb-6">
                <Input type="text" label="Name" placeholder="Enter your name" name='name' onChange={ handleInputChange } value={ credentials.name} />
            </div>
            <div className="mb-6">
                <Input type="email" label="Email Address" placeholder="Enter your email" name='email' onChange={ handleInputChange } value={ credentials.email}/>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">   
                <Checkbox id="remember-me" label="Remember Me" checked={isChecked} onChange={onChange}/>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot Password?
            </Link>
          </div>
        <Button type="submit" variant="primary" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign Up
            </Link>
          </p>
        </div>
          </div>
    </div>
  );
};
