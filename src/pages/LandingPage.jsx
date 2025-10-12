import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plane,
  Car,
  Train,
  Ship,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Weight,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";

/**
 * Transkage — Landing Page + Smart Search Bar (React + Tailwind v3)
 *
 * Dépendances à installer dans ton projet :
 *   npm i lucide-react framer-motion
 *
 * Utilisation :
 *   import LandingPage from "./LandingPage" (ou place ce composant dans src/pages/Landing.jsx)
 *   export default function App() { return <LandingPage /> }
 */

const MODES = [
  { key: "all", label: "Tous", icon: Search }, // <- icon (minuscule)
  { key: "car", label: "Voiture", icon: Car },
  { key: "plane", label: "Avion", icon: Plane },
  { key: "train", label: "Train", icon: Train },
  { key: "boat", label: "Bateau", icon: Ship },
];

function ModeToggle({ value, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-2 bg-white/60 backdrop-blur rounded-xl p-2 shadow-inner">
      {MODES.map(({ key, label, icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition shadow-sm border ${
            value === key
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
          }`}
          aria-pressed={value === key}
        >
          {React.createElement(icon, { className: "h-4 w-4" })}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

function SearchBar() {
  const [mode, setMode] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [kg, setKg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ mode, from, to, date, kg });
    // À ce stade, on route vers /search avec les paramètres (ou on dispatch Redux)
    // window.location.href = `/search?${params.toString()}`;
    console.log("Search:", Object.fromEntries(params));
    alert(`Recherche envoyée\n${params.toString()}`);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/70 backdrop-blur border border-white/60 shadow-2xl rounded-2xl p-4 sm:p-6 space-y-4"
      aria-labelledby="search-title"
    >
      <div className="flex items-center justify-between">
        <h2 id="search-title" className="text-lg font-semibold text-gray-900">Trouver un trajet pour votre colis</h2>
        <ModeToggle value={mode} onChange={setMode} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="from">
            <MapPin className="h-4 w-4" /> Départ
          </label>
          <input
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Ville, adresse ou aéroport"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="to">
            <MapPin className="h-4 w-4 rotate-180" /> Arrivée
          </label>
          <input
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Ville, adresse ou aéroport"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="date">
            <Calendar className="h-4 w-4" /> Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="kg">
            <Weight className="h-4 w-4" /> Poids (kg)
          </label>
          <input
            id="kg"
            type="number"
            min={0}
            step={0.5}
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            placeholder="ex. 3"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-gray-600">
          Paiement sécurisé par <span className="font-medium">Stripe</span> • Transporteurs vérifiés
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 hover:bg-gray-900 active:scale-[.99] transition"
        >
          <Search className="h-4 w-4" /> Rechercher
        </button>
      </div>
    </motion.form>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">T</div>
            <span className="font-semibold">Transkage</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-black">Comment ça marche</a>
            <a href="#features" className="hover:text-black">Avantages</a>
            <a href="#cta" className="hover:text-black">Devenir transporteur</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/login" className="text-sm px-3 py-1.5 rounded-lg hover:bg-black/5">Connexion</a>
            <a href="/inscription" className="text-sm px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-900">Créer un compte</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Expédiez des <span className="text-emerald-600">colis</span> partout, 
                en profitant des <span className="text-blue-600">trajets existants</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Transkage connecte des transporteurs qui voyagent (voiture, avion, train, bateau)
                avec des clients qui veulent envoyer des colis, en toute sécurité.
              </p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
                <li className="flex items-center gap-2 bg-white rounded-xl border p-3"><ShieldCheck className="h-4 w-4 text-emerald-600"/> Vérification</li>
                <li className="flex items-center gap-2 bg-white rounded-xl border p-3"><Globe2 className="h-4 w-4 text-blue-600"/> International</li>
                <li className="flex items-center gap-2 bg-white rounded-xl border p-3"><Weight className="h-4 w-4 text-gray-900"/> Au kilo</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .05 }}>
              <SearchBar />
              <p className="text-xs text-gray-500 mt-3 ml-1">Ex. Paris → Abidjan • 16/11 • 3 kg • Avion</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured routes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10" id="features">
        <h2 className="text-2xl font-bold mb-6">Routes populaires</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{
            title: "Paris → Abidjan",
            mode: "Avion",
            date: "Aujourd'hui - Dimanche",
          },{
            title: "Casablanca → Dakar",
            mode: "Avion",
            date: "Demain",
          },{
            title: "Lyon → Marseille",
            mode: "Voiture",
            date: "Chaque jour",
          }].map((r, i) => (
            <div key={i} className="group bg-white rounded-2xl border p-5 hover:shadow-xl transition relative overflow-hidden">
              <div className="absolute right-4 top-4 text-gray-300 group-hover:text-gray-400">
                <ChevronRight className="h-5 w-5"/>
              </div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{r.mode} • {r.date}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700">
                Voir les trajets <ArrowRight className="h-4 w-4 ml-1"/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y" id="how">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold mb-8">Comment ça marche</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[{
              n: 1,
              title: "Le transporteur publie",
              text: "Ville/Adresse/Aéroport de départ & d'arrivée, date et kilos dispo.",
            },{
              n: 2,
              title: "Le client réserve",
              text: "Il achète des kilos pour son colis et paye via Stripe.",
            },{
              n: 3,
              title: "Validation",
              text: "Le transporteur valide la demande — prélèvement du client.",
            },{
              n: 4,
              title: "Code unique",
              text: "À la remise du colis, le client transmet le code au transporteur.",
            }].map((s) => (
              <div key={s.n} className="bg-gradient-to-br from-gray-50 to-white border rounded-2xl p-5">
                <div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-semibold mb-3">{s.n}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Ils utilisent Transkage</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[`"Service nickel, j'ai envoyé un colis de 5 kg à moindre coût."`,
            `"Je voyage souvent, je rentabilise mes trajets en toute simplicité."`,
            `"Le code unique apporte une vraie sécurité à l'échange."`].map((q, i) => (
            <blockquote key={i} className="bg-white border rounded-2xl p-5 text-sm text-gray-700">{q}</blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="rounded-2xl border bg-gradient-to-r from-emerald-50 to-blue-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Devenez transporteur dès aujourd'hui</h3>
              <p className="text-gray-600 mt-1 text-sm">Publiez vos trajets et gagnez de l'argent en transportant des colis.</p>
            </div>
            <div className="flex gap-2">
              <a href="/inscription" className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-900">Créer un compte</a>
              <a href="#" className="px-5 py-2.5 rounded-xl bg-white border hover:bg-white/70">Publier un trajet</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-black text-white grid place-items-center font-bold">T</div>
            <span>Transkage © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#">Sécurité</a>
            <a href="#">CGU</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}