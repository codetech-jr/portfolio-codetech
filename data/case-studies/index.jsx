// Importamos los datos de cada archivo
import { caseStudyData as repuestosTemucoData } from './respuestos-temuco';
import { caseStudyData as pedroSalazarData } from './pedro-salazar';
import { caseStudyData as miriPortfolioData } from './miri-portfolio';

// Creamos un objeto que mapea el slug a los datos correspondientes
export const allCaseStudies = {
  'repuestos-temuco': repuestosTemucoData,
  'pedro-salazar': pedroSalazarData,
  'miri-portfolio': miriPortfolioData,
  // Si añades un nuevo caso de éxito, solo tienes que importarlo y añadirlo aquí
};