import React from "react";

import Hero from "../components/landing/Hero";
import FeaturedRoutes from "../components/landing/FeaturedRoutes";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-gray-900">
      <Hero />
      <FeaturedRoutes />
      <HowItWorks />
      <Testimonials />
      <CTA />

      {/* Footer local (tu peux aussi l’extraire en composant global) */}
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