import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';

import { routes } from './routes';

if (cluster.isPrimary) {
  const numCPUs = cpus().length;
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ WORKER_PORT: 4000 + i + 1});
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  try {
    const PORT = process.env.WORKER_PORT;
    const server = http.createServer(routes);

    server.listen(PORT, () => {
      console.log(`Worker ${process.pid} server running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
