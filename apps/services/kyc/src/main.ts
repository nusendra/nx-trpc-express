import express from 'express';
import { publicProcedure, router } from './trpc';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const appRouter = router({
  userList: publicProcedure.query(() => {
    const users = [1, 2, 3];
    console.log(users);

    return {
      a: users,
    };
  }),
});

const app = express();

app.use('/trpc', createExpressMiddleware({ router: appRouter }));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export const a = { a: 1 };
export type AppRouter = typeof appRouter;
