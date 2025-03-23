import { Link } from 'react-router-dom';
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
              <form>
            <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={''}
            />
          <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={''}
          />
          <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={''}
            />
            <Input 
                id="confirm-password"
                type="password" 
                label="Confirm Password"
                placeholder="Confirm your password"
                value={''}
            />  
                  
          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};