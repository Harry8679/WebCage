import React from "react";
import { Search, Car, Plane, Train, Ship } from "lucide-react";

// Icônes en minuscules pour éviter les warnings de linter
const MODES = [
  { key: "all",   label: "Tous",    icon: Search },
  { key: "car",   label: "Voiture", icon: Car },
  { key: "plane", label: "Avion",   icon: Plane },
  { key: "train", label: "Train",   icon: Train },
  { key: "boat",  label: "Bateau",  icon: Ship },
];

export default function ModeToggle({ value, onChange }) {
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