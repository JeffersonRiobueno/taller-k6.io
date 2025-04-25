//Soak Test (Prueba de Resistencia)
//Qué es: Prueba prolongada para detectar problemas de memoria o rendimiento.
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '4h'  // 4 horas de ejecución
};

export default function () {
  http.get('https://test-api.k6.io');
}