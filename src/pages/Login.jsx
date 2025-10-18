import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { Loader2 } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  const isLoading = status === "loading";

  return (
    <div className="min-h-[80vh] grid place-items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">T</div>
          <h1 className="text-xl font-semibold">Connexion à Transkage</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
              placeholder="vous@exemple.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs text-gray-600 mb-1">Mot de passe</label>
              {/* <Link to="/forgot-password" className="text-xs text-gray-600 hover:text-black">Mot de passe oublié ?</Link> */}
            </div>
            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-lg border hover:bg-black/5"
              >
                {show ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {String(error)}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white py-2.5 hover:bg-gray-900 disabled:opacity-60"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Se connecter
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Pas de compte ?{" "}
          <Link to="/inscription" className="font-medium hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}