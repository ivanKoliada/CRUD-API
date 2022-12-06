import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';

import { routes } from './routes';

if (cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ WORKER_PORT: 4000 + i + 1 });
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const PORT = process.env.WORKER_PORT;
  const server = http.createServer(routes);

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running at ${PORT}`);
  });
}

process.on('SIGINT', () => {
  process.disconnect();
});
