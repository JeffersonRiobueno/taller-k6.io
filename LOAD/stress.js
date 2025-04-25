//Stress Test (Prueba de Estrés)
//Qué es: Prueba para determinar los límites máximos del sistema.

import http from 'k6/http';

export const options = {
  stages: [
    { duration: '10m', target: 2000 }  // Aumento gradual hasta 2000 usuarios
  ]
};

export default function () {
  http.get('https://test-api.k6.io');
}