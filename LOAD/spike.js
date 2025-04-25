//Spike Test (Prueba de Picos)
//Qué es: Prueba para evaluar cómo responde el sistema a aumentos repentinos de tráfico.
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2m', target: 1000 },  // Aumento rápido a 1000 usuarios
    { duration: '1m', target: 0 }      // Bajada inmediata
  ]
};

export default function () {
  http.get('https://test-api.k6.io');
}