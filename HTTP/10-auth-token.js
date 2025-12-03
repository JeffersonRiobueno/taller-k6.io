import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  // 1. Simular autenticación (Login)
  // Usamos dummyjson.com que es una API real de pruebas
  const loginUrl = 'https://dummyjson.com/auth/login';
  const loginPayload = JSON.stringify({
    username: 'kminchelle',
    password: '0lelplR',
  });

  const loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(loginUrl, loginPayload, loginParams);
  
  // Verificamos que el login fue exitoso
  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
  });

  // 2. Obtener el token de la respuesta
  const body = loginRes.json();
  const authToken = body.token;

  // Validamos que obtuvimos el token
  check(authToken, {
    'token exists': (t) => t !== undefined && t !== '',
  });

  // 3. Usar el token en la siguiente petición
  const dataUrl = 'https://dummyjson.com/auth/me';
  const dataParams = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const dataRes = http.get(dataUrl, dataParams);

  // Verificamos que la petición autenticada fue exitosa
  check(dataRes, {
    'authenticated request status is 200': (r) => r.status === 200,
    'user data retrieved': (r) => r.json().username === 'kminchelle',
  });

  sleep(1);
}
