import React from "react";

const STEPS = [
  { n: 1, title: "Le transporteur publie", text: "Départ/Arrivée (ville, adresse, aéroport), date et kilos dispo." },
  { n: 2, title: "Le client réserve",      text: "Il achète des kilos et paye via Stripe." },
  { n: 3, title: "Validation",             text: "Le transporteur valide — prélèvement du client." },
  { n: 4, title: "Code unique",            text: "À la remise du colis, le code confirme la transaction." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white border-y" id="how">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Comment ça marche</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-gradient-to-br from-gray-50 to-white border rounded-2xl p-5">
              <div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-semibold mb-3">{s.n}</div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}