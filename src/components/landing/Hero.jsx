import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Weight } from "lucide-react";
import SearchBar from "./SearchBar";

const MotionDiv = motion.div;

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,.15),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Expédiez des <span className="text-emerald-600">colis</span> partout, en profitant des
              <span className="text-blue-600"> trajets existants</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Transkage connecte des transporteurs (voiture, avion, train, bateau) avec des clients qui
              veulent envoyer des colis, en toute sécurité.
            </p>
            <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
              <li className="flex items-center gap-2 bg-white rounded-xl border p-3">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Vérification
              </li>
              <li className="flex items-center gap-2 bg-white rounded-xl border p-3">
                <Globe2 className="h-4 w-4 text-blue-600" /> International
              </li>
              <li className="flex items-center gap-2 bg-white rounded-xl border p-3">
                <Weight className="h-4 w-4 text-gray-900" /> Au kilo
              </li>
            </ul>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .05 }}>
            <SearchBar />
            <p className="text-xs text-gray-500 mt-3 ml-1">Ex. Paris → Abidjan • 16/11 • 3 kg • Avion</p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}