import React from "react";

export default function CTA() {
  return (
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
  );
}