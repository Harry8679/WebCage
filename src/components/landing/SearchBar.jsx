import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Weight, Plane, Car, Train, Ship } from "lucide-react";
import ModeToggle from "./ModeToggle";

// Alias pour éviter les faux positifs du linter
const MotionForm = motion.form;

/** Utilitaire : nettoie l'objet pour ne garder que les champs remplis */
const compact = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""));

/** Saisie dédiée : Tous (libre) */
function FieldsAll({ from, to, setFrom, setTo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
    </div>
  );
}

/** Saisie dédiée : Voiture (adresses + (future) auto city/pays) */
function FieldsCar({
  addressFrom, setAddressFrom, addressTo, setAddressTo,
  cityFrom, setCityFrom, countryFrom, setCountryFrom,
  cityTo, setCityTo, countryTo, setCountryTo,
}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="car-address-from">
            <Car className="h-4 w-4" /> Adresse de départ
          </label>
          <input
            id="car-address-from"
            value={addressFrom}
            onChange={(e) => setAddressFrom(e.target.value)}
            placeholder="N°, rue, CP, ville"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
            required
            autoComplete="street-address"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              value={cityFrom}
              onChange={(e) => setCityFrom(e.target.value)}
              placeholder="Ville (auto plus tard)"
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
            />
            <input
              value={countryFrom}
              onChange={(e) => setCountryFrom(e.target.value)}
              placeholder="Pays (auto plus tard)"
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="car-address-to">
            <Car className="h-4 w-4 rotate-180" /> Adresse d’arrivée
          </label>
          <input
            id="car-address-to"
            value={addressTo}
            onChange={(e) => setAddressTo(e.target.value)}
            placeholder="N°, rue, CP, ville"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
            required
            autoComplete="street-address"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              value={cityTo}
              onChange={(e) => setCityTo(e.target.value)}
              placeholder="Ville (auto plus tard)"
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
            />
            <input
              value={countryTo}
              onChange={(e) => setCountryTo(e.target.value)}
              placeholder="Pays (auto plus tard)"
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">Astuce : l’autocomplétion remplira “Ville” et “Pays” automatiquement à partir de l’adresse.</p>
    </div>
  );
}

/** Saisie dédiée : Avion (aéroports + pays) */
function FieldsPlane({
  airportFrom, setAirportFrom, airportTo, setAirportTo,
  countryFrom, setCountryFrom, countryTo, setCountryTo,
}) {
  const upper3 = (s) => s.slice(0, 3).toUpperCase();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="plane-from">
          <Plane className="h-4 w-4" /> Aéroport de départ (nom ou code IATA)
        </label>
        <input
          id="plane-from"
          value={airportFrom}
          onChange={(e) => setAirportFrom(upper3(e.target.value))}
          placeholder="CDG / ORY / 'Paris Charles de Gaulle'"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
          required
          autoComplete="off"
        />
        <input
          value={countryFrom}
          onChange={(e) => setCountryFrom(e.target.value)}
          placeholder="Pays (auto plus tard)"
          className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="plane-to">
          <Plane className="h-4 w-4 rotate-180" /> Aéroport d’arrivée (nom ou code IATA)
        </label>
        <input
          id="plane-to"
          value={airportTo}
          onChange={(e) => setAirportTo(upper3(e.target.value))}
          placeholder="ABJ / DKR / 'Abidjan F. Houphouët-Boigny'"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
          required
          autoComplete="off"
        />
        <input
          value={countryTo}
          onChange={(e) => setCountryTo(e.target.value)}
          placeholder="Pays (auto plus tard)"
          className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
        />
      </div>
    </div>
  );
}

