import express from 'express';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@service/kyc';
import superjson from 'superjson';

const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});

const app = express();

app.get('/api/test', async (req, res) => {
  try {
    const a = await client.userList.query();
    return res.send(a);
  } catch (e) {
    console.log(e);
  }
});

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
