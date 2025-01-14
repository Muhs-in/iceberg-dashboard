import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-sm shadow-lg p-8 space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-8 bg-blue-600 rounded"></div>
          <span className="text-xl font-semibold text-gray-900">
            Iceberg dashboard
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-[32px] font-semibold text-gray-900">Login</h1>
          <p className="text-base text-gray-600">Hi, Welcome back 👋</p>
        </div>

        <a
          href="http://localhost:3000/api/auth/google"  
          className="w-full bg-white border border-gray-200 text-gray-700 rounded-lg p-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          <span>
            <FcGoogle />
          </span>
          <span>Login with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
