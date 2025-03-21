import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
export const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter your email address below to receive a password reset link.
        </p>

        <form>
          <div className="mb-6">
            <Input type="email" label="Email Address" placeholder="Enter your email" />
          </div>
        <Button type="submit" variant="primary" className="w-full mt-4">
            Send Reset Link   
        </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '} 
            <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};