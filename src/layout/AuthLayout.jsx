import { Outlet, Link, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">TaskFlow</h1>
          <p className="text-slate-400">Smart Task & Workflow Management</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          <Outlet />

          {/* Toggle Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
