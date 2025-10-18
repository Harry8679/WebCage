import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { Loader2 } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [password,  setPassword]  = useState("");
  const [show,      setShow]      = useState(false);

  const isLoading = status === "loading";

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, phone, password }))
      .unwrap()
      .then(() => navigate("/connexion"))
      .catch(() => {});
  };

  return (
    <div className="min-h-[80vh] grid place-items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-lg bg-white border rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">T</div>
          <h1 className="text-xl font-semibold">Créer un compte Transkage</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-xs text-gray-600 mb-1">Prénom</label>
              <input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                placeholder="Harry"
                required
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs text-gray-600 mb-1">Nom</label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                placeholder="MacCode"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
              placeholder="vous@exemple.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs text-gray-600 mb-1">Téléphone (optionnel)</label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-600 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-lg border hover:bg-black/5"
              >
                {show ? "Masquer" : "Afficher"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              8+ caractères. Évitez de réutiliser un mot de passe.
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {String(error)}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-black text-white py-2.5 hover:bg-gray-900 disabled:opacity-60"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Créer mon compte
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Déjà inscrit ?{" "}
          <Link to="/connexion" className="font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}