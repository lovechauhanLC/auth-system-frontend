/* src/pages/Dashboard.jsx */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/api/user/dashboard")
      .then((res) => setData(res.data))
      .catch(() => {
        // handled globally by axios (refresh / logout)
      });
  }, []);

  return (
    // Updated: Global linear background
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Updated: Glassmorphism Navbar */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 cursor-default">
          Dashboard
        </h1>
        
        <div className="flex items-center gap-6">
          {/* Displaying user email since 'user' is available in your logic */}
          {user && (
            <span className="hidden sm:block text-slate-600 text-sm font-medium">
              {user.email}
            </span>
          )}
          
          <button 
            onClick={logout} 
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-6 max-w-7xl mx-auto mt-8">
        
        {/* Updated: Welcome Hero Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/40 ring-1 ring-black/5 text-center transition-all duration-500 hover:shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Animated Welcome Text */}
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Welcome <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Back</span>
            </h2>
            
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              You have successfully logged into the secure dashboard.
            </p>

            {/* Optional: Show loading state or data if available */}
            {!data ? (
               <div className="flex justify-center mt-8">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
               </div>
            ) : (
              <div className="mt-8 p-4 bg-indigo-50/50 rounded-xl inline-block border border-indigo-100">
                <p className="text-indigo-800 font-medium">System Status: Online</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}