/** Saisie partagée : Train & Bateau (ville + pays) */
function FieldsCityCountry({
  transportIcon: Icon,
  fromCity, setFromCity, fromCountry, setFromCountry,
  toCity, setToCity, toCountry, setToCountry,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="city-from">
          <Icon className="h-4 w-4" /> Ville de départ & Pays
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            id="city-from"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            placeholder="Ville"
            className="w-full rounded-xl border border-gray-200 px-3 py-2"
            required
          />
          <input
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            placeholder="Pays"
            className="w-full rounded-xl border border-gray-200 px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-600 flex items-center gap-2 mb-1" htmlFor="city-to">
          <Icon className="h-4 w-4 rotate-180" /> Ville d’arrivée & Pays
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            id="city-to"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="Ville"
            className="w-full rounded-xl border border-gray-200 px-3 py-2"
            required
          />
          <input
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            placeholder="Pays"
            className="w-full rounded-xl border border-gray-200 px-3 py-2"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [mode, setMode] = useState("all");

  // État spécifique par mode
  // ALL
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // CAR
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [countryTo, setCountryTo] = useState("");

  // PLANE
  const [airportFrom, setAirportFrom] = useState("");
  const [airportTo, setAirportTo] = useState("");

  // TRAIN & BOAT
  const [railFromCity, setRailFromCity] = useState("");
  const [railFromCountry, setRailFromCountry] = useState("");
  const [railToCity, setRailToCity] = useState("");
  const [railToCountry, setRailToCountry] = useState("");

  // COMMUNS
  const [date, setDate] = useState("");
  const [kg, setKg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // Construire le payload selon le mode
    let payload = { mode, date, kg };

    if (mode === "all") {
      payload = { ...payload, from, to };
    } else if (mode === "car") {
      payload = {
        ...payload,
        addressFrom, cityFrom, countryFrom,
        addressTo, cityTo, countryTo,
      };
    } else if (mode === "plane") {
      payload = {
        ...payload,
        airportFrom, countryFrom,
        airportTo, countryTo,
      };
    } else if (mode === "train" || mode === "boat") {
      payload = {
        ...payload,
        fromCity: railFromCity,
        fromCountry: railFromCountry,
        toCity: railToCity,
        toCountry: railToCountry,
      };
    }

    const params = new URLSearchParams(compact(payload));
    // → redirige vers /search?… ou dispatch Redux (selon ton flow)
    // window.location.href = `/search?${params.toString()}`;
    console.log("Search:", Object.fromEntries(params));
    alert(`Recherche envoyée\n${params.toString()}`);
  };

  // Remise à zéro light quand on change de mode (optionnel)
  const handleModeChange = (m) => {
    setMode(m);
    // On ne vide pas tout pour ne pas frustrer l’utilisateur,
    // mais tu peux reset finement ici si tu veux.
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
        <ModeToggle value={mode} onChange={handleModeChange} />
      </div>

      {/* Zone spécifique par mode */}
      {mode === "all" && (
        <FieldsAll from={from} to={to} setFrom={setFrom} setTo={setTo} />
      )}

      {mode === "car" && (
        <FieldsCar
          addressFrom={addressFrom} setAddressFrom={setAddressFrom}
          addressTo={addressTo} setAddressTo={setAddressTo}
          cityFrom={cityFrom} setCityFrom={setCityFrom}
          countryFrom={countryFrom} setCountryFrom={setCountryFrom}
          cityTo={cityTo} setCityTo={setCityTo}
          countryTo={countryTo} setCountryTo={setCountryTo}
        />
      )}

      {mode === "plane" && (
        <FieldsPlane
          airportFrom={airportFrom} setAirportFrom={setAirportFrom}
          airportTo={airportTo} setAirportTo={setAirportTo}
          countryFrom={countryFrom} setCountryFrom={setCountryFrom}
          countryTo={countryTo} setCountryTo={setCountryTo}
        />
      )}

      {(mode === "train" || mode === "boat") && (
        <FieldsCityCountry
          transportIcon={mode === "train" ? Train : Ship}
          fromCity={railFromCity} setFromCity={setRailFromCity}
          fromCountry={railFromCountry} setFromCountry={setRailFromCountry}
          toCity={railToCity} setToCity={setRailToCity}
          toCountry={railToCountry} setToCountry={setRailToCountry}
        />
      )}

      {/* Champs communs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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