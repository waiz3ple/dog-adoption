import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Sign in to your account to continue.
        </p>

        <form>
          <div className="mb-6">
            <Input type="email" label="Email Address" placeholder="Enter your email" />
          </div>

          <div className="mb-6">
            <Input type="password" label="Password" placeholder="Enter your password" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember Me
              </label>
            </div>

            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot Password?
            </a>
          </div>
        <Button type="submit" variant="primary" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
