import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * Navbar Transkage
 * Props :
 *  - user?: { firstName?: string, email: string } | null
 *  - onLogout?: () => void
 *  - variant?: "glass" | "solid"   (style en-tête)
 */
export default function Navbar({ user = null, onLogout, variant = "glass" }) {
  const [open, setOpen] = useState(false);

  const base =
    "w-full top-0 z-30 border-b transition backdrop-blur supports-[backdrop-filter]:bg-white/70";
  const styles = {
    glass: `${base} bg-white/70 border-white/40 sticky`,
    solid: `bg-white border-gray-200 ${base} sticky`,
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm px-3 py-1.5 rounded-lg ${
      isActive ? "text-black" : "text-gray-700 hover:text-black"
    }`;

  return (
    <header className={styles[variant] || styles.glass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">
            T
          </div>
          <span className="font-semibold">Transkage</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* vers les ancres de la landing */}
          <NavLink to="/#how" className={navLinkClass}>Comment ça marche</NavLink>
          <NavLink to="/#features" className={navLinkClass}>Avantages</NavLink>
          <NavLink to="/#cta" className={navLinkClass}>Devenir transporteur</NavLink>
        </nav>

        {/* Actions (auth) */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/connexion" className="text-sm px-3 py-1.5 rounded-lg hover:bg-black/5">
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="text-sm px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-900"
              >
                Créer un compte
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">
                Bonjour, <b>{user.firstName || user.email}</b>
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-sm px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-black"
                >
                  Se déconnecter
                </button>
              )}
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-2">
            <NavLink to="/#how" className="block px-2 py-2 rounded hover:bg-black/5" onClick={() => setOpen(false)}>
              Comment ça marche
            </NavLink>
            <NavLink to="/#features" className="block px-2 py-2 rounded hover:bg-black/5" onClick={() => setOpen(false)}>
              Avantages
            </NavLink>
            <NavLink to="/#cta" className="block px-2 py-2 rounded hover:bg-black/5" onClick={() => setOpen(false)}>
              Devenir transporteur
            </NavLink>

            {!user ? (
              <div className="pt-2 flex gap-2">
                <Link to="/connexion" className="flex-1 text-center px-3 py-2 rounded-lg border" onClick={() => setOpen(false)}>
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="flex-1 text-center px-3 py-2 rounded-lg bg-black text-white"
                  onClick={() => setOpen(false)}
                >
                  Créer un compte
                </Link>
              </div>
            ) : (
              onLogout && (
                <button
                  onClick={() => { setOpen(false); onLogout(); }}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-900 text-white"
                >
                  Se déconnecter
                </button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}