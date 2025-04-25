//Load Test (Prueba de Carga)
//Qué es: Prueba para evaluar el comportamiento del sistema bajo carga esperada.

import http from 'k6/http';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Rampa a 20 usuarios
    { duration: '1m', target: 20 },   // Mantener 20 usuarios
    { duration: '30s', target: 0 }    // Bajada gradual
  ]
};

export default function () {
  http.get('https://test-api.k6.io');
}