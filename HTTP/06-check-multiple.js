import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'Status es 200': (r) => r.status === 200,
    'Body tiene ID': (r) => JSON.parse(r.body).id === 1,
  });

}