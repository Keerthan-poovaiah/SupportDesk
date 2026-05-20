import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    try {

      if (isLogin) {

        const res = await api.post("/auth/login", {
          email,
          password
        });

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");

      } else {

        await api.post("/auth/register", {
          name,
          email,
          password
        });

        alert("Registration successful");

        setIsLogin(true);

      }

    } catch (error) {

      alert(error.response?.data?.message || "Something went wrong");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-6xl font-bold leading-tight mb-6">
            SupportDesk
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Backend-focused ticket management system built using
            React, Node.js, Express, and PostgreSQL.
          </p>

          <div className="space-y-3 text-gray-300">

            <p>• JWT Authentication</p>
            <p>• Role-Based Access Control</p>
            <p>• PostgreSQL Relational Database</p>
            <p>• REST API Architecture</p>

          </div>

        </div>

        <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl">

          <h2 className="text-3xl font-semibold mb-8 text-center">

            {isLogin ? "Login" : "Create Account"}

          </h2>

          <div className="space-y-5">

            {!isLogin && (

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none"
                onChange={(e) => setName(e.target.value)}
              />

            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >

              {isLogin ? "Login" : "Register"}

            </button>

          </div>

          <div className="mt-8 text-center">

            <p className="text-gray-400 mb-3">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

            </p>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="bg-zinc-800 hover:bg-zinc-700 transition px-6 py-3 rounded-xl font-medium"
            >

              {isLogin ? "Create Account" : "Back to Login"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LandingPage;