//Breakpoint Test (Prueba de Punto de Quiebre)
//Qué es: Prueba para encontrar el límite exacto donde el sistema falla.
import http from 'k6/http';

export const options = {
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 100, duration: '10m' }  // Aumento gradual hasta fallo
      ]
    }
  }
};

export default function () {
  http.get('https://test-api.k6.io');
}