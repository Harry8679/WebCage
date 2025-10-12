import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const MOCK = [
  { title: "Paris → Abidjan",     mode: "Avion",   date: "Aujourd'hui - Dimanche" },
  { title: "Casablanca → Dakar",  mode: "Avion",   date: "Demain" },
  { title: "Lyon → Marseille",    mode: "Voiture", date: "Chaque jour" },
];

export default function FeaturedRoutes() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10" id="features">
      <h2 className="text-2xl font-bold mb-6">Routes populaires</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {MOCK.map((r, i) => (
          <div key={i} className="group bg-white rounded-2xl border p-5 hover:shadow-xl transition relative overflow-hidden">
            <div className="absolute right-4 top-4 text-gray-300 group-hover:text-gray-400">
              <ChevronRight className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{r.mode} • {r.date}</p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700">
              Voir les trajets <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}