// Importamos los datos de cada archivo
import { caseStudyData as repuestosTemucoData } from './respuestos-temuco';
import { caseStudyData as pedroSalazarData } from './pedro-salazar';
import { caseStudyData as miriPortfolioData } from './miri-portfolio';
import { caseStudyData as deylenaBarbozaData } from './deylena-barboza';

// Creamos un objeto que mapea el slug a los datos correspondientes
export const allCaseStudies = {
  'repuestos-temuco': repuestosTemucoData,
  'pedro-salazar': pedroSalazarData,
  'miri-portfolio': miriPortfolioData,
  'deylena-barboza': deylenaBarbozaData,
  // Si añades un nuevo caso de éxito, solo tienes que importarlo y añadirlo aquí
};