//Smoke Test (Prueba de Humo)
//Qué es: Prueba básica para verificar que el sistema funciona bajo carga mínima.


import http from 'k6/http';

export const options = {
  vus: 1,       // 1 usuario virtual
  duration: '1m' // Duración de 1 minuto
};

export default function () {
  http.get('https://test-api.k6.io');
}