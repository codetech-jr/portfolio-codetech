import React from "react";
import PropTypes from 'prop-types';
import { timelinePhases } from "./timelineData";
import styles from "./ProcessWork.module.css";

// Sub-componente para renderizar cada item de la línea de tiempo
const TimelineItem = ({ phase, animationDelay }) => {
  const Icon = phase.icon;
  return (
    <div className={styles.timelineItem} style={{ animationDelay }}>
      <div className={styles.timelineDot} aria-hidden="true">
        <Icon size={22} />
      </div>
      <div className={styles.timelineContent}>
        <h3>{phase.title}</h3>
        <ul>
          {phase.summary.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Definición de los tipos de props para validación y autocompletado
TimelineItem.propTypes = {
  phase: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  animationDelay: PropTypes.string.isRequired,
};

// Componente principal
export default function ProcessWork() {
  return (
    <section className={styles.timelineSection}>
      <h2 className={styles.title}>
        ¿Cómo trabajo? <span>Metodología en 8 fases</span>
      </h2>
      <p className={styles.description}>
        Creo en la total transparencia y la comunicación constante. Un proyecto exitoso se construye sobre un proceso claro y bien definido, donde cada paso está diseñado para garantizar que estamos alineados con tus objetivos. A continuación, detallo mi metodología de trabajo en 8 fases, desde nuestra primera conversación hasta el soporte post-lanzamiento, para que sepas exactamente qué esperar en cada etapa del camino.
      </p>
      <div className={styles.timeline}>
        {timelinePhases.map((phase, idx) => (
          <TimelineItem
            key={phase.id}
            phase={phase}
            animationDelay={`${idx * 0.15}s`}
          />
        ))}
        <div className={styles.timelineLine} aria-hidden="true"></div>
      </div>
    </section>
  );
}