import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export default function () {
  const headers = { Authorization: 'token abcdef0123456789' };

  describe('crocodiles API', () => {
    describe('should fetch a list of public crocodiles', () => {
      const response = http.get('https://quickpizza.grafana.com/api/ratings', { headers: headers });

      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json('ratings').length, 'number of ratings').to.be.above(1);
    });

    describe('should respond with status 200, when a valid rating id is provided', () => {
      const expected = {
        id: 1,
        stars: 5,
        pizza_id: 1,
      };

      const response = http.get('https://quickpizza.grafana.com/api/ratings/1', {
        headers: headers,
      });

      expect(response.status, 'status').to.equal(200);
      expect(JSON.parse(response.body), 'response body').to.deep.equal(expected);
    });

    describe('should respond with status 404, when an invalid rating id is provided', () => {
      const response = http.get('https://quickpizza.grafana.com/api/ratings/12312123123123', {
        headers: headers,
      });

      expect(response.status, 'status').to.equal(404);
      expect(JSON.parse(response.body).error, 'error message').to.contain('not found');
    });
  });
}