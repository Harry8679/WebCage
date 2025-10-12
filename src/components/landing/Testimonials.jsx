import React from "react";

const QUOTES = [
  `"Service nickel, j'ai envoyé un colis de 5 kg à moindre coût."`,
  `"Je voyage souvent, je rentabilise mes trajets en toute simplicité."`,
  `"Le code unique apporte une vraie sécurité à l'échange."`,
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Ils utilisent Transkage</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {QUOTES.map((q, i) => (
          <blockquote key={i} className="bg-white border rounded-2xl p-5 text-sm text-gray-700">{q}</blockquote>
        ))}
      </div>
    </section>
  );
}