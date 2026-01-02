import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
const { login } = useAuth();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();
try {
await login(email, password);
} catch (err) {
setError(err.response?.data?.message || "Login failed");
}
};

return (
// Updated: Added gradient background and better centering
<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4">
{/* Updated: Card with glass effect, softer shadows, and rounded corners */}
<form
onSubmit={handleSubmit}
className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 ring-1 ring-black/5"
>
<div className="text-center mb-8">
{/* Updated: Typography with gradient text */}
<h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-indigo-600 to-purple-600">
Welcome Back
</h1>
<p className="text-slate-500 text-sm mt-2">Please sign in to your account</p>
</div>

{/* Updated: Error message styling */}
{error && (
<div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
<p className="text-red-700 text-sm font-medium">{error}</p>
</div>
)}

<div className="space-y-5">
<div>
<label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Email Address</label>
<input
className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder-slate-400"
placeholder="name@example.com"
onChange={e => setEmail(e.target.value)}
required
/>
</div>

<div>
<label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Password</label>
<input
className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 placeholder-slate-400"
type="password"
placeholder="••••••••"
onChange={e => setPassword(e.target.value)}
required
/>
</div>
</div>

{/* Updated: Button with gradient and hover effects */}
<button
className="w-full mt-8 bg-linear-to-br from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-indigo-200 active:scale-95"
>
Sign In
</button>

{/* Updated: Link styling */}
<div className="mt-6 flex items-center justify-between text-sm font-medium">
<Link
to="/register"
className="text-slate-500 hover:text-indigo-600 transition-colors"
>
Create account
</Link>

<Link
to="/forgot-password"
className="text-indigo-600 hover:text-indigo-700 transition-colors"
>
Forgot password?
</Link>
</div>
</form>
</div>
);
}