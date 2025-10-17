"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

// --- DATOS DE UBICACIONES ---
// ¡Aquí añades los puntos! Usa Google Maps para encontrar las coordenadas.
// Formato: [longitud, latitud]
const markers = [
  { 
    name: "Madrid, España", 
    coordinates: [-3.7038, 40.4168], 
    markerOffset: -15 
  },
  {
    name: "Miranda, Venezuela",
    coordinates: [-66.6645, 10.2328],
    markerOffset: -15,
  }
  // Añade más ciudades/países aquí a medida que crezcas
  // { name: "Nueva York, USA", coordinates: [-74.006, 40.7128], markerOffset: -15 },
];

const GlobalMap = () => {
  return (
    <section id="global-reach" className="py-24 bg-[#0C0C2C]">
      <div className="container px-4 mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white">
            Creando Soluciones Digitales Sin Fronteras
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-[#A3A8CC]">
            He tenido el privilegio de colaborar con clientes en diferentes partes del mundo,
            adaptándome a sus mercados para entregar resultados globales.
          </p>
        </motion.div>

        {/* --- MAPA INTERACTIVO --- */}
        <motion.div 
            className="w-full h-auto max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 120, // Ajusta el zoom del mapa
              center: [10, 20], // Centra el mapa [longitud, latitud]
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies 
                geography="/world-map-data.json" // Ruta a tu archivo de mapa
            >
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    // Estilo de los países
                    style={{
                      default: {
                        fill: "#1B1F3B",
                        stroke: "#003B8D",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: { fill: "#1B1F3B", outline: "none" },
                      pressed: { fill: "#1B1F3B", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Renderizamos los marcadores */}
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <motion.circle 
                    r={6} // Radio del punto
                    fill="#00C6FF" // Color de tu marca
                    stroke="#fff" 
                    strokeWidth={1}
                    // Animación del punto
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
                 {/* Círculo de "pulso" animado detrás del marcador */}
                <motion.circle
                  r={12}
                  fill="#00C6FF"
                  initial={{ scale: 0, opacity: 0.7 }}
                  animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7],
                  }}
                  transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                  }}
                />
              </Marker>
            ))}

            {/* Anotaciones (texto) para cada marcador */}
            {markers.map(({ name, coordinates }) => (
                <Annotation
                    key={`anno-${name}`}
                    subject={coordinates}
                    dx={-40}
                    dy={-30}
                    connectorProps={{
                        stroke: "#A3A8CC",
                        strokeWidth: 1,
                        strokeLinecap: "round",
                    }}
                >
                    <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#A3A8CC" fontSize={14}>
                        {name}
                    </text>
                </Annotation>
            ))}

          </ComposableMap>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalMap;