import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Weight } from "lucide-react";
import ModeToggle from "./ModeToggle";

// Alias pour taire les faux positifs “motion is never used”
const MotionForm = motion.form;

export default function SearchBar() {
  const [mode, setMode] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [kg, setKg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ mode, from, to, date, kg });
    // TODO: rediriger vers /search ou dispatch Redux
    console.log("Search:", Object.fromEntries(params));
    alert(`Recherche envoyée\n${params.toString()}`);
  };

  return (
    <MotionForm
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/70 backdrop-blur border border-white/60 shadow-2xl rounded-2xl p-4 sm:p-6 space-y-4"
      aria-labelledby="search-title"
    >
      <div className="flex items-center justify-between">
        <h2 id="search-title" className="text-lg font-semibold text-gray-900">
          Trouver un trajet pour votre colis
        </h2>
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
    </MotionForm>
  );
}