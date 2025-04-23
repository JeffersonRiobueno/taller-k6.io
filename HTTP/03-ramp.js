import http from 'k6/http';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '20s', target: 30 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');
}