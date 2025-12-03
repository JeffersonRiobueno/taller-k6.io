import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Cargamos el archivo CSV en memoria una sola vez para todos los VUs
const csvData = new SharedArray('users', function () {
  // open() carga el archivo como string
  return papaparse.parse(open('./users.csv'), { header: true }).data;
});

export default function () {
  // Seleccionamos un usuario aleatorio del array cargado
  // O podríamos usar un índice secuencial basado en __VU o __ITER
  const randomUser = csvData[Math.floor(Math.random() * csvData.length)];

  // Validamos que tengamos datos (por si hay líneas vacías en el CSV)
  if (!randomUser.username) {
      return;
  }

  const url = 'https://dummyjson.com/users/add';
  
  // Construimos el payload dinámicamente con los datos del CSV
  const payload = JSON.stringify({
    username: randomUser.username,
    password: randomUser.password,
    email: randomUser.email,
    // dummyjson espera firstName y lastName, podemos simularlos o enviarlos igual
    firstName: 'Test',
    lastName: 'User',
    age: 25,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'correct username sent': (r) => r.json().username === randomUser.username,
  });

  sleep(1);
}
