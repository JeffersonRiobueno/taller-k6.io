import script01 from './01-script.js';
import script02 from './02-script.js';
import script04 from './04-post.js';

export const options = {
  scenarios: {
    // Escenario para el script 01
    'scenario_01': {
      executor: 'shared-iterations',
      exec: 'runScript01', // Nombre de la función exportada abajo
      vus: 1,
      iterations: 1,
      startTime: '0s',
      tags: { my_tag: 'grupo_A' }, // Tag para filtrar métricas después
    },
    // Escenario para el script 02
    'scenario_02': {
      executor: 'constant-vus',
      exec: 'runScript02',
      vus: 5,
      duration: '10s',
      startTime: '2s', // Inicia después de 2 segundos
      tags: { my_tag: 'grupo_A' },
    },
    // Escenario para el script 04
    'scenario_04': {
      executor: 'per-vu-iterations',
      exec: 'runScript04',
      vus: 2,
      iterations: 5,
      startTime: '5s',
      tags: { my_tag: 'grupo_B' },
    },
  },
};

// Funciones wrapper que ejecutan el default export de cada script
export function runScript01() {
  script01();
}

export function runScript02() {
  script02();
}

export function runScript04() {
  script04();
}